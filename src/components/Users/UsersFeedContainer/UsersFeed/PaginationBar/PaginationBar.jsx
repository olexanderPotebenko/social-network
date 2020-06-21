import React from 'react';
import cls from './PaginationBar.module.css';
import {userApi} from '../../../../../api/api.js';

const PaginationBar = (props) => {

    let pages = [];
    let items_count = 9;
    let item_middle = Math.ceil(items_count/2);
    let i = props.page_current <= item_middle? 1: props.page_current - item_middle + 1; 
    let max_i = props.page_count < items_count? props.page_count:
        (props.page_current <= item_middle ? 
            items_count : 
            props.page_current + item_middle - 1); 
    max_i = Math.ceil(max_i);

    for (i; i <= Math.ceil(props.page_count) && i <=  max_i; i++){
        let classes = cls.page_number;
        if(i == props.page_current)
            classes = `${cls.page_number} ${cls.selected_page}`;

        let value = i < max_i ? 
            i + ',': 
            (max_i < props.page_count? i + '...': i);

        pages.push( <div className={classes} onClick={(e) => {

            onPageChanged( parseInt(e.target.innerText) )}}><span>{value}</span></div>);
    };

    let onPageChanged = (page_current) => {

        let options = {
            page_current,
            page_size: props.page_size,
            id: props.auth.id,
            token: props.auth.token,
        };
        props.getUsers(options);
    };

    return (
        <div className={cls.pagination_bar}>
            {pages}
        </div>
    );
};

export default PaginationBar;
