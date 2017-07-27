const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const url = require("url");
const path = require("path");
const app = electron.app;


let win;
function createWindow(){
    win = new BrowserWindow({width:490, height:225})
    win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    }))
}

app.on("ready", createWindow);
app.on("closed", () => {
    win = null;
})
