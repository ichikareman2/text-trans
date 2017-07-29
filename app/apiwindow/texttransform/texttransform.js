const electron = require('electron');
const ipc = electron.ipcRenderer;
let api = require("../../../api/text-transformers/text-transform-api.js")

ipc.on("call", (event, args, uid) => {
    let method = args.method;
    let params = args.params;
    
    let result = api[method](params.type, params.text);

    event.sender.send(uid, result, uid);
})
ipc.send("ping");