import React, { Component } from 'react';
import './App.css';

import Metrics from "./metrics";
import Settings from "./settings";

const { ipcRenderer } = window.require('electron');

class App extends Component {
    render() {
        return (
            <div className="App">
            <Metrics bus={ipcRenderer}/>
            <Settings bus={ipcRenderer}/>
            </div>
        );
    }
}

export default App;
