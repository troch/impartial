// test/main.js
var should = require('should');
var IMP = require('../lib/impartial');

describe('Render', function() {
    describe('a simple string', function() {
        it('returns an HTML string', function() {
            var result = IMP.render();
            result.should.eql(true);
        });
    });
});
