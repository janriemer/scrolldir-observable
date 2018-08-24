import 'mocha';
import {expect} from 'chai';
import scrollDirObservable from '../src';
import WindowMock from './window-mock';

describe('Testing scrollDir-observable', () => {

  it(`should have a scroll direction of 'down'` , (done) => {

    let windowMock = new WindowMock();
    let scrollDirObservable$ = scrollDirObservable(
      windowMock.getWindowMock().document, windowMock.getWindowMock()
    );

    scrollDirObservable$.subscribe(val => {
      expect(val).to.eql('down');
      done();
    });

    windowMock.scrollTo(1, 1);
  });

});