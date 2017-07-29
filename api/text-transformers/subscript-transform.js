function subscriptTransform() {
    this.transform = (text) => {
        return text.sub();
    }
    return this;
}

module.exports = subscriptTransform;