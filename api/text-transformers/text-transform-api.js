const factory = require("./texttransform-factory").textTransformerFactory;

function transform (type, text) {
    return new factory().createTextTransform(type).transform(text);
}

exports.transform = transform;  