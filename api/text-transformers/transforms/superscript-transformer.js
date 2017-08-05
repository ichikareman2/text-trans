let transformer = require("./transformer").transformer;

class superscriptTransformer extends transformer {
    transform (text) {
        return text.sup();
    }
}

exports.superscriptTransformer = superscriptTransformer;
exports.name = "superscript"