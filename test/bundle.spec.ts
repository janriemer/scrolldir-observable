import 'mocha';
import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import {join} from 'path';
import {readFileSync} from 'fs';
import { rollup } from 'rollup';
//import {pkgName, libraryName} from '../rollup.common.config';

describe('Smoke-testing the generated bundle...', () => {

    const bundlePath = join(__dirname, '..', 'dist', 'bundles');
    
    it ('should expose a function within the umd module', () => {
        const script = loadScript(`scrolldir-observable.umd.min.js`);
        const html = `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        <body>
            <script>
                ${script}
            </script>
            <script>
                document.body.innerText = typeof window.scrollDirObservable;
            </script>
        </body>
        </html>`;
        const jsdom = new JSDOM(html, {runScripts: 'dangerously', resources: 'usable'});

        expect(jsdom.window.document.body.innerText).to.eql('function');
    });

    it ('should transform the es module into a functioning umd module', async () => {
        const scriptPath = join(bundlePath, `scrolldir-observable.es.min.js`);

        const bundle = await rollup({
            input: scriptPath
        });

        const {code} = await bundle.generate({
            format: 'umd',
            name: 'scrollDirObservable'
        });

        const html = `<html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
        </head>
        <body>
            <script>
                ${code}
            </script>
            <script>
                document.body.innerText = typeof window.scrollDirObservable;
            </script>
        </body>
        </html>`;
        const jsdom = new JSDOM(html, {runScripts: 'dangerously', resources: 'usable'});

        expect(jsdom.window.document.body.innerText).to.eql('function');
    });


    function loadScript(jsFile: string): string {
        return readFileSync(
            join(bundlePath, jsFile), {encoding: 'utf8'});
    }
});