import 'mocha';
import {expect} from 'chai';
import * as pupp from 'puppeteer';
import {scrollDirObservable} from './index';

describe('Testing scrollDir-observable', () => {

  it(`should have a scroll direction of 'down'` , (done) => {
    
    function assertFn() {
      const obs$ = scrollDirObservable(window.document, window);
      obs$.subscribe(val => {
        expect(val).to.eql('down');
      });
    }

    function scroll() {
      window.scrollTo(0, 20);
    }
    
    (async () => {
      const browser = await pupp.launch();
      const page = await browser.newPage();
      await page.goto('http://localhost:8080');
      await page.evaluate(assertFn); // TODO: this thing causes problems for us!
      await page.evaluate(scroll);
      await browser.close();
      done();
    })();

    

  });

});