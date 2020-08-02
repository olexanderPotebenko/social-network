import React from 'react';
import styles from './FollowButton.module.css';
import {connect} from 'react-redux';
import {followApi} from '../../../api/api';
import {setSubscribed} from '../../../reducers/authReducer';

class FollowButton extends React.Component {

    state = {
        isFetching: false,
    }

    componentDidMount() {

        debugger;
        let followed = this.props.subscribed.map(user => user.id).includes(this.props.user.id);
        this.setState({ followed });
    }

    async onFollow () {
        debugger;
        let options = {
            id: this.props.auth.id,
            user_id: this.props.user.id,
            token: this.props.auth.token,
        };
        this.setState({isFetching: true});
        followApi.follow(options)
            .then(data => {
                if(data.result_code === 0){

                    debugger;
                this.props.setSubscribed(this.props.user);
                this.setState({isFetching: false})
                this.setState({followed: true})
                }else{

                this.setState({isFetching: false})
                }
            });
    };

    onUnfollow () {
                    debugger;
        let options = {
            id: this.props.auth.id,
            user_id: this.props.user.id,
            token: this.props.auth.token,
        };

        this.setState({isFetching: true});
        followApi.unfollow(options)
            .then(data => {
                if(data.result_code === 0){

                    debugger;
                this.props.setSubscribed(this.props.user);
                this.setState({followed: false})
                this.setState({isFetching: false})
                }else{

                this.setState({isFetching: false})
                }
            });
    };

    isDisabled () {
        return this.state.isFetching;
    };

    render() {
        debugger;
            
        return (
            <div className={styles.wrp}>
                <div className={styles.container}>
                    <button className={this.state.followed && styles.followed || styles.follow}
                        disabled={this.isDisabled()}
                        onClick={ this.state.followed ? this.onUnfollow.bind(this): this.onFollow.bind(this) }>
                        {this.state.followed && 'FOLLOWED' || 'FOLLOW'}
                    </button>
                </div>
            </div>
        );
    }
};

let mapStateToProps = (state) => {
    return {
        auth: state.auth,
        subscribed: state.auth.subscribed_to,
    }
};

export default connect(mapStateToProps, {setSubscribed})(FollowButton);
