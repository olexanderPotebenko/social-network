import React from 'react';
import styles from './Anchor.module.css';
import arrow from '../../../assets/images/arrow.svg';
import {Transition} from 'react-transition-group';

const svg = <svg fill="none" class="rubicons chevron-up" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
  <path d="M18 15l-6-6-6 6" stroke-linecap="round"></path>
</svg>;

class Anchor extends React.Component {

  componentDidMount() {

    this.setState({ isMoveUp: false, visible: false, direction: this.props.direction || 'up' });
    setTimeout(() => this.addScollListener(), 200);
  }

  addScollListener = () => {
    this.props.scrollbar.current
      && this.props.scrollbar.current.addEventListener('scroll', e => {
        let scrollTop = e.target.scrollTop;
        let clientHeight = e.target.clientHeight;
        let scrollHeight = e.target.scrollHeight;
        this.setState({ scrollTop, clientHeight, scrollHeight });
        if(this.state.direction === 'up') {
          if(scrollTop > clientHeight/4){
            this.setState({visible: true})
          }else{
            this.setState({visible: false})
          }
        } else {
          if(scrollTop < scrollHeight - clientHeight*2){
            this.setState({visible: true})
          }else{
            this.setState({visible: false})
          }
        }
      });
  }

  componentWillUpdate(nextProps, nextState) {

    let bool = this.props.scrollbar.current != nextProps.scrollbar.current;
    this.props.scrollbar && nextProps.scrollbar
      && bool
      && this.addScollListener();

    if(nextState.isMoveUp){
      setTimeout(() => {
        this.props.scrollbar.current.scrollTop -= this.state.moveUpSpeed;
        if(this.state.direction === 'up') {
          if(this.props.scrollbar.current.scrollTop < 20){
            this.props.scrollbar.current.scrollTop = 0;
            this.setState({ isMoveUp: false });
          } else if(this.state.scrollTop > this.state.clientHeight){
            this.props.scrollbar.current.scrollTop = this.state.clientHeight;
          }
        } else {
          if(this.props.scrollbar.current.scrollTop > 
            this.props.scrollbar.current.scrollHeight - this.props.scrollbar.current.clientHeight - 100) {
            this.props.scrollbar.current.scrollTop = this.props.scrollbar.current.scrollHeight;
            this.setState({ isMoveUp: false });
          } else if(this.props.scrollbar.current.scrollTop < 
            this.props.scrollbar.current.scrollHeight - this.props.scrollbar.current.clientHeight * 2) {
            this.props.scrollbar.current.scrollTop = 
              this.props.scrollbar.current.scrollHeight - this.props.scrollbar.current.clientHeight * 2;
          }
        }

      }, 50);
    }
  }

  state = { 
    visible: false,
    direction: undefined,
    isMoveUp: false,
  }

  move = (e) => {
    //console.log(this.props.scrollbar.current.scrollTop);
    e.preventDefault();
    let current = this.props.scrollbar.current;
    let moveUpSpeed = 40; 
    if(this.state.direction === 'down')
      moveUpSpeed *= -1;
    this.setState({isMoveUp: true, moveUpSpeed});
  }

  render () {

    const duration = 150;

    const defaultStyle = {
      position: 'absolute',
      transition: `bottom ${duration}ms linear, opacity ${duration}ms linear`,
      bottom: 0,
      transform: 'translateY(100%)',
    }

    const transitionStyles = {
      entered: { 
        opacity: 1, 
        bottom: '100%',
      }, 
      exited: { 
        opacity: 0,
        bottom: '0%',
      },
    };

    setTimeout(() => console.log(this.state.direction), 100);
    return <div className={styles.wrp}>
      <Transition in={this.state.visible} timeout={duration}>
        {state => (
            <button 
          className={styles.container}
        onClick={this.move} 
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}>
        <div style={ this.state.direction === 'up'? {}: {transform: 'rotate(180deg)'} }>
          {svg}
        </div>
      </button>
        )}
    </Transition>
      </div>
  }
}

export default Anchor;
