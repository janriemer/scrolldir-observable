import { fromEvent, Observable } from 'rxjs';
import { map, throttleTime, pairwise, distinctUntilChanged } from 'rxjs/operators';

export type Directions = 'up' | 'down';

export function scrollDirObservable(element: HTMLElement | Document, windowElem: Window = window) {

    let scrollOffset$ = fromEvent(element, 'scroll')
        .pipe(map(ev => 'Hello'));
    return scrollOffset$;
    // .pipe(
    //     throttleTime(50),
    //     map(ev => windowElem.pageYOffset)
    // );

    // let scrollDiffs$ = scrollOffset$
    // .pipe(
    //     pairwise<number>(),
    //     map(pair => pair[1] - pair[0])
    // );

    // return scrollDiffs$
    //     .pipe(
    //       map(diff => diff >= 0 ? 'down' : 'up'),
    //       distinctUntilChanged()
    //     ) as Observable<Directions>;
}