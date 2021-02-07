import React from 'react';
import styles from './Modal.module.css';
import CloseButton from '../CloseButton/CloseButton';

class Modal extends React.Component {

    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
    }
    componentWillUnmount(){
        document.removeEventListener("keydown", this.escFunction, false);
    }

    escFunction(event) {
        document.addEventListener('keydown', (event) => {
            if(event.code == 'Escape')
                this.props.changeVisibleModal(false);
        });
    }

    render() {
      alert();
        return <div className={styles.wrapper} >
            <div className={styles.color_filter}
            >
                <div className={styles.content} 
                    style={{width: this.props.width, 'min-height': this.props.height}}
                    onClick={event => event.stopPropagation() } >
                    <CloseButton close={(() => {return this.props.changeVisibleModal(false)}).bind(this)} />
                    <this.props.Component {...this.props} />
                </div>
            </div>
        </div>
    }
}
        
export default Modal;
