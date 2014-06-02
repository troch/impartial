var selfClosingTags = [
    'area',
    'base',
    'br',
    'col',
    'command',
    'embed',
    'hr',
    'img',
    'input',
    'keygen',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr'
];

function isSelfClosingTag(tagName) {
    if (!tagName) {
        return false;
    }
    return selfClosingTags.indexOf(tagName.toLowerCase()) !== -1;
}

module.exports = isSelfClosingTag;
