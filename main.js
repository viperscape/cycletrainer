const BLE = require("./ble")
const url = require('url');
const path = require('path');


const { app, Menu, BrowserWindow, ipcMain } = require('electron');
let Window = null;
let Bluetooth = null;

function createWindow() {
    let win = new BrowserWindow({ width: 800, height: 600, icon: "favicon.ico" });
    //win.webContents.openDevTools();

    win.loadURL('http://localhost:3000');
    //win.loadFile("/static/index.html");

    Menu.setApplicationMenu(null);

    return win;
}


app.on('ready', () => {
    Window = createWindow();
    Bluetooth = new BLE(Window.webContents);
    
    ipcMain.on("BLE_Restart", () => { Bluetooth.Restart() });
});