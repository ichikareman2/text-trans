const electron = require("electron");
const ipc = electron.ipcRenderer;


// class channel {
//     // constructor (channel, event) {
//     constructor(channel) {
//         this.channel = channel;
//         // this.event = event;
//     }
// }


class callRequest {
    constructor(method, params) {
        this.method = method;
        this.params = params;
    }
}
class apiCallRequest extends callRequest {
    // constructor (api, method, params) {
    constructor(api, callRequest) {
        super(callRequest.method, callRequest.params);
        this.api = api;
    }
}

class apiCaller {
    constructor(api) {
        this.channels = []
        this.api = api;
    }

    apiCall(request, callback) {
        // make a channel
        let uid = makeUid(this.channels);
        let newChannel = uid;

        // store channel
        // do i even need the channel list for this? yes so that there are no duplicate channel
        this.channels.push(newChannel);

        // ipc send the request
        // need to know: api, method, params, channel to return to
        let apiRequest = new apiCallRequest(this.api, request)
        ipc.send("apiCall", apiRequest, newChannel)
        // make once for channel which should delete from this.channels
        ipc.once(newChannel, (event, args) => {
            callback(args)
            let indexToRemove = this.channels.indexOf(newChannel);
            this.channels.splice(indexToRemove, 1);
        })
    }
}

function makeUid(existingIds) {
    let uid;
    do {
        uid = Number(process.hrtime().join(""));
    }
    while (existingIds.indexOf(uid) > -1)

    return uid;
}

// export { apiCaller, callRequest }
exports.apiCaller = apiCaller;
exports.callRequest = callRequest;