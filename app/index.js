// require("normalize.css")
const electron = require('electron');
const ipc = electron.ipcRenderer;
const apiCaller = require('../apicaller/apicaller')
const callRequest = apiCaller.callRequest;
const caller = new apiCaller.apiCaller("textTransformer");


document.addEventListener("DOMContentLoaded", () => {
    let transformIn = document.getElementById("transform-in");
    let transformOut = document.getElementById("transform-out");
    let transformBtn = document.getElementById("transform-btn");
    // contains checkbox elements
    let checkboxes = [];

    transformBtn.addEventListener("click", () => {
        
        let request = new callRequest("transform", { type: ["superscript", "strikethrough"], text: transformIn.value })
        caller.apiCall(request, (res) => transformOut.innerHTML = res)
    })
    
    // // get transform options
    // let req = {
    //     api: "textTransformer",
    //     method: "getOptions",
    //     params: {}
    // }
    // ipc.send("apiCall", req);
    // //wrong cause there is already an api reply
    // ipc.once("apiReply", (event, args) => {
    //     let field = document.getElementById("transform-options");
    //     args.foreach(x => {
    //         let checkbox = document.createElement("input");
    //         checkbox.type = "checkbox";
    //         checkbox.value = x.value
    //         checkbox.id = `${x.value}-chk`
    //         let label = document.createElement("label");
    //         let labelText = document.createTextNode(x.value)
    //         label.appendChild(labelText);
    //         label.htmlFor = checkbox.id;
    //         let container = document.createElement("div");
    //         container.appendChild(label)
    //         container.appendChild(checkbox)

    //         checkboxes.push(checkbox);

    //         field.appendChild(container);
    //     })
    // })
    // /// TEMPORARY
    // console.log("dom ready. will send ping to textTransformer")
    // let caller = new apiCaller.apiCaller("textTransformer");
    // let request = new apiCaller.callRequest("ping", { message: "hello" });
    // caller.apiCall(request, (res) => {
    //     console.log("index response:  " + res)
    // });
    // /// TEMPORARY
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