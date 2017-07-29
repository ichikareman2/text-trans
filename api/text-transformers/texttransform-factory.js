let superscript = require("./superscript-transform");
let strikethrough = require("./strikethrough-transform");
let subscript = require("./subscript-transform")
function texttransformFactory () {

}
//set default
texttransformFactory.prototype.texttransformClass = superscript;
//factory
texttransformFactory.prototype.createTextTransform = (type) => {
    if (type === "superscript")
        this.texttransformClass = superscript;
    if (type === "strikethrough")
        this.texttransformClass = strikethrough;
    if (type === "subscript")
        this.texttransformClass = subscript;

    return new this.texttransformClass()
}

module.exports = texttransformFactory;