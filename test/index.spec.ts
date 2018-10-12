import 'mocha';
import {expect} from 'chai';
import { fakeSchedulers } from 'rxjs-marbles/mocha';
import scrollDirObservable, { Directions } from '../src';
import WindowMock from './window-mock';
import {JSDOM} from 'jsdom';
import {useFakeTimers, SinonFakeTimers} from 'sinon';
import { Observable } from 'rxjs';

describe('Testing scrollDir-observable...', () => {

  // we are using fake timers, so we can test async code synchronously
  // and advance throttle time
  let clock: SinonFakeTimers;

  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  it(`should have a scroll direction of 'down', when scrolled by 1 on y-axis` ,
    fakeSchedulers(() => {

    let scrollDirActual: Directions | undefined;

    const [scrollDirObservable$, windowMock] = initScrollDirObservableAndWindowMock();

    scrollDirObservable$.subscribe(val => {
      scrollDirActual = val;
    });

    windowMock.scrollTo(0, 1);
    expect(scrollDirActual).to.eql('down');

    clock.tick(50);
    windowMock.scrollTo(0, 0);

    expect(scrollDirActual).to.eql('up');
  }));

  it(`should have a scroll direction of 'up', when scrolled by -1 on y-axis`,
    fakeSchedulers(() => {
      // we start from y offset = 1, so that we can scroll up
      const [scrollDirObservable$, windowMock] = initScrollDirObservableAndWindowMock(1);

      let scrollDirActual: Directions | undefined;

      scrollDirObservable$.subscribe(val => {
        scrollDirActual = val;
      });

      expect(scrollDirActual).to.be.undefined;

      // we scroll up now
      windowMock.scrollTo(0, 0);

      expect(scrollDirActual).to.eql('up');
  }));

});

function initScrollDirObservableAndWindowMock(yScrollOffset: number = 0): [Observable<Directions>, WindowMock] {
  const dom = new JSDOM(`<!DOCTYPE html>`);

  const scrollEvent = new dom.window.Event('scroll');

  let windowMock = new WindowMock(scrollEvent, dom.window.document);
  windowMock.scrollTo(0, yScrollOffset);
  let scrollDirObservable$ = scrollDirObservable(
    windowMock.getDocument(), windowMock.getWindowMock()
  );

  return [scrollDirObservable$, windowMock];
}