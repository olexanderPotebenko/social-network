import React from 'react';
import styles from './FullSizeImage.module.css';
import FullSizeToggle from '../FullSizeToggle/FullSizeToggle.jsx';

class FullSizeImage extends React.Component {

    constuctor() {
        this.super();
        this.setState({itemPhoto: 0});
    }

    componentDidMount () {
        let itemPhoto = this.props.posts.findIndex(
        post => post.picture == this.props.picture);
        debugger;
        this.setState({
            itemPhoto
        });

        window.addEventListener('resize', () => {
            this.forceUpdate();
        });

    }

    componentWillUpdate () {
        window.removeEventListener('resize', () => {
            this.forceUpdate();
        });
    }

    state = {
        itemPhoto: 0,
    }

    nextPhoto = () => {
        this.setState({
            itemPhoto: --this.state.itemPhoto,
        });
    }

    backPhoto = () => {
        this.setState({
            itemPhoto: ++this.state.itemPhoto,
        });
    }

    render() {
        let wrp_ref = React.createRef();
        let container_ref = React.createRef();
        let widthPicture = 0;
        let heightPicture = 0;

        let photos = this.props.posts.map(
            (post) => {
                let picture = post.picture;
                debugger;
                return (<div ref={container_ref} className={styles.container} 
                    style={ {
                        width: document.body.clientWidth, 
                        height: document.body.clientHeight,
                        float: 'left',
                        position: 'relative',
                        overflow: 'hidden',
                    } }
                >
                        <div style={ {
                            position: 'absolute',
                            top: -1, bottom: -1, left: -1, right: -1,
                        } }>
                            <img 
                                style={ {
                                    'background-image': `url(${picture})`,
                                    'background-repeat': 'no-repeat',
                                    'background-size': 'contain',
                                    'background-position': 'center',
                                } }/>
                            </div>
                        </div>
                );
            });



        return <div className={styles.wrp}
            ref={wrp_ref}
            style={ {
                width: document.body.clientWidth, 
                height: document.body.clientHeight,
            } }
        >
                <div style={ {
                    width: document.body.clientWidth * this.props.posts.length,
                    position: 'absolute',
                    top: 0, bottom: 0,
                    left: -document.body.clientWidth * this.state.itemPhoto,
                    display: 'inline-block',
                } }>
                    {photos}
                </div>
                <div className={styles['toggle-panel-wrp']} >
                    <div className={styles['toggle-panel']}>
                        <button className={styles['back-button']}
                            disabled={this.state.itemPhoto >= this.props.posts.length - 1}
                            onClick={this.backPhoto}
                        >
                            back
                        </button>
                        <button className={styles['next-button']}
                            disabled={this.state.itemPhoto <= 0}
                            onClick={this.nextPhoto}>
                            next
                        </button>
                        <FullSizeToggle fullSizeToggle={this.props.fullSizeToggle} />
                    </div>
                </div>
            </div>
    }
}

export default FullSizeImage;
