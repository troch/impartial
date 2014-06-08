var rules = require('./lexical-rules');
var ImpartialError = require('./error');

// Will have to be defined in options
var tab_size = 4;

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
                  val: captures.length > 2 ? captures.slice(1) : captures[1]
                };
                str = str.substr(captures[0].length);
                if (type === 'indent')
                    ++line;
                else
                    break;

                lastIndents = token.val.length;
                // console.log(lastIndents, line);
                // var indents = token.val.length; / tab_size;

                // if (indents % 1)
                //     error('invalid indentation; got ' + token.val.length + ' spaces, should be multiple of 2');
                // else if (indents - 1 > lastIndents)
                //     error('invalid indentation; got ' + indents + ', when previous was ' + lastIndents);
                // else if (lastIndents > indents)
                //     while (lastIndents-- > indents)
                //         tokens.push({ type: 'outdent', line: line });
                // else if (lastIndents !== indents)
                //     tokens.push({ type: 'indent', line: line });
                // else
                //     tokens.push({ type: 'newline', line: line });
                // lastIndents = indents;
            }
        }
        if (token) {
            if (token.type !== 'whitespace')
                tokens.push(token);
            token = null;
        } else {
            error('near "' + context(str) + '"');
        }
    }

    return tokens.concat({ type: 'eof' });
}

// Export tokenize function
module.exports = tokenize;
