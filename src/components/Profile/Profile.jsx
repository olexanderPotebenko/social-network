import React from 'react';
import styles from './Profile.module.css';
import {connect} from 'react-redux';
import {NavLink, Route} from 'react-router-dom';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {getProfile} from '../../reducers/profileReducer.js';

//hocs
import WithAuthData from '../../hocs/WithAuthData.jsx';
import WithSignInRedirect from '../../hocs/WithSignInRedirect.jsx';

//components
import Preloader from '../commons/Preloader/Preloader.jsx';
import Posts from './Posts/Posts';
import Subscribers from './Subscribers/Subscribers';
import Subscribed from './Subscribed/Subscribed';



class Profile extends React.Component {

    componentDidMount() {
    }

    componentWillUpdate() {
    }


    render() {
        let selected = this.props.location.pathname.split('/').slice(-1)[0];

        if(!this.props.profile) {
            return <Preloader />;
        };
        let {status, name, photos, contacts, email} = this.props.profile;

        let posts_styles = [styles.menu_item, styles.separator];
        let subscribers_styles = [styles.menu_item, styles.separator];
        let subscribed_styles = [styles.menu_item];

        switch(selected) {
            case 'posts':
                 posts_styles.push(styles.current_item);
                break;
            case 'subscribers':
                subscribers_styles.push(styles.current_item);
                break;
            case 'subscribed':
                subscribed_styles.push(styles.current_item);
                break;
        };

        posts_styles = posts_styles.join(' ');
        subscribers_styles = subscribers_styles.join(' ');
        subscribed_styles = subscribed_styles.join(' ');

        return <div className={'wrp'}>
            <nav className={styles.horizontal_menu}>
                <ul>
                    <li >
                        <NavLink className={posts_styles} 
                            onClick={() => selected = 'posts'}
                            to='posts' >
                            POSTS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink  className={subscribers_styles} 
                            onClick={() => selected = 'subscribers'}
                            to='subscribers' >
                            SUBSCRIBERS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={subscribed_styles} 
                            onClick={() => selected = 'subscribed'}
                            to='subscribed' >
                            SUBSRIBED
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div style={ {overflow: 'hidden' } }>
                <Route component={Posts} path={'/profile/:user_id/posts'} />
                <Route component={Subscribers} path={'/profile/:user_id/subscribers'}  />
                <Route component={Subscribed} path={'/profile/:user_id/subscribed'}  />
            </div>
        </div>
    }

};


class ProfileContainer extends React.Component {
    constructor(props) {
        super(props);
    };

    componentDidMount () {

        let user_id = this.props.match.params.user_id;
        user_id = user_id;
        let options = {
            user_id,
            id: this.props.auth? this.props.auth.id: '',
            token: this.props.auth? this.props.auth.token: '',
        };
        this.props.getProfile(options);
    }

    componentWillUpdate(props) {

        if(props.profile !== null){
            let route_profile = props.location.pathname
                .split('/').filter(item => item !== '')[1];
            let current_profile = props.profile.id;

            if(route_profile !== current_profile) {
                let user_id = route_profile;
                let options = {
                    user_id,
                    id: this.props.auth? this.props.auth.id: '',
                    token: this.props.auth? this.props.auth.token: '',
                };
                this.props.getProfile(options);
            };
        };
    }

    render() {

        return <Profile {...this.props} />
    }
}

let mapsStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    };
};

export default compose(
    connect(mapsStateToProps, {getProfile}),
    WithAuthData,
    WithSignInRedirect,
)(withRouter(ProfileContainer));
