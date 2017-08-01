let superscript = require("./transforms/superscript-transformer").superscriptTransformer;
let strikethrough = require("./transforms/strikethrough-transformer").strikeThroughTransformer;
let subscript = require("./transforms/subscript-transformer").subscriptTransformer

class textTransformerFactory {
    constructor(type) {
        this.transformClass = type || superscript;
    }
    
    createTextTransform(type) {
        if (type === "superscript")
            this.texttransformClass = superscript;
        if (type === "strikethrough")
            this.texttransformClass = strikethrough;
        if (type === "subscript")
            this.texttransformClass = subscript;

        return new this.transformClass()
    }
}

exports.textTransformerFactory = textTransformerFactory;

// function texttransformFactory() {

// }
// //set default
// texttransformFactory.prototype.texttransformClass = superscript;
// //factory
// texttransformFactory.prototype.createTextTransform = (type) => {
//     if (type === "superscript")
//         this.texttransformClass = superscript;
//     if (type === "strikethrough")
//         this.texttransformClass = strikethrough;
//     if (type === "subscript")
//         this.texttransformClass = subscript;

//     return new this.texttransformClass()
// }

// module.exports = texttransformFactory;