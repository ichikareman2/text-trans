const factory = require("./texttransform-factory");

function transform (type, text) {
    return new factory().createTextTransform(type).transform(text);
}

exports.transform = transform;