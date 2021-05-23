import React from 'react';
import styles from './Avatar.module.css';
import FetchingToggle from '../FetchingToggle/FetchingToggle.jsx';
import avatar_default from '../../../assets/images/avatar_default.png';

class Avatar extends React.Component {

  state = {
    id: this.props.id,
    photo: `http://localhost:8080/profile/${this.props.id}/avatar`,
    load: false,
  }

  componentDidMount() {
  }
  componentDidUpdate(prevProps) {
    if(prevProps.id !== this.props.id){
      this.setState({
        id: this.props.id,
        photo: `http://localhost:8080/profile/${this.props.id}/avatar`,
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

export default Avatar;
