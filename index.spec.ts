import 'mocha';
import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import {scrollDirObservable, Directions} from './index';

describe('Testing scrollDir-observable', () => {

  it(`should have a scroll direction of 'down'` , (done) => {
    const dom = new JSDOM(`<!DOCTYPE html>
    <html>
      <body>
      
      </body>
    </html>`)
    
    const obs$ = scrollDirObservable(dom.window.document, dom.window);

    obs$.subscribe(val => {
      expect(val).to.eql('down');
      done();
    })

    const simEvent = new dom.window.Event('scroll');

    dom.window.document.dispatchEvent(simEvent);
  });

});