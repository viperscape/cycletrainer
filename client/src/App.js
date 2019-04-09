import React, { Component } from 'react';
import './App.css';

import Metrics from "./metrics";
import Settings from "./settings";

const { ipcRenderer } = window.require('electron');

const Screens = { Metrics: 0, Settings: 1 };

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { screen: Screens.Settings };
        this.setScreen = this.setScreen.bind(this);
    }

    setScreen(e)
    {
       this.setState({screen: Screens[e.target.value]});
    }

    render() {
        return (
            <div className="App">
            {this.state.screen === Screens.Metrics &&
            <div>
                <button onClick={this.setScreen} value="Settings">Settings</button>
                <Metrics bus={ipcRenderer}/>
            </div>
            }

            {this.state.screen === Screens.Settings &&
            <div>
                <button onClick={this.setScreen} value="Metrics">Back</button>
                <Settings bus={ipcRenderer}/>
            </div>
            }

            </div>
        );
    }
}

export default App;
