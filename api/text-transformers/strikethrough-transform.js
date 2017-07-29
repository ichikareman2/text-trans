function strikethroughTransform() {
    this.transform = (text) => {
        return text.strike();
    }
    return this;
}

module.exports = strikethroughTransform;