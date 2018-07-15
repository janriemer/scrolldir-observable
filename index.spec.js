"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var jsdom_1 = require("jsdom");
var index_1 = require("./index");
describe('Testing scrollDir-observable', function () {
    it("should have a scroll direction of 'down'", function (done) {
        var dom = new jsdom_1.JSDOM("<!DOCTYPE html>\n    <html>\n      <body>\n      \n      </body>\n    </html>");
        var obs$ = index_1.scrollDirObservable(dom.window.document, dom.window);
        obs$.subscribe(function (val) {
            chai_1.expect(val).to.eql('Hello');
            done();
        });
        var simEvent = new dom.window.Event('scroll');
        dom.window.document.dispatchEvent(simEvent);
    });
});
//# sourceMappingURL=index.spec.js.map