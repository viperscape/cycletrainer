import React, { Component } from 'react';

class Settings extends Component {
    constructor(props)
    {
        super(props);
        
        this.state = { connected: false };

        this.Connected = this.Connected.bind(this);
        this.props.bus.on("data", this.Connected);
    }

    Connected(_, data)
    {
        this.setState({ connected: data.connected });
    }

    Restart()
    {
        this.props.bus.send("BLE_Restart");
        this.setState({connected:false});
    }

    componentWillUnmount()
    {
        this.props.bus.removeListener("data", this.Connected);
    }

    render() {
        return (
            <div>
                <div>
                    Connected to Trainer
                    <input type="checkbox" disabled={true} checked={this.state.connected}></input>
                </div>
                <button onClick={ () => this.Restart() }>Restart Bluetooth</button>
            </div>
        )
    }
}


export default Settings;