import React from 'react';
import styles from './AvatarByPath.module.css';
import FetchingToggle from '../FetchingToggle/FetchingToggle.jsx';
import avatar_default from '../../../assets/images/avatar_default.png';
import {host} from '../../../api/api.js';

class AvatarByPath extends React.Component {

  state = {
    id: this.props.id,
    photo: `http://${host}:8080/profile/${this.props.id}/photos/small/${this.props.photo}`,
    load: false,
  }

  componentDidMount() {
  }
  componentDidUpdate(prevProps) {
    if(prevProps.id !== this.props.id || prevProps.photo !== this.props.photo){
      this.setState({
        id: this.props.id,
        photo: `http://${host}:8080/profile/${this.props.id}/photos/small/${this.props.photo}`,
        load: false,
      });
    }
  }

  onError = () => {
    this.setState({photo: avatar_default});
    this.setState({load: true});
  }

  onLoad = () => {
    this.setState({load: true});
  }

  render() {

    return <div className={styles.avatar}
        style={this.props.styles && this.props.styles.wrp}
    >
      { !this.state.load
          && <div className={styles.fetching}>
      <FetchingToggle />
    </div>
      }
      <img src={this.state.photo} 
        style={this.props.styles && this.props.styles.img}
        onLoad={this.onLoad}
        onError={this.onError} />
      </div>
  }
}

export default AvatarByPath;
