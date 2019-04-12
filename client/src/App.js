import React, { Component } from 'react';
import './App.css';
import { Button, Container } from 'react-bootstrap';

import Metrics from "./metrics";
import Settings from "./settings";

const { ipcRenderer } = window.require('electron');

const Screens = { Metrics: 0, Settings: 1 };

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { screen: Screens.Metrics };
        this.setScreen = this.setScreen.bind(this);
    }

    setScreen(e)
    {
       this.setState({screen: Screens[e.target.value]});
    }

    render() {
        return (
            <div className="App">
            <Container>
            {this.state.screen === Screens.Metrics &&
            <div>
                <Button className="Settings-Button" variant="secondary" onClick={this.setScreen} value="Settings">Settings</Button>
                <Metrics bus={ipcRenderer}/>
            </div>
            }

            {this.state.screen === Screens.Settings &&
            <div>
                <Button onClick={this.setScreen} value="Metrics">Back</Button>
                <Settings bus={ipcRenderer}/>
            </div>
            }

            </Container>
            </div>
        );
    }
}

export default App;
