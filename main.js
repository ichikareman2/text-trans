const electron = require('electron');
const ipc = electron.ipcMain;
const url = require("url");
const path = require("path");

const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

// main window
let win;
// let win2;
// collection of browser windows for APIs
let apiWindows = [];
// channels for replies
let replySlots = [];

function createMainWindow() {
    win = new BrowserWindow({
        width: 490,
        height: 225,
        resizable: false,
        frame: false,

    })
    win.loadURL(url.format({
        pathname: path.join(__dirname, "app", "index.html"),
        protocol: "file:",
        slashes: true
    }))
    console.log(path.join(__dirname, "app", "index.html"))
}
function createTextTransformerWindow() {
    let win2 = new BrowserWindow({
        show: false
    });

    win2.loadURL(url.format({
        pathname: path.join(__dirname, "app", "apiwindow/texttransform/texttransform.html"),
        protocol: "file",
        slashes: true
    }))
    win2.webContents.openDevTools();
    apiWindows.push((["textTransformer", win2]));
    console.log("text transormer loaded?")
}

app.on("ready", () => {
    createMainWindow();
    createTextTransformerWindow();
});
app.on("closed", () => {
    win = null;
    apiWindows = null;
    replySlots = null;
})

ipc.on("ping", (event, args) => {
    console.log("pinged")
})

ipc.on("apiCall", (event, arg) => {
    // get api, method to call and params to send
    let apiNameToCall = arg.api;
    let methodToCall = arg.method;
    let params = arg.params;
    let apiToCall = apiWindows.find(x => x[0] === apiNameToCall)[1];

    // make uid for 1 time channel to expect reply from for this request
    let uid = makeUid(replySlots.map(x => x.channel));

    // store channel and api called
    replySlots.push({ channel: uid, window: apiToCall, replyEvent: event });

    // send the request to api window which will call the api and reply with its result
    let req = {
        method: methodToCall,
        params: params
    };
    apiToCall.webContents.send("call", req, uid);
    console.log("sent")

    // set up a 1 time channel to receive the reply with result
    // 
    ipc.once(uid, (event, arg, replyUid) => {
        let indexToRemove = replySlots.findIndex(x => x.channel === replyUid)
        // let replySlot = replySlots.splice(indexToRemove, 1);

        // //somehow doesnt work
        // // seems to not work because there is no global variable to hold it anymore?
        // replySlot.replyEvent.sender.send("apiReply", arg);
        // replySlot.replyEvent.sender.send("apiReply", arg)
        replySlots[indexToRemove].replyEvent.sender.send("apiReply", arg)
        console.log("received reply");
    })
})

// function to make a uid not existing in context (list of uid)
function makeUid(context) {
    let uid;
    do {
        uid = Number(process.hrtime().join(""));
    }
    while (context.indexOf(uid) > -1)

    return uid;
}

// // make a object prototype for api request like:
// { 
//     // what method name, and to call in the api like: api[method]()
//     method: string,
//     // paramter to pass
//     parameter: any
// }

// ipc.on("close-main-window", () => app.quit());