/**
 * The list of lexical rules
 */
var rules = {
    indent: /^\n(\s*)/,
    class: /^\.([\w\-\.]+)/,
    id: /^\#([\w\-]+)/,
    attrEmpty: /^\-\-([-a-zA-Z0-9:+]+)(?=\s\-\-)/,
    attr: /^\-\-([-a-zA-Z0-9:+]+) ((?:(?!\s\-\-).)+)/,
    attrEmpty2: /^\-\-([-a-zA-Z0-9:+]+)/,
    element: /^\-([-a-zA-Z0-9:]+)/,
    whitespace: /^\s+/,
    text: /^([^\n]*)/
};

// Export rules
module.exports = rules;
