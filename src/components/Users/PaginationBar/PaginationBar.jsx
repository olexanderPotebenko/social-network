import React from 'react';
import {connect} from 'react-redux';
import styles from './PaginationBar.module.css';
import {userApi} from '../../../api/api.js';
import {getUsers} from '../../../reducers/usersReducer';

class PaginationBar extends React.Component {

    render() {
        let pages = [];
        let items_count = 4;
        let item_middle = Math.ceil(items_count/2);
        let i = this.props.page_current <= item_middle? 1: 
            (this.props.page_current >= this.props.page_count?
                this.props.page_current - items_count + 1:
                this.props.page_current - item_middle); 
        let max_i = this.props.page_count < items_count? this.props.page_count:
            (this.props.page_current <= item_middle ? 
                items_count :
                (this.props.page_current == i - 1?
                    item_middle + 1:
                    this.props.page_current + item_middle - 1)
            ); 
        max_i = Math.ceil(max_i);

        debugger;
        for (i; i <= Math.ceil(this.props.page_count) && i <=  max_i; i++){
            let classes = styles.page_number;
            if(i == this.props.page_current)
                classes = `${styles.page_number} ${styles.selected_page}`;

            let value = i < max_i && 
                max_i < this.props.page_count?
                i : 
                    (max_i < this.props.page_count? i + '...': i);

            let num = parseInt(value); 
            let str = value;
            value = '' + value;
            if(value.slice(-3) == '...') str = '...';
            let onClick = num => e => {
                debugger;
                onPageChanged(num);
            };
            onClick = onClick(num);
            pages.push( <div className={classes} 
                value={num}
                onClick={onClick}><span>{str}</span></div>);
        };

        let onPageChanged = (page_current) => {

            let options = {
                page_current,
                page_size: this.props.page_size,
                id: this.props.auth.id,
                token: this.props.auth.token,
            };
            this.props.getUsers(options);
        };

        return (
            <div className={styles.pagination_bar}>
                {pages}
            </div>
        );
    };
};

let mapStateToProps = (state) => {
    return {
        auth: state.auth,
        page_count: state.usersPage.options.total_users_count/state.usersPage.options.page_size,
        page_current: state.usersPage.options.page_current,
        page_size: state.usersPage.options.page_size,
    }
};

export default connect(mapStateToProps, {getUsers})(PaginationBar);
