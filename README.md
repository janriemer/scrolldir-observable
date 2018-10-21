# scrolldir-observable
[![Build Status](https://travis-ci.org/janriemer/scrolldir-observable.svg?branch=master)](https://travis-ci.org/janriemer/scrolldir-observable)

Get the direction of scrolling - as an [observable](https://github.com/ReactiveX/RxJS) ✨

## Install
```bash
$ npm install scrolldir-observable
```

## Usage
### via `import`
```typescript
import scrollDirObservable from 'scrolldir-observable';

// will react on scroll events that happen on the document
const scrollDir$ = scrollDirObservable(window.document);

scrollDir$.subscribe(dir => {
    console.log(dir); // 'up' or 'down', depending on the scroll direction
});
```

⚠ The observable only emits values on the **first scroll** or **when the scroll direction changes**. So if the user e.g. scrolls down for 2 seconds, the observable will emit the value `down` only **once**.

### via `script` tags
In case you want to use this library via script tags, you can do it like this
```html
 <!DOCTYPE html>
<html>
    <head>
    <script type="module" src="scrolldir-observable/dist/bundles/scrolldir-observable.es.min.js"></script>
    <script nomodule src="scrolldir-observable/dist/bundles/scrolldir-observable.umd.min.js"></script>
    </head>
    ...
</html> 
```
It tries to load the library as an ES module and if that is not supported, it will fall back to an UMD module. Further details can be found in Jake Archibald's great article [ECMAScript modules in browsers](https://jakearchibald.com/2017/es-modules-in-browsers/).

## API
### scrollDirObservable(element: `HTMLElement | Document`, windowElem: `Window` = window): `Observable<Directions>`
element: Some html element or the document on which scroll directions should be observed.

windowElem: The global window object - defaults to `window` - *if you use this library directly in the browser, you need not to care about this parameter*.

### Directions: `'up' | 'down'`
`String`, which describes the direction of the scroll.

## Development
- `npm run build`: compiles library into the dist folder:
    - standalone (used, if consumers want to bundle it themselves):
        - `dist/index.js`
        - `dist/index.es.js`
    - bundles (direct usage via script tags (see [Usage](#via-script-tags))):
        - `dist/bundles/scrolldir-observable.es.min.js`
        - `dist/bundles/scrolldir-observable.umd.min.js`
    - types: `dist/types/index.d.ts`
- `npm test`: executes all tests

## License
MIT