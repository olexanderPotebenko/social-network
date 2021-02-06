import React from 'react';
import {Field, reset, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import WithAuthData from '../../../../hocs/WithAuthData.jsx';

import styles from './SendMessage.module.css';

import {TextArea, Button} from '../../../commons/FormsControls/FormsControls.jsx';
import {getDialog} from '../../../../reducers/messagesReducer.js';

class SendMessage extends React.Component {

  componentDidMount() {
    // let {id, token, dialog_id} = options;
    }

  
  render() {


    return <div>
      <form className={styles['form-wrp']} onSubmit={this.props.handleSubmit}>
        <div className={styles['send-message-wrp']}>
          <Field name='send-message' autoFocus={true}
            validate={[]} placeholder='enter text message...'
            component={TextArea} />
        </div>
        <div>
          <div className={styles['submit-button-wrp']}>
            <Button className={styles['submit-button']}
              name={'SEND'}
              validate={[]} 
            />
          </div>
        </div>
      </form>
    </div>
  }
}

const mapsStateToProps = state => {
  return {
    currentDialog: state.messagesPage.currentDialog,
  }
};

const mapsDispatchToProps = {
  getDialog,
};

export default compose(
  reduxForm({form: 'sendMessage',
    onSubmitSuccess: (data, dispatch) => dispatch(reset('sendMessage')),
  }),
  WithAuthData,
  connect(mapsStateToProps, mapsDispatchToProps),
)(SendMessage);
