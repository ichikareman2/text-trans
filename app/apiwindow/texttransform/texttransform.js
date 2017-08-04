const electron = require('electron');
const ipc = electron.ipcRenderer;
let api = require("../../../api/text-transformers/text-transform-api.js")

ipc.on("call", (event, args, uid) => {
    let method = args.method;
    let params = args.params;
    /// temporary
    if(method == "ping") {
        console.log(args);
        event.sender.send(uid, `pinged: ${params.message}`, uid)
        return;
    }
        
    /// temporary
    let result = api[method](params.type, params.text);

    event.sender.send(uid, result, uid);
})