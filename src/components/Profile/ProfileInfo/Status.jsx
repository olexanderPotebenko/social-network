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
                        'loh'
                    </div>
                }
            </div>
            </>;
    };
};

export default Status;
