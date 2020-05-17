import React from 'react'
import cls from './CreatePost.module.css';

const CreatePost = (props) => {

    let addPost =() => {
        let text = input.current.value;
        props.dispatch({type: 'ADD-POST', message: text});
        props.dispatch({type: 'ADD-NEW-TEXT', text: ''});
    };

    let addNewText = () => {
        let text = input.current.value;
        props.dispatch({type: 'ADD-NEW-TEXT', text: text});
    };

    let input = React.createRef();
    return (
        <div className={cls.wraper}>
            <textarea 
                ref={input} 
                value={props.textNewPost}
                placeholder='Enter new post' 
                onChange={addNewText}
            ></textarea>
            <button onClick={addPost}>Enter</button>
        </div>
    );
};

export default CreatePost;
