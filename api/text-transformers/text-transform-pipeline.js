module.exports = class pipeline {
    constructor(operations) {
        this.operations = [];
    }
    register (op) {
        this.operations.push(op);
    }
    execute (param) {
        let val = param
        this.operations.forEach((x) => {
            val = x.transform(val)
        })
        return val;
    }
}