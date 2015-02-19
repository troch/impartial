// List of self-closing tags
var isSelfClosingTag = require('./self-closing-tags');

/**
 * The Document class containing the doctype and
 * an element tree
 */
function Document (doctype) {
    this.doctype = doctype;
    this.tree = [];

    this.setDoctype = function (doctype) {
        // if (doctype === undefined) {
            this.doctype = doctype;
        // }
    };
}

/**
 * The Attribute class used to model HTML attributes
 * @param {Object} token The token
 */
function Attribute (token) {
    if (token.type.indexOf('attr') === 0) {
        this.name = token.val[0];
        if (token.type === 'attrMultiLine')
            this.value = token.val[token.val.length - 1]
                .trim()
                .split('\n')
                .map(function (line) {
                    return line.trim();
                })
                .join(' ');
        else
            this.value = token.val[token.val.length - 1];
    }
    if (token.type === 'id') {
        this.name = 'id';
        this.value = token.val[0];
    }
    if (token.type === 'class') {
        this.name = 'class';
        this.value = token.val[0].replace(/\./g, ' ');
    }
}

function Comment(token, parent) {
    this.parent = parent;
    this.content = token.val[0];
}

/**
 * The Element class used to model HTML elements
 * @param {Object} token  The token
 * @param {Object} parent The parent element
 */
function Element (token, parent) {
    this.name = token.type === 'element' ? token.val[0] : token.type === 'script' ? 'script' : undefined;
    this.attrs = [];
    this.content = token.type === 'element' ? [] : token.val[0];
    this.position = {
        line: token.line,
        identation: token.identation
    };
    this.parent = parent;

    /**
     * Add attrbiute to element
     * @param {Object} attr The attribute to add
     */
    this.addAttr = function (attr) {
        this.attrs.push(attr);
    };

    /**
     * Add content to element
     * @param {Object|String} content The content to add
     */
    this.addContent = function (content) {
        // Delete parent property
        delete content.parent;
        this.content.push(content);
    };
}

/**
 * Build the document tree of element
 * @param  {Array} tokens The list of tokens from the tokenizer
 * @return {Array}        The tree
 */
function buildElementTree (tokens) {
    var parents = [],
        elements = [],
        tree = [],
        currentElement,
        currentParent,
        prevToken,
        token,
        i,
        htmlDocument =  new Document();

    /**
     * Get a token's parent
     * @param  {Object} token The token
     * @return {Object}       The parent
     */
    function getParent(token) {
        if (parents.length === 0) {
            return undefined;
        }
        for (var i = parents.length - 1; i >= 0; i--) {
            if (parents[i].position.identation < token.identation || parents[i].position.line === token.line) {
                return [i, parents[i]];
            }
        }
        return undefined;
    }

    // Build a list of elements, in the order they appear in the
    // markup document and set their parent property
    for (i in tokens) {
        token = tokens[i];

        if (token.type === 'doctype') {
            htmlDocument.setDoctype(token.val);
        } else if (token.type.indexOf('attr') === 0 || token.type === 'class' || token.type === 'id') {
            // Add attribute to current element
            currentElement.addAttr(new Attribute(token));
        } else {
            // Add currentElement to list of elements
            if (currentElement) {
                elements.push(currentElement);
                // currentElement = undefined;
            }
            // Look for parent
            currentParent = getParent(token);
            if (token.type === 'element' || token.type === 'text' || token.type === 'script') {
                currentElement = new Element(token, currentParent !== undefined ? currentParent[1] : undefined);
                if (token.type !== 'script') {
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
                }
            } else if (token.type === 'comment') {
                console.log(elements);
                currentElement = new Comment(token, currentParent !== undefined ? currentParent[1] : undefined);
            }
        }
    }
    console.log(elements);
    elements.push(currentElement);

    /**
     * Recursive function to add an element to its parent
     * @param {Object} parent The parent
     */
    function addElementsTo(parent) {
        remainingElements = [];
        elements.filter(function (el) {
            if (el.parent === parent) {
                return true;
            }
            remainingElements.push(el);
            return false;
        }).forEach(function (el) {
            // If no attrs, this is a comment,
            // no need to add elements
            if (el.attrs !== undefined) {
                addElementsTo(el);
            }
            parent.addContent(el);
        });
        elements = remainingElements;
    }

    // List of remaining elements to add to the tree
    var remainingElements = [],

    // Search for root elements (element whithout a parent)
    rootElements = elements.filter(function (el, index) {
        if (el.parent === undefined) {
            return true;
        }
        // Add elements with a parent to the list of remaining
        // elements
        remainingElements.push(el);
        return false;
    });

    // Remaining elements with parent
    elements = remainingElements;

    // Add each root element to tree
    // and add other elements to their parent
    rootElements.forEach(function (rootEl) {
        // Start recursivity
        addElementsTo(rootEl);
        // Add root element to the tree
        tree.push(rootEl);
    });

    htmlDocument.tree = tree;

    return htmlDocument;
}

// Export tree building function
module.exports = buildElementTree;
