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
        this.state = { screen: Screens.Metrics, metrics: { weight: 80 } };
        this.setScreen = this.setScreen.bind(this);

        this.set_metrics = (d) => this.setState({ metrics: d });
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
                <Button className="Settings-Button" variant="secondary" onClick={this.setScreen} value="Settings">Settings</Button>
                <Metrics bus={ipcRenderer} metrics={this.state.metrics}/>
            </div>
            }

            <Container>
            {this.state.screen === Screens.Settings &&
            <div>
                <Button onClick={this.setScreen} value="Metrics">Back</Button>
                <Settings bus={ipcRenderer} set={this.set_metrics}/>
            </div>
            }

            </Container>
            </div>
        );
    }
}

export default App;
