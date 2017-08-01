let transformer = require("./transformer").transformer;

class subscriptTransformer extends transformer {
    transform(text) {
        return text.sub();
    }
}

exports.subscriptTransformer = subscriptTransformer;