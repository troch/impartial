// Impartial - Thomas Roch <thomas.c.roch@gmail.com> (MIT Licensed)
var IMP = {},
    tokenize = require('./tokenizer'),
    buildElementTree = require('./parser'),
    compileHtml = require('./compiler'),
    beautify = require('js-beautify').html_beautify;

IMP.render = function (str) {
    // Trim and remove carriage returns
    var tokens = tokenize(str);
    // console.log(tokens);
    var elements = buildElementTree(tokens);
    // Compile elements tree to HTML
    return compileHtml(elements);
};

IMP.renderFile = function(filename, encoding) {
    // var fs = require('fs');
    // options = options || {}
    // options.filename = options.filename || filename
    // options.cache = options.hasOwnProperty('cache') ? options.cache : true
    var fs = require('fs');
    fs.readFile(filename, encoding, function(err, str) {
        if (!err) {
            var outputFileName = filename.replace('.imp', '.html');
            var html = IMP.render(str);
            fs.writeFile(outputFileName, beautify(html));
        }
    });
};

module.exports = IMP;
