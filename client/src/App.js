import React, { Component } from 'react';
import './App.css';

const { ipcRenderer } = window.require('electron');

class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {power: null, speed: null, revs: null};

        let self = this;
        ipcRenderer.on("data", function(event, data) {
            self.setState(data);
        });
    }

    render() {
        return (
            <div className="App">
            {(this.state.power<0 || !this.state.power) && 
                <div>
                    Finding Trainer
                </div>
            }
            <div>
                <div>Power {this.state.power}</div>
                <div>Speed {this.state.speed}</div>
                <div>Revs {this.state.revs}</div>
            </div>
            </div>
        );
    }
}

export default App;
