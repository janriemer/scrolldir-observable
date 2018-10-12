import 'mocha';
import {expect} from 'chai';
import { fakeSchedulers } from 'rxjs-marbles/mocha';
import scrollDirObservable, { Directions } from '../src';
import WindowMock from './window-mock';
import {JSDOM} from 'jsdom';
import {useFakeTimers, SinonFakeTimers} from 'sinon';

describe('Testing scrollDir-observable...', () => {

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

    const dom = new JSDOM(`<!DOCTYPE html>`);

    const scrollEvent = new dom.window.Event('scroll');

    let windowMock = new WindowMock(scrollEvent, dom.window.document);
    let scrollDirObservable$ = scrollDirObservable(
      windowMock.getDocument(), windowMock.getWindowMock()
    );

    scrollDirObservable$.subscribe(val => {
      scrollDirActual = val;
    });

    clock.tick(49);
    expect(scrollDirActual).to.be.undefined;
    clock.tick(1);
    expect(scrollDirActual).to.eql('down');

    windowMock.scrollTo(0, 1);
  }));

});