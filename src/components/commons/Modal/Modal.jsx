import React from 'react';
import styles from './Modal.module.css';

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
        return <div className={styles.wrapper} >
            <div className={styles.color_filter}
                onClick={() => this.props.changeVisibleModal(false) } >
                <div className={styles.content} 
                    style={{width: this.props.width, height: this.props.height}}
                    onClick={event => event.stopPropagation() } >
                    <this.props.Component {...this.props} />
                </div>
            </div>
        </div>
    }
}
        
export default Modal;
