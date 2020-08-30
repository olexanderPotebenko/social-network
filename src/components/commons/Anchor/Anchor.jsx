import React from 'react';
import styles from './Anchor.module.css';
import arrow from '../../../assets/images/arrow.svg'

class Anchor extends React.Component {

    componentDidMount() {
        this.setState({ isMoveUp: false, visible: false });
        setTimeout(() => this.addScollListener(), 200);
    }

    addScollListener = () => {
        debugger;
        this.props.scrollbar.current
        && this.props.scrollbar.current.addEventListener('scroll', e => {
            let scrollTop = e.target.scrollTop;
            let clientHeight = e.target.clientHeight;
            let scrollHeight = e.target.scrollHeight;
            this.setState({ scrollTop, clientHeight, scrollHeight });
            debugger;
            if(scrollTop > clientHeight/2){
                this.setState({visible: true})
            }else{
                this.setState({visible: false})
            }
        });

    }

    componentWillUpdate(nextProps, nextState) {

        let bool = this.props.scrollbar.current != nextProps.scrollbar.current;
        debugger;
        this.props.scrollbar && nextProps.scrollbar
            && bool
            && this.addScollListener();

        if(nextState.isMoveUp){
            setTimeout(() => {
                this.props.scrollbar.current.scrollTop -= this.state.moveUpSpeed;
            }, 100);
            if(this.props.scrollbar.current.scrollTop < 20){
                this.props.scrollbar.current.scrollTop = 0;
                this.setState({ isMoveUp: false });
            };
        }
    }

    state = { 
        visible: false,
        isMoveUp: false,
    }

    moveUp = (e) => {
        console.log(this.props.scrollbar.current.scrollTop);
        e.preventDefault();
        let current = this.props.scrollbar.current;
        let moveUpSpeed = current.scrollTop/10;
        this.setState({isMoveUp: true, moveUpSpeed});
    }

    render () {


        return <div className={styles.arrow_wrp} 
        style={ {display: this.state.visible ? 'block': 'none'} }>
            <a className={styles.arrow} href='' onClick={this.moveUp}>
                <img src={arrow} />
            </a>
        </div>
    }
}

export default Anchor;
