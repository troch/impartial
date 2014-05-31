var generator = {};

function Attribute (token) {
    if (token.type === 'emptyAttr') {
        this.name = token.val;
        this.value = token.val;
    }
    if (token.type === 'attr') {
        this.name = token.val[0];
        this.value = token.val[1];
    }
}

function Element (token, parent) {
    this.name = token.val;
    this.attrs = [];
    this.content = [];
    this.parent = parent;

    this.addAttr = function (token) {
        this.attrs.push(new Attribute(token));
    };
}

generator.buildElementTree = function (tokens) {
    var elements = [],
        currentElement;

    for (var token in tokens) {
        var type = tokens[token].type;
        if (type === 'element') {
            currentElement = new Element(tokens[token]);
            elements.push(currentElement);
        } else if (type === 'attr' || type === 'emptyAttr') {
            currentElement.addAttr(tokens[token]);
        }
    }

    return elements;
}

module.exports = generator;
