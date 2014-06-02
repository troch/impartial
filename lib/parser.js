var isSelfClosingTag = require('./self-closing-tags');

function Attribute (token) {
    if (token.type.indexOf('emptyAttr') === 0) {
        this.name = token.val;
        this.value = token.val;
    }
    if (token.type === 'attr') {
        this.name = token.val[0];
        this.value = token.val[1];
    }
    if (token.type === 'id') {
        this.name = 'id';
        this.value = token.val;
    }
    if (token.type === 'class') {
        this.name = 'class';
        this.value = token.val.replace(/\./g, ' ');
    }
}

function Element (token, parent) {
    this.name = token.type === 'element' ? token.val : null;
    this.attrs = [];
    this.content = token.type === 'element' ? [] : token.val;
    this.position = {
        line: token.line,
        identation: token.identation
    };
    this.parent = parent;

    this.addAttr = function (attr) {
        this.attrs.push(attr);
    };

    this.addContent = function (content) {
        // Delete parent property
        delete content.parent;
        this.content.push(content);
    };
}

function buildElementTree (tokens) {
    var parents = [],
        elements = [],
        tree = [],
        currentElement,
        prevToken,
        token,
        i;

    function getParent(token) {
        if (parents.length === 0) {
            return undefined;
        }
        for (var i = parents.length - 1; i >= 0; i--) {
            if (parents[i].position.identation < token.identation) {
                return [i, parents[i]];
            }
        }
        return undefined;
    }

    // Build a list of elements with their parent property set
    for (i in tokens) {
        token = tokens[i];
        if (token.type === 'element' || token.type === 'text') {
            // Add currentElement to list of elements
            if (currentElement) {
                elements.push(currentElement);
            }
            // Look for parent
            var currentParent = getParent(token);
            currentElement = new Element(token, currentParent !== undefined ? currentParent[1] : undefined);
            if (currentParent === undefined) {
                // Add to list of parents if not self closing
                parents = currentElement.name === null || isSelfClosingTag(currentElement.name) ? [] : [currentElement];
            } else if (currentParent !== undefined) {
                parents = parents.slice(0, currentParent[0] + 1);
                // Push in array of parents if not self closing
                if (currentElement.name !== null && !isSelfClosingTag(currentElement.name)) {
                    parents.push(currentElement);
                }
            }
        } else if (token.type === 'attr' || token.type.indexOf('emptyAttr') === 0
            || token.type === 'class' || token.type === 'id') {
            currentElement.addAttr(new Attribute(token));
        }
    }
    elements.push(currentElement);

    // Build a tree
    // Function to add elements to their parent
    function addElementsTo(parent) {
        remainingElements = [];
        elements.filter(function (el) {
            if (el.parent === parent) {
                return true;
            }
            remainingElements.push(el);
            return false;
        }).forEach(function (el) {
            addElementsTo(el);
            parent.addContent(el);
        });
        elements = remainingElements;
    }

    var remainingElements = [],
    // Search for root elements
    rootElements = elements.filter(function (el, index) {
        if (el.parent === undefined) {
            return true;
        }
        remainingElements.push(el);
        return false;
    });
    // Remaining elements with parent
    elements = remainingElements;
    // Add each root element to tree
    // and add other elements to their parent

    rootElements.forEach(function (rootEl) {
        addElementsTo(rootEl);
        tree.push(rootEl);
    });

    return tree;
}

module.exports = buildElementTree;
