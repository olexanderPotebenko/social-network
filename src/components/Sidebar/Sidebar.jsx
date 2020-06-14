import React from 'react';
import {NavLink} from 'react-router-dom';
import cls from './Sidebar.module.css';
import MenuItem from './MenuItem/MenuItem.jsx';

const Sidebar = (props) => {
    return (
        <div className={cls.sidebar}>
            <div className={cls.auth_data}>
                {
                    props.is_auth 
                    ?'Olexander Moruzuk'
                    :<div>
                        <NavLink to='/signin'>
                            {'Sign in'}
                        </NavLink>
                        <br></br>
                        {'or'}
                        <br></br>
                        <NavLink to='/signup'>
                            {'Sign up'}
                        </NavLink>
                    </div>
                }
                </div>
                <nav className={cls.menu_item}>
                    <MenuItem link='/profile' text='Profiles' />
                    <MenuItem link='/messages' text='Messages' />
                    <MenuItem link='/users' text='Users' />
                    <MenuItem link='/news' text='News' />
                    <MenuItem link='/music' text='Music' />
                    <MenuItem link='/settings' text='Settings' />
                </nav>
            </div>
    )
};

export default Sidebar;
