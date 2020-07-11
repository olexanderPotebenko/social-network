import React from 'react';
import cls from './Profile.module.css';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {withRouter} from 'react-router-dom';
import {getProfile} from '../../reducers/profileReducer.js';

//hocs
import WithAuthData from '../../hocs/WithAuthData.jsx';
import WithSignInRedirect from '../../hocs/WithSignInRedirect.jsx';

//components
import Menu from './Menu/Menu.jsx';
import ProfileInfo from './ProfileInfo/ProfileInfo.jsx';
import Preloader from '../commons/Preloader/Preloader.jsx';


const Profile = (props) => {

    if(!props.profile) {
        return <Preloader />;
    };

    let {status, name, photos, contacts, email} = props.profile;
    return (
        <div> 
            <ProfileInfo 
                status={status}
                email={email}
                name={name}
                photos={photos}
                contacts={contacts} />
                <Menu />
        </div>
    );
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
