import React from 'react';
import styles from './FullSizeImage.module.css';

const FullSizeImage = props => {

    let wrp_ref = React.createRef();
    let widthPicture = 0;
    let heightPicture = 0;

    let size = {};

    setTimeout(() => {
        if(wrp_ref.current){
            let maxWidth = wrp_ref.current.clientWidth;
            let maxHeight = wrp_ref.current.clientHeight;
            let width = props.width;
            let height = props.height;
            debugger;

            if( maxWidth * height / width <= maxHeight ){
            debugger;
                widthPicture = maxWidth;
                heightPicture = maxWidth * height / width;
            }else if( maxHeight * width / height <= maxWidth ) {
            debugger;
                widthPicture = maxHeight * width / height;
                heightPicture = maxHeight;
            }

            size = {
                widthPicture,
                heightPicture,
            };
            debugger;
        }
    }, 100);

    return <div className={styles.wrp}
        ref={wrp_ref}
        onClick={props.fullSizeToggle}>
        <div className={styles.container}>
            <img 
                style={ {
                    'background-image': `url(${props.picture})`,
                    'background-repeat': 'no-repeat',
                    'background-size': 'contain',
                    'background-position': 'center',
                } }/>
            </div>
        </div>
}

export default FullSizeImage;
