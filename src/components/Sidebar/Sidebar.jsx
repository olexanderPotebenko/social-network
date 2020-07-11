import React from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAuthDataActionCreator} from '../../reducers/authReducer.js';
import cls from './Sidebar.module.css';
import MenuItem from './MenuItem/MenuItem.jsx';
import AuthInfo from './AuthInfo/AuthInfo.jsx';


const Sidebar = (props) => {

    let animation = props.data.is_auth ? 
        cls.after_auth_position:
        props.data.is_authed && cls.after_unauth_position || cls.before_auth_position;

    return (
        <div className={cls.sidebar}> 
            <div className={animation}>
                <AuthInfo setAuthData={props.setAuthData}/>
                <nav className={`${cls.menu_item} `}>
                    <MenuItem {...props} link={`/profile/${props.data.id}/posts`} text='Profile' />
                    <MenuItem {...props} link={`/messages/${props.data.id}/`} text='Messages' />
                    <MenuItem {...props} link='/users' text='Users' />
                    {/*  <MenuItem {...props} link='/news' text='News' />*/}
                    {/*  <MenuItem {...props} link='/music' text='Music' />*/}
                    {/*  <MenuItem {...props} link='/settings' text='Settings' />*/}
                </nav>
            </div>
        </div>
    )
};

const mapsStateToProps = (state) => {
    return {
        data: state.auth,
    };
};

const mapsDispatchToProps = {
    setAuthData: setAuthDataActionCreator,
};

export default connect(mapsStateToProps, mapsDispatchToProps)(withRouter(Sidebar));
