// Impartial - Thomas Roch <thomas.c.roch@gmail.com> (MIT Licensed)
var IMP = {},
    tokenize = require('./tokenizer'),
    generator = require('./generator');

IMP.render = function (str) {
    // Trim and remove carriage returns
    var tokens = tokenize(str);
    // console.log(tokens);
    console.log(tokens);
    console.log(generator.buildElementTree(tokens));
};

IMP.renderFile = function(filename, encoding) {
    // var fs = require('fs');
    // options = options || {}
    // options.filename = options.filename || filename
    // options.cache = options.hasOwnProperty('cache') ? options.cache : true
    var fs = require('fs');
    fs.readFile(filename, encoding, function(err, str) {
        if (!err) {
            IMP.render(str);
        }
    });
};

module.exports = IMP;
