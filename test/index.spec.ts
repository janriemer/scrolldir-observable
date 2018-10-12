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

  it(`should only emit once, when scroll direction doesn't change`, fakeSchedulers(() => {
    let scrollDirActualList: Directions[] = [];

    const [scrollDirObservable$, windowMock] = initScrollDirObservableAndWindowMock();

    scrollDirObservable$.subscribe(val => {
      scrollDirActualList.push(val);
    });

    windowMock.scrollTo(0, 1);
    clock.tick(50);
    windowMock.scrollTo(0, 2);

    expect(scrollDirActualList).to.have.lengthOf(1);
  }));

  it(`should have a scroll direction of 'down', when scrolled by 1 on y-axis and 'up', when scrolled by -1 with throttle time in between` ,
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

  it(`should have a scroll direction of 'down', when scrolled by more than 1 on y-axis` ,
    fakeSchedulers(() => {

    let scrollDirActual: Directions | undefined;

    const [scrollDirObservable$, windowMock] = initScrollDirObservableAndWindowMock();

    scrollDirObservable$.subscribe(val => {
      scrollDirActual = val;
    });

    windowMock.scrollTo(0, 111);
    expect(scrollDirActual).to.eql('down');
  }));

  it(`should have a scroll direction of 'up', when scrolled by more than -1 on y-axis` ,
    fakeSchedulers(() => {

    let scrollDirActual: Directions | undefined;

    const [scrollDirObservable$, windowMock] = initScrollDirObservableAndWindowMock(500);

    scrollDirObservable$.subscribe(val => {
      scrollDirActual = val;
    });

    windowMock.scrollTo(0, 333);
    expect(scrollDirActual).to.eql('up');
  }));

  it(`should not change scroll direction, when throttle time has not elapsed yet` ,
    fakeSchedulers(() => {

    let scrollDirActual: Directions | undefined;

    const [scrollDirObservable$, windowMock] = initScrollDirObservableAndWindowMock();

    scrollDirObservable$.subscribe(val => {
      scrollDirActual = val;
    });

    windowMock.scrollTo(0, 2);
    expect(scrollDirActual).to.eql('down');

    clock.tick(49);
    windowMock.scrollTo(0, 1);
    expect(scrollDirActual).to.eql('down');

    clock.tick(1);
    // now our throttle time has elapsed
    windowMock.scrollTo(0, 0);
    expect(scrollDirActual).to.eql('up');
  }));

  it(`should not change scroll direction, when throttle time has elapsed and we scroll in the same direction, even when we scroll wildly during throttle time` ,
    fakeSchedulers(() => {

    let scrollDirActual: Directions | undefined;

    const [scrollDirObservable$, windowMock] = initScrollDirObservableAndWindowMock(100);

    scrollDirObservable$.subscribe(val => {
      scrollDirActual = val;
    });

    windowMock.scrollTo(0, 101);
    expect(scrollDirActual).to.eql('down');

    clock.tick(49);
    scrollWildly(windowMock);
    expect(scrollDirActual).to.eql('down');

    clock.tick(1);
    // now our throttle time has elapsed and we still scroll down
    windowMock.scrollTo(0, 102);
    expect(scrollDirActual).to.eql('down');
  }));

  it(`should change scroll direction, when throttle time has elapsed and we scroll in the opposite direction, even when we scroll wildly during throttle time` ,
    fakeSchedulers(() => {

    let scrollDirActual: Directions | undefined;

    const [scrollDirObservable$, windowMock] = initScrollDirObservableAndWindowMock(100);

    scrollDirObservable$.subscribe(val => {
      scrollDirActual = val;
    });

    windowMock.scrollTo(0, 101);
    expect(scrollDirActual).to.eql('down');

    clock.tick(49);
    scrollWildly(windowMock);
    expect(scrollDirActual).to.eql('down');

    clock.tick(1);
    // now our throttle time has elapsed and we scroll up
    windowMock.scrollTo(0, 100);
    expect(scrollDirActual).to.eql('up');
  }));

});

function scrollWildly(windowMock: WindowMock) {
  windowMock.scrollTo(0, 91);
  windowMock.scrollTo(0, 60);
  windowMock.scrollTo(0, 82);
  windowMock.scrollTo(0, 111);
  windowMock.scrollTo(0, 90);
  windowMock.scrollTo(0, 133);
}

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