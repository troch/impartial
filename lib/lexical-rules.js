/**
 * The list of lexical rules
 */
var rules = {
    indent: /^\n(\s*)/,
    class: /^\.([\w\-\.]+)/,
    id: /^\#([\w\-]+)/,
    emptyAttr: /^\-\-([-a-zA-Z0-9:]+)(?=\s\-\-)/,
    // attr: /^\-\-([-a-zA-Z0-9:]+) ([^\n].+)(?=\s\-\-)/,
    attr: /^\-\-([-a-zA-Z0-9:]+) ((?:(?!\s\-\-).)+)/,
    emptyAttr2: /^\-\-([-a-zA-Z0-9:]+)/,
    element: /^\-([-a-zA-Z0-9:]*)/,
    whitespace: /^\s+/,
    text: /^([^\n]*)/
};

// Export rules
module.exports = rules;
