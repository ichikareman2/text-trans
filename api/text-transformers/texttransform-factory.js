let superscript = require("./transforms/superscript-transformer");
let strikethrough = require("./transforms/strikethrough-transformer");
let subscript = require("./transforms/subscript-transformer")

class textTransformerFactory {
    constructor() {
        // default
        this.transformClass = superscript.superscriptTransformer;
        this.transforms = [
            {
                name: superscript.name,
                transformer: superscript.superscriptTransformer
            },
            {
                name: strikethrough.name,
                transformer: strikethrough.strikethroughTransformer
            },
            {
                name: subscript.name,
                transformer: subscript.subscriptTransformer
            }
        ];
    }

    createTextTransform(typeName) {
        let type = this.transforms.find(x => x.name === typeName).transformer;
        if (type) {
            this.transformClass = type;
        }

        return new this.transformClass()
    }
}

exports.textTransformerFactory = textTransformerFactory;
