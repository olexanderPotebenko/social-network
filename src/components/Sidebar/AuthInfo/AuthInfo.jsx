import React from 'react';
import {NavLink} from 'react-router-dom';
import cls from './AuthInfo.module.css';
import default_avatar from '../../../assets/images/avatar_default.png';
import WithAuthData from '../../../hocs/WithAuthData.jsx';

let AuthInfo = (props) => {


    let avatar = props.photo || default_avatar;
    return <div className={cls.wrapper}>
        {
            props.auth.is_auth 
            ?<div>
                <NavLink to={`/profile/${props.auth.id}/posts`} >
                    <div className={cls.avatar_wrapper}>
                        <img className={cls.avatar} src={avatar} />
                    </div>
                </NavLink>
                <br></br>
                <span className={cls.name}>{props.auth.name}</span>
                <br></br>
                <span className={cls.email}>{props.auth.email}</span>
                <br></br>
                <NavLink className={cls.logout_button} to='/signin' 
                    onClick={()=>{props.setAuthData({is_auth: false})}}>
                    ...Exit
                </NavLink>
            </div>
            :<>
            <div className={cls.empty_block}>
            </div>
            <div className={cls.no_auth}>
                <NavLink to='/signin'>
                    {'sign in'}
                </NavLink>
                <div>{'or'}</div>
                <NavLink to='/signup'>
                    {'sign up'}
                </NavLink>
            </div>
            </>
        }
        </div>

};

export default WithAuthData(AuthInfo);
