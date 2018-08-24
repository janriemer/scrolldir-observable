import 'mocha';
import {expect} from 'chai';
import scrollDirObservable from '../src';
import WindowMock from './window-mock';
import {JSDOM} from 'jsdom';

describe('Testing scrollDir-observable...', () => {

  beforeEach(() => {

  });

  it(`should have a scroll direction of 'down', when scrolled by 1 on y-axis` , (done) => {

    const dom = new JSDOM(`<!DOCTYPE html>`);

    const scrollEvent = new dom.window.Event('scroll');

    let windowMock = new WindowMock(scrollEvent, dom.window.document);
    let scrollDirObservable$ = scrollDirObservable(
      windowMock.getDocument(), windowMock.getWindowMock()
    );

    scrollDirObservable$.subscribe(val => {
      expect(val).to.eql('down');
      done();
    });

    windowMock.scrollTo(0, 1);
  });

});