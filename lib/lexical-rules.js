/**
 * Lexer rules.
 */
var rules = {
    indent: /^\n(\s*)/,
    class: /^\.([\w\-\.]+)/,
    id: /^\#([\w\-]+)/,
    emptyAttr: /^\-\-([-a-zA-Z0-9:]+) \-\-/,
    attr: /^\-\-([-a-zA-Z0-9:]+) ((?:(?! \-\-).)+)/,
    emptyAttr2: /^\-\-([-a-zA-Z0-9:]+)/,
    element: /^\-([-a-zA-Z0-9:]*)/,
    whitespace: /^\s+/,
    text: /^([^\n]*)/
};

module.exports = rules;
