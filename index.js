const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

app.on("ready", createWindow);

function createWindow(){
    let win = new BrowserWindow({width:490, height:225})
}