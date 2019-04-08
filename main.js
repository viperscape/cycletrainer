const { spawn } = require('child_process');
const BLE = spawn('support/BLE_App', []);
const url = require('url');
const path = require('path');


const { app, Menu, BrowserWindow } = require('electron');
let Win = null;

function createBLE()
{
    BLE.stdout.on('data', (data) => {
        let d = JSON.parse(data.toString());
        Win.webContents.send("data", d);
    });

    BLE.stderr.on('data', (data) => {
        console.error(d);
    });

    BLE.on('exit', (code) => {
        console.log(`Child exited with code ${code}`);
    });
    BLE.on('close', (code) => {
        console.log(`Child exited with code ${code}`);
    });
}


function createWindow() {
    Win = new BrowserWindow({ width: 800, height: 600, icon: "favicon.ico" });
    Win.webContents.openDevTools();

    Win.loadURL('http://localhost:3000');
    //win.loadFile("/static/index.html");
    Menu.setApplicationMenu(null);
    setTimeout(createBLE, 1000)
}

app.on('ready', createWindow);