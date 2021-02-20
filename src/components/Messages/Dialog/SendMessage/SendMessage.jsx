import React from 'react';
import {Field, reset, reduxForm} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import WithAuthData from '../../../../hocs/WithAuthData.jsx';

import styles from './SendMessage.module.css';

import {Button} from '../../../commons/FormsControls/FormsControls.jsx';
import {getDialog} from '../../../../reducers/messagesReducer.js';

const TextArea2 = ({input, meta, ...props}) => {
  return <div className={styles['input-wrp']}>
    <textarea ref={props.propsRef} maxlength='1500' {...input} {...props} />
  </div>
};

class SendMessage extends React.Component {

  componentDidMount () {

    let interval;
    if(!this.state.interval) {
      interval = setInterval(() => {
        let {wrp, input, field, textarea, interval, styles, text} = this.state;

        if (input.current && wrp.current) {
          if(!Object.keys(styles).length) {
            this.setState({
              styles: {
                'input-max-width': input.current.clientWidth,
                'input-start-height': input.current.clientHeight,
                'input-max-height': 600,
                'input-height': input.current.clientHeight,

                'wrp-start-grid-template-rows': wrp.current.style.gridTemplateRows,
                'wrp-grid-template-rows': wrp.current.style.gridTemplateRows,
              }
            })
          } else {

            let inputHeight = this.state.input.current.clientHeight;
            if(inputHeight != this.state.styles['input-height']) {
              let startWrpStyle = styles['wrp-start-grid-template-rows'];
              let newWrpStyle = [];
              newWrpStyle = newWrpStyle.concat(startWrpStyle.split(' ').slice(0, 2), 
                (parseInt(startWrpStyle.split(' ')[2]) 
                  + (inputHeight - styles['input-start-height']) ) + 'px' ).join(' ');
              this.setState({
                styles: {
                  ...styles,
                  ['input-height']: inputHeight,
                  ['wrp-grid-template-rows']: newWrpStyle, 
                }
              });
            }
          };
        }

        if(textarea.current && input.current) {
          if(text != textarea.current.innerHTML) {
            this.setState({text: textarea.current.innerHTML});
          }
        }

      }, 10)
      this.setState({interval});
    }
  }

  state = {
    field: React.createRef(),
    textarea: React.createRef(),
    wrp: this.props.wrp,
    input: React.createRef(),
    interval: false,
    styles: {},
    text: '',
  }

  render() {

    if(this.state.wrp.current) {
      this.state.wrp.current.style.gridTemplateRows = this.state.styles['wrp-grid-template-rows'];
    }
    let button = React.createRef();
    return <div>
      <form className={styles['form-wrp']} onSubmit={this.props.handleSubmit}>

        <div className={styles['send-message-wrp']}>
          <div className={styles['send-message']}
            style={ {
              'max-width': this.state.styles['input-max-width'],
              'max-height': this.state.styles['input-max-height'],
            } }> 
            <div ref={this.state.input} contenteditable='true' >
              {this.state.text}
            </div>
            <Field ref={this.state.field} name='send-message'
              autoFocus={true}
              style={ {height: '15px', 'overflow': 'hidden' } }
              validate={[]} placeholder='enter text message...'
              component={TextArea2} 
              propsRef={this.state.textarea}
              onChange={(e) => {
                debugger;
                if(e.nativeEvent.inputType === 'insertLineBreak') {
                  e.preventDefault();
                  this.props.handleSubmit();
              } } }
            /> 
          </div>
        </div>

        <div className={styles['submit-button-wrp']}>
          <button >
            <svg fill="none" class="rubicons send-alt" xmlns="http://www.w3.org/2000/svg" 
              width="36" height="36" 
              viewBox="0 0 24 24" 
              stroke="#ccc" stroke-width="1.5">
              <path d="M20 12L4 4l3.556 8L4 20l16-8zM7.556 12H20" stroke-linecap="round"></path>
            </svg>
          </button>
        </div>
        <div>
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
