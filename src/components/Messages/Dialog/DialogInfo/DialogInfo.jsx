import React from 'react';
import styles from './DialogInfo.module.css';
import backImg from '../../../../assets/images/back.png';

import {connect} from 'react-redux';
import {compose} from 'redux';
import {NavLink} from 'react-router-dom';

import WithAuthData from '../../../../hocs/WithAuthData.jsx';

import {selectDialog, deleteDialog} from '../../../../reducers/messagesReducer.js';
//components
import BackButton from '../../../commons/BackButton/BackButton.jsx';
import DropDownMenu from '../../../commons/DropDownMenu/DropDownMenu.jsx';
import AvatarByPath from '../../../commons/AvatarByPath/AvatarByPath.jsx';

class DialogInfo extends React.Component {

  render() {

    let menu_items = [];
    menu_items.push({
      value: 'delete dialog',
      onClick: () => {
      //let {id, token, dialog_id} = options;
        let options = {
          id: this.props.auth.id,
          token: this.props.auth.token,
          dialog_id: this.props.currentDialog,
        }
        this.props.deleteDialog(options);
      },
    });

    menu_items.push({
      value: 'nothin',
      onClick: () => {
      },
    });
    menu_items.push({
      value: 'nothin',
      onClick: () => {
      },
    });
    debugger;

    return <div className={styles.wrp}>
      <div>
        <BackButton func={(() => {
        this.props.selectDialog('');
          debugger;
          this.props.history.goBack();
          }).bind(this) } />
      </div>
      <div>
      <NavLink  className={styles.center} to={`/profile/${this.props.user_id}/posts`}>
        <div className={styles.avatar}>
        <AvatarByPath id={ this.props.user_id } photo={this.props.dialog.user_avatar}/>
      </div>
        <div className={styles.name} >
          <h3>
            {this.props.user_name}
          </h3>
        </div>
      </NavLink>
      </div>
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
    currentDialog: state.messagesPage.currentDialog,
  };
};

const mapsDispatchToProps = {
  selectDialog,
  deleteDialog,
};

export default compose(
  WithAuthData,
  connect(mapsStateToProps, mapsDispatchToProps)
)(DialogInfo);
