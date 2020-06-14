import React from 'react';
import {connect} from 'react-redux';

const SignIn  = (props) => {

    return (
        <div>
            <input placeholder='enter your email' />
            <input placeholder='enter password' />
            <button>Sign in</button>
        </div>
    );
};

const mapsStateToProps = (state) => {
    return {
    };
};

const mapsDispatchToProps = {

};

export default connect(mapsStateToProps, mapsDispatchToProps)(SignIn);
