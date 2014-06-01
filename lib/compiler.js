function openTag(el) {
    var tag = '<' + el.name;
    // add attributes
    el.attrs.forEach(function (attr) {
        tag += ' ' + attr.name + '="' + attr.value + '"';
    });
    return tag += '>';
}

function closeTag(el) {
    return '</' + el.name + '>';
}


function compileHTML(tree) {
    var html = '';

    function compileElement(el) {
        if (typeof el === "string") {
            html += el + '\n';
        } else {
            html += openTag(el) + '\n';
            el.content.forEach(function (child) {
                compileElement(child);
            })
            html += closeTag(el) + '\n';
        }
    }

    tree.forEach(function (el) {
        compileElement(el);
    });

    return html;
}

module.exports = compileHTML;
