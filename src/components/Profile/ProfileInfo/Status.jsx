import React from 'react';

class Status extends React.Component {
    state = {
        edit_mode: false,
    };

    render() {
        return <> 
            <div>
                {
                    this.state.edit_mode && <div>
                        <input 
                        onBlur={() => {this.setState({edit_mode: false})} }
                            autoFocus={true} />
                    </div>
                }
                </div>
            <div>
                {
                    !this.state.edit_mode && <div 
                        onDoubleClick={() => {this.setState({edit_mode: true})} } >
                        'Hello! This is my social network)'
                    </div>
                }
            </div>
            </>;
    };
};

export default Status;
