import React, { Component } from 'react';
import './App.css';

import { CalcSpeed } from "./metrics";
import Settings from "./settings";

const { ipcRenderer } = window.require('electron');

class App extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            power: null, speed: null, revs: null, 
            bikespeed: 0, distance: 0 
        };

        let self = this;
        ipcRenderer.on("data", function(event, data) {
            let mass = 80; // kgs
            let gradient = 0.0; // degrees
            data.bikespeed = CalcSpeed(9.80665, data.power, mass, gradient);
            let wheelsize = 668; // 700c
            let distance = (data.revs * wheelsize * Math.PI) * 0.000001; // kilometers
            distance = distance.toFixed(2);
            if (data.revs > self.state.revs)
                data.distance = self.state.distance + distance;
            else 
                data.distance = distance;

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
                <div>Cadence {this.state.speed}</div>
                <div>Bike Speed {this.state.bikspeed}</div>
                <div>Distance {this.state.distance}</div>
            </div>

            <Settings bus={ipcRenderer}/>
            </div>
        );
    }
}

export default App;
