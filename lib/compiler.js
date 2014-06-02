var isSelfClosingTag = require('./self-closing-tags');

function openTag(el) {
    var tag = '<' + el.name;
    // add attributes
    el.attrs.forEach(function (attr) {
        tag += ' ' + attr.name + '="' + attr.value + '"';
    });
    return tag += isSelfClosingTag(el.name) ? '/>' : '>';
}

function closeTag(el) {
    return '</' + el.name + '>';
}


function compileHTML(tree) {
    var html = '';

    function compileElement(el) {
        if (el.name === null) {
            html += el.content + '\n';
        } else {
            html += openTag(el) + '\n';
            if (!isSelfClosingTag(el.name)) {
                el.content.forEach(function (child) {
                    compileElement(child);
                })
                html += closeTag(el) + '\n';
            }
        }
    }

    tree.forEach(function (el) {
        compileElement(el);
    });

    return html;
}

module.exports = compileHTML;
