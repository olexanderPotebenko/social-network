import React from 'react';
import loader_image from '../../../assets/images/loading.jpg';
import cls from './Preloader.module.css';

const Preloader = (props) => {

    return (
        <div className={cls.loader}>
            <img className={cls.loader_image} src={loader_image} />
        </div>
    );
};

export default Preloader;
