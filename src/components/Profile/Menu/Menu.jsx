import React from 'react';

import styles from './Menu.module.css';
import {NavLink, Route} from 'react-router-dom';
import Posts from './Posts/Posts';
import Subscribers from './Subscribers/Subscribers';
import Subscribed from './Subscribed/Subscribed';

class Menu extends React.Component {

    state = {
        selected: 'posts',
    }

    render() {

        let posts_styles = [styles.menu_item, styles.separator];
        let subscribers_styles = [styles.menu_item, styles.separator];
        let subsribed_styles = [styles.menu_item];

        switch(this.state.selected) {
            case 'posts':
                 posts_styles.push(styles.current_item);
                break;
            case 'subscribers':
                subscribers_styles.push(styles.current_item);
                break;
            case 'subsribed':
                subsribed_styles.push(styles.current_item);
                break;
        };

        posts_styles = posts_styles.join(' ');
        subscribers_styles = subscribers_styles.join(' ');
        subsribed_styles = subsribed_styles.join(' ');


        return <div className={styles.wrapper}>
            <nav className={styles.horizontal_menu}>
                <ul>
                    <li >
                        <NavLink className={posts_styles} 
                            onClick={() => this.state.selected = 'posts'}
                            to='posts' >
                            POSTS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink  className={subscribers_styles} 
                            onClick={() => this.state.selected = 'subscribers'}
                            to='subscribers' >
                            SUBSCRIBERS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={subsribed_styles} 
                            onClick={() => this.state.selected = 'subsribed'}
                            to='subsribed' >
                            SUBSRIBED
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <div className={'custom_scroll_bar' + ' ' + styles.content}>
                <Route component={Posts} path={'/profile/:user_id/posts'} />
                <Route component={Subscribers} path={'/profile/:user_id/subscribers'}  />
                <Route component={Subscribed} path={'/profile/:user_id/subscribed'}  />
            </div>
        </div>
    }
}

export default Menu;
