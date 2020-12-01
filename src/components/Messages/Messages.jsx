import React from 'react';
import cls from './Messages.module.css';

import {compose} from 'redux';
import {connect} from 'react-redux';
//hoocs
import WithSignInRedirect from '../../hocs/WithSignInRedirect.jsx';
import WithAuthData from '../../hocs/WithAuthData.jsx';
//components
import FetchingToggle from '../commons/FetchingToggle/FetchingToggle';
//reducers
import {getDialogs, createDialog} from '../../reducers/messagesReducer';

class Messages extends React.Component {

    componentDidMount() {
        let options = {
            id: this.props.auth.id,
            token: this.props.auth.token,
        };
        this.props.getDialogs(options);

    }

    render() {
        return (
            <div>
                {
                    this.props.isFetching
                        && <div style={ {
                            width: 40,
                            height: 40,
                            margin: 'auto',
                            'padding-top': 200,
                        } }>
                            <FetchingToggle background={true}
                            />
                                </div>
                        || <div className={cls.message__wraper}>
                            'messages'

                        </div>
                }
                    </div>
        );
    };
};

let mapsStateToProps = state => {
    return {
        isFetching: state.messagesPage.isFetching,
    };
};

export default compose(
    WithAuthData,
    WithSignInRedirect,
    connect(mapsStateToProps, {getDialogs, createDialog}),
)(Messages);
