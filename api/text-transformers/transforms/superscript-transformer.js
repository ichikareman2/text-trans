const transformer = require("./transformer").transformer;
class pair {
    constructor(char, trans) {
        this.char = char;
        this.trans = trans;
    }
}
let numbers = "0123456789";
let alphabet = "abcdefghijklmnoprstuvwxz"

let numberTrans = "⁰¹²³⁴⁵⁶⁷⁸⁹"
let alphabetTrans = "ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖʳˢᵗᵘᵛʷˣʸᶻ"

let orig = numbers.concat(alphabet);
let transformed = numberTrans.concat(alphabetTrans);

let pairs = Array.prototype.map.call(orig, (x, i) => new pair(x, transformed[i]));

class superscriptTransformer extends transformer {
    constructor() {
        super();
        this.pairs = pairs;
    }
    transform(text) {
        // return text.sup();
        return this._transform(text);
    }

    _transform(text) {
        // let toBeReplaced = Array.prototype.filter.call(text, (x, i) => text.indexOf(x) === i)
        let result = text;
        Array.prototype.forEach.call(result, (c) => {
            if (result.indexOf(c) > -1 && this.pairs.findIndex(x => x.char === c) > -1)
                result = result.replace(c, this.pairs.find(x => x.char === c).trans)
        })
        return result;
        // toBeReplaced.forEach(x => result = result.replace(x, this.pairs.find(y => y.char === x).trans))
        // return result;
    }
}

exports.superscriptTransformer = superscriptTransformer;
exports.name = "superscript"