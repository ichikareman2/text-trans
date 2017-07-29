function superscriptTransform() {
    this.transform = (text) => {
        return text.sup();
    }
    return this;
}

module.exports = superscriptTransform;