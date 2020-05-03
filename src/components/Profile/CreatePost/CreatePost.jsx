import React from 'react'
import cls from './CreatePost.module.css';

const CreatePost = (props) => {

    let addPost =() => {
        let text = input.current.value;
        props.addPost(text);
        props.addNewText('');
    };

    let addNewText = () => {
        let text = input.current.value;
        props.addNewText(text);
    };

    let input = React.createRef();
    return (
        <div className={cls.wraper}>
            <textarea 
                ref={input} 
                value={props.profilePage.textNewPost}
                placeholder='Enter new post' 
                onChange={addNewText}
            ></textarea>
            <button onClick={addPost}>Enter</button>
        </div>
    );
};

export default CreatePost;