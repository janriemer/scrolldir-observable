"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
function scrollDirObservable(element, windowElem) {
    if (windowElem === void 0) { windowElem = window; }
    var scrollOffset$ = rxjs_1.fromEvent(element, 'scroll')
        .pipe(operators_1.map(function (_) { return "Hello"; }));
    return scrollOffset$;
    // .pipe(
    //     //throttleTime(50),
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
exports.scrollDirObservable = scrollDirObservable;
//# sourceMappingURL=index.js.map