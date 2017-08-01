// require("normalize.css")
const electron = require('electron');
const ipc = electron.ipcRenderer;


let transformIn = document.getElementById("transform-in");
let transformOut = document.getElementById("transform-out");
let transformBtn = document.getElementById("transform-btn");

transformBtn.addEventListener("click", () => {
    let op = {
        api: "textTransformer",
        method: "transform",
        params: {
            type: "superscript",
            text: transformIn.value
        }
    };
    ipc.send("apiCall", op);
})
ipc.on("apiReply", (event, args) => {
    transformOut.innerHTML = args;
})







// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms))
// }

// async function trySleep() {
//     console.log("sleep");
//     await sleep(10000);
//     console.log("woke up");
// }
// alert("hey");
// console.log("test")
// trySleep();
// //what i want
// separate invi window for api
// separate visible window for page/ui

// window webpage will send message to main, like this:
// https://github.com/electron/electron/blob/master/docs/api/ipc-main.md
// and main will send message to invi api window
// which will receive message and data, process the data and send a reply to main
// which will receive the reply from api window and send a reply to page/ui window