/**
 * The list of lexical rules
 */
var rules = {
    doctype: /^^\s*-!((?:html|xhtml|xml)(?:1|1.1|2|4|5)?(?:-(?:strict|transitional|frameset|basic|mobile))?)/,
    garbage: /^\n+[ \t]+?(?=\n)/,
    indent: /^\n+(\s*)/,
    // condCom: /^\[if (.*?)\]([\s\S]*?)\[endif\]/,
    comment: /^\/\*([\s\S]*?)\*\//,
    commentInline: /^\/\/(.*)/,
    class: /^\.([\w\-\.]+)/,
    id: /^\#([\w\-]+)/,
    attrMultiLine: /^\-\-([-a-zA-Z0-9:+]+)[ \t]*"""([\s\S]*?)"""*/,
    attrEmpty: /^\-\-([-a-zA-Z0-9:+]+)(?=\s\-\-)/,
    attr: /^\-\-([-a-zA-Z0-9:+]+) ((?:(?!\s\-\-).)+)/,
    attrEmpty2: /^\-\-([-a-zA-Z0-9:+]+)/,
    element: /^\-([-a-zA-Z0-9:]+)/,
    script: /^"""([\s\S]*?)"""/,
    whitespace: /^\s+/,
    text: /^([^\n]*)/
};

// Export rules
module.exports = rules;
