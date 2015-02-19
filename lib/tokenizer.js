var rules = require('./lexical-rules'),
    ImpartialError = require('./error'),
    extend = require('util')._extend;

/**
 * Tokenize an impartial string according to lexical grammar
 * @param  {String} str The string to render
 * @return {Array}      A list of tokens
 */
function tokenize(str) {
    var captures,
        token,
        tokens = [],
        line = 1,
        lastIndents = 0;

    str = String(str).trim().replace(/\r\n|\r|\n *\n/g, '\n');

    function error(msg){
        throw new ImpartialError('(Impartial):' + line + ' ' + msg);
    }

    while (str.length) {
        for (var type in rules) {
            captures = rules[type].exec(str);
            if (captures) {
                token = {
                  type: type,
                  line: line,
                  identation: lastIndents,
                  match: captures[0],
                  val: captures.slice(1)
                };
                str = str.substr(captures[0].length);
                if (type === 'indent')
                    ++line;
                else
                    break;

                lastIndents = token.val[0].length;
            }
        }
        if (token) {
            // If attribute, check if multiple attributes
            // separated by "+" sign
            if (token.type.indexOf('attr') === 0 && token.val[0].indexOf('+') !== -1) {
                token.val[0].split('+').forEach(function (attr) {
                    var t = extend(token);
                    t.val[0] = attr;
                    tokens.push(t);
                });
            } else if (token.type !== 'whitespace' && token.type !== 'garbage') {
                tokens.push(token);
            }
            token = null;
        } else {
            error('near "' + context(str) + '"');
        }
    }

    return tokens.concat({ type: 'eof' });
}

// Export tokenize function
module.exports = tokenize;
