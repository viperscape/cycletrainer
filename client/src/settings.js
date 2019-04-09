import React, { Component } from 'react';

class Settings extends Component {
    constructor(props)
    {
        super(props);
        
        this.state = { connected: false };
        let self = this;
        this.props.bus.on("data", function () {
            self.setState({ connected: true });
        });
    }

    Restart()
    {
        this.props.bus.send("BLE_Restart");
        this.setState({connected:false});
    }

    render() {
        return (
            <div>
                <div>
                    Connected to Trainer
                    <input type="checkbox" disabled={true} value={this.state.connected}></input>
                </div>
                <button onClick={ () => this.Restart() }>Restart Bluetooth</button>
            </div>
        )
    }
}


export default Settings;