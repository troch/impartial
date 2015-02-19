/**
 * @module  impartial
 * @author  Thomas Roch <thomas.c.roch@gmail.com>
 * @license [https://github.com/troch/impartial/blob/master/LICENSE.md] MIT
 */
var IMP = {},
    tokenize = require('./tokenizer'),
    buildElementTree = require('./parser'),
    compileHtml = require('./compiler'),
    beautify = require('js-beautify').html_beautify;

/**
 * Render an impartial string into an HTML string
 * @param  {String} str The impartial string to render
 * @return {String}     The HTML result
 */
IMP.render = function (str) {
    // Trim and remove carriage returns
    var tokens = tokenize(str),
        // console.log(tokens);
        htmlDocumnent = buildElementTree(tokens);
        // Compile elements tree to HTML
    console.log(compileHtml(htmlDocumnent));
    return compileHtml(htmlDocumnent);
};

/**
 * Render an impartial file into an HTML file
 * @param  {String} filename The file to render
 * @param  {String} encoding The file encoding
 */
IMP.renderFile = function(filename, encoding) {
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
