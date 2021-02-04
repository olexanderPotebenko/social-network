import React from 'react';
import {NavLink} from 'react-router-dom';
import cls from './AuthInfo.module.css';
import default_avatar from '../../../assets/images/avatar_default.png';
import WithAuthData from '../../../hocs/WithAuthData.jsx';

let AuthInfo = (props) => {

    let avatar = props.auth.photo || default_avatar;
    let indicator_styles = '';
    switch(props.auth.ws.readyState){
        case 0:     //'CONNECTING':
            indicator_styles = 'rgba(127, 155, 0, .7)';
            break;
        case 1:     //'OPEN':
            indicator_styles = 'rgba(127, 255, 0, .7)';
            break;
        case 2:     //'CLOSING':
            indicator_styles = 'rgba(255, 127, 0, .7)';
            break;
        case 3:     //'CLOSED':
            indicator_styles = 'rgba(255, 44, 0, .7)';
            break;
    };

    return <div className={cls.wrapper}>
        {
            props.auth.is_auth 
            ?<div>
                <NavLink to={`/profile/${props.auth.id}/posts`} >
                    <div className={cls.avatar_wrapper}>
                        <img className={cls.avatar} src={avatar} />
                        <div className={cls.indicator} 
                            style={ {
                                'background-color': indicator_styles,
                                'box-shadow': `0 0 5px ${indicator_styles}`,
                            } }>
                        </div>
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
