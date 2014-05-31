/**
 * Lexer rules.
 */
var rules = {
    indent: /^\n( *)(?! *-#)/,
    class: /^\.([\w\-\.]+)/,
    id: /^\#([\w\-]+)/,
    attr: /^\-\-([-a-zA-Z0-9:]+) ((?:(?!\s\-\-|\-\-|\n).)+)/,
    emptyAttr: /^\-\-([-a-zA-Z0-9:]+)/,
    element: /^\-([-a-zA-Z0-9:]*)/,
    whitespace: /\s+/,
    // text: /((?:(?!\|\-|\n).)+)/
    text: /^([^\n]+)/
};

module.exports = rules;
