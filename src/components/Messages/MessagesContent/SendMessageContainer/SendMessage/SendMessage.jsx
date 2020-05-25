import React from 'react';
import cls from './SendMessage.module.css';

import {ADD_NEW_TEXT_MESSAGE, ADD_NEW_MESSAGE} from '../../../../../reducers/messagesReducer.js';

const SendMessage = (props) => {

    let input = React.createRef();

    let addNewText = () => {
        let text = input.current.value;
        props.dispatch({type: ADD_NEW_TEXT_MESSAGE, text, id: 1});
    };

    let addMessage = () => {
        let text = input.current.value;
        props.dispatch({type: ADD_NEW_MESSAGE, id: 1});
        props.dispatch({type: ADD_NEW_TEXT_MESSAGE, text: '', id: 1});
    };

    return (
        <div className={cls.add_message_wrapper}>
            <div className={cls.add_message}>
                <textarea
                    onChange={addNewText}
                    ref={input} 
                    value={props.textNewMessage}
                    placeholder='Enter new post' 
                ></textarea>
                <button onClick={addMessage}>Enter</button>
            </div>
        </div>
    )};

export default SendMessage;
