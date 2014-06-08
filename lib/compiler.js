// List of self-closing tags
var isSelfClosingTag = require('./self-closing-tags');

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
 * @param  {Array} tree The elements tree
 * @return {String}     The HTML document
 */
function compileHTML(tree) {
    var html = '';

    /**
     * Recursive function which renders an element
     * and its children
     * @param  {Object} el An element
     */
    function compileElement(el) {
        if (el.name === null) {
            html += el.content + '\n';
        } else {
            html += openTag(el) + '\n';
            if (!isSelfClosingTag(el.name)) {
                el.content.forEach(function (child) {
                    compileElement(child);
                });
                html += closeTag(el) + '\n';
            }
        }
    }

    // Initiate recursivity with top level elements
    tree.forEach(function (el) {
        compileElement(el);
    });

    return html;
}

// Export the compileHTML function
module.exports = compileHTML;
