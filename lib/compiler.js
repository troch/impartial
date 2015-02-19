// List of self-closing tags
var isSelfClosingTag = require('./self-closing-tags'),
    doctypes = require('./doctypes');

/**
 * Open an HTML tag
 * @param  {Object} el The element object
 * @return {String}    The opening tag
 */
function openTag(el) {
    var tag = '<' + el.name;
    // add attributes
    el.attrs.forEach(function (attr) {
        tag += ' ' + attr.name + '="' + attr.value + '"';
    });
    return tag += isSelfClosingTag(el.name) ? '/>' : '>';
}

/**
 * Close an HTML tag
 * @param  {Object} el The element object
 * @return {String}    The closing tag
 */
function closeTag(el) {
    return '</' + el.name + '>';
}

/**
 * Compile an HTML document
 * @param  {Array} htmlDocument The object containing the element tree
 * @return {String}             The HTML document
 */
function compileHTML(htmlDocument) {
    var html = '';

    if (htmlDocument.doctype && doctypes[htmlDocument.doctype])
        html += doctypes[htmlDocument.doctype] + "\n";


    /**
     * Recursive function which renders an element
     * and its children
     * @param  {Object} el An element
     */
    function compileElement(el) {
        if (el.name === undefined) {
            if (el.attrs === undefined) {
                html += '<!--' + el.content + '-->\n';
            } else {
                html += el.content + '\n';
            }
        } else {
            html += openTag(el) + '\n';
            if (!isSelfClosingTag(el.name)) {
                if (el.name === 'script') {
                    html += el.content;
                } else {
                    el.content.forEach(function (child) {
                        compileElement(child);
                    });
                }
                html += closeTag(el) + '\n';
            }
        }
    }

    // Initiate recursivity with top level elements
    htmlDocument.tree.forEach(function (el) {
        compileElement(el);
    });

    return html;
}

// Export the compileHTML function
module.exports = compileHTML;
