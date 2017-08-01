let transformer = require("./transformer").transformer;
class strikethroughTransformer extends transformer {
    transform(text) {
        return text.strike();
    }
}

exports.strikeTransformer = strikethroughTransformer;


// // module.exports.strikeThroughTransformer = 
// let strikeThroughTransformer = function () {};
// strikeThroughTransformer.prototype = Object.create(itransform);
// strikeThroughTransformer.prototype.transform = function (text) {
//     return text.strike();
// }

// exports.strikeThroughTransformer = strikeThroughTransformer;


