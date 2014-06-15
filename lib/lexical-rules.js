/**
 * The list of lexical rules
 */
var rules = {
    doctype: /^^\s*-!((?:html|xhtml|xml)(?:1|1.1|2|4|5)?(?:-(?:strict|transitional|frameset|basic|mobile))?)/,
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
