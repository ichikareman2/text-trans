const transformFactory = require("./texttransform-factory").textTransformerFactory;
const pipeline = require("./text-transform-pipeline")

function transform (types, text) {
    let factory = new transformFactory();
    let pipe = new pipeline();

    let transforms = types.map(x => factory.createTextTransform(x));
    transforms.forEach(x => pipe.register(x))
    let retVal = pipe.execute(text);
    return retVal;
}

exports.transform = transform;  