import React from 'react';
import menu_black from '../../../assets/images/menu_black.png';
import menu_white from '../../../assets/images/menu_white.png';

import styles from './DropDownMenu.module.css';

class DropDownMenu extends React.Component {

  state = {
    editMode: false,
  }

  toggleEditMode = () => {
    this.setState({editMode: !this.state.editMode});
  }
  offEdditMode = () => {
    this.setState({editMode: false});
  }

  render() {

    let items = this.props.items
      .map(item => <div className={styles.item} 
        onClick={item.onClick}>
        {item.value}
      </div>
      );

    return <div className={styles.wrp}> 
      {
        this.state.editMode
          && <div className={styles['items-wrp']}>
      {items}
    </div>
      }
      <button className={styles['menu-button']}
        tabIndex={-1}// set autofocus
        onClick={this.toggleEditMode} 
        onBlur={this.offEdditMode} >
        <img src={menu_black} />
      </button>
      </div>;
  }
}

export default DropDownMenu;
