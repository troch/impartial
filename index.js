var IMP = require('./lib/impartial');

var args = process.argv.slice(2);
if (args[0]) {
    IMP.renderFile(args[0]);
}
