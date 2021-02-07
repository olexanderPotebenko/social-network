import React from 'react';
import styles from './DialogInfo.module.css';
import backImg from '../../../../assets/images/back.png';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {NavLink} from 'react-router-dom';

import WithAuthData from '../../../../hocs/WithAuthData.jsx';

import {selectDialog} from '../../../../reducers/messagesReducer.js';
//components
import BackButton from '../../../commons/BackButton/BackButton.jsx';
import DropDownMenu from '../../../commons/DropDownMenu/DropDownMenu.jsx';

class DialogInfo extends React.Component {

  render() {
    console.log(this.props);

    let menu_items = [];
    menu_items.push({
      value: 'delete dialog',
      onClick: () => {
      },
    });
    menu_items.push({
      value: 'delete dialog',
      onClick: () => {
      },
    });
    menu_items.push({
      value: 'delete dialog',
      onClick: () => {
      },
    });
    return <div className={styles.wrp}>
      <div>
        <BackButton func={this.props.selectDialog.bind(this, '')} />
      </div>
      <NavLink to={`/profile/${this.props.user_id}/posts`}>
        <img className={styles.avatar} src={this.props.user_avatar} />
        <div className={styles.name} >
          <h3>
            {this.props.user_name}
          </h3>
        </div>
      </NavLink>
      <div className={styles['button-wrp']}>
        <DropDownMenu items={menu_items} />
      </div>

    </div>
  }
}

const mapsStateToProps = state => {
  return {
    user_id: state.messagesPage.dialog.user_id,
    user_avatar: state.messagesPage.dialog.user_avatar,
    user_name: state.messagesPage.dialog.user_name,
    dialog: state.messagesPage.dialog,
  };
};

const mapsDispatchToProps = {
  selectDialog,
};

export default compose(
  WithAuthData,
  connect(mapsStateToProps, mapsDispatchToProps)
)(DialogInfo);
