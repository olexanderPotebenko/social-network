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
    return <div className={styles.wrapper} >
      <div className='shading' >
        <div className={styles['content-wrp']}>
        <div className={styles.content} 
          onClick={event => event.stopPropagation() } >
          <div className={styles['close-button']}>
            <div>
              <CloseButton close={(() => 
                  this.props.changeVisibleModal(false)).bind(this)} />
            </div>
          </div>
          <this.props.Component {...this.props} />
        </div>
        </div>
      </div>
    </div>
  }
}

export default Modal;
