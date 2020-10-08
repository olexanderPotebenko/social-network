import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAuthDataActionCreator, login} from '../../reducers/authReducer.js';
import cls from './Sidebar.module.css';
import MenuItem from './MenuItem/MenuItem.jsx';
import AuthInfo from './AuthInfo/AuthInfo.jsx';


class Sidebar extends React.Component {

    componentWillUpdate(nextProps, nextState) {
        
        if(this.props.auth && this.props.profile
            && this.props.profile.id == this.props.auth.id
            && this.props.auth.photo != nextProps.profile.photos.small
            && !this.props.auth.is_fetching
        ){
            this.props.login({
                email: this.props.auth.email,
                password: '111111'
            })
        }
    }
    render () {
        let animation = this.props.auth.is_auth ? 
            cls.after_auth_position:
            this.props.auth.is_authed && cls.after_unauth_position || cls.before_auth_position;

        return (
            <div className={cls.sidebar}> 
                <div className={animation}>
                    <AuthInfo setAuthData={this.props.setAuthData}/>
                    <nav className={`${cls.menu_item} `}>
                        <MenuItem {...this.props} link={`/profile/${this.props.auth.id}/posts`} text='Profile' />
                        <MenuItem {...this.props} link={`/messages/${this.props.auth.id}/`} text='Messages' />
                        <MenuItem {...this.props} link='/users' text='Users' />
                        {/*  <MenuItem {...this.props} link='/news' text='News' />*/}
                        {/*  <MenuItem {...this.props} link='/music' text='Music' />*/}
                        {/*  <MenuItem {...this.props} link='/settings' text='Settings' />*/}
                    </nav>
                </div>
            </div>
        )
    }
};

const mapsStateToProps = (state) => {
    return {
        auth: state.auth,
        profile: state.profilePage.profile,
        photo: state.auth.photo,
    };
};

const mapsDispatchToProps = {
    setAuthData: setAuthDataActionCreator,
    login,
};

export default connect(mapsStateToProps, mapsDispatchToProps)(withRouter(Sidebar));
