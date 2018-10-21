import {pkgName, libraryName, config}  from './rollup.common.config';
import {terser} from 'rollup-plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

let localConfig = config;

// Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs).
// Allow node_modules resolution, so you can use 'external' to control
// which external modules to include in the bundle
// https://github.com/rollup/rollup-plugin-node-resolve#usage
localConfig.plugins.push(terser(), commonjs(), resolve());

// we have multiple configs instead of multiple outputs to prevent a bug in rollup-plugin-terser:
// https://github.com/TrySound/rollup-plugin-terser/issues/5
export default [
    {
        ...localConfig,
        output: [
            { file: `dist/bundles/${pkgName}.umd.min.js`, name: libraryName, format: 'umd', sourcemap: false },
        ],
    },
    {
        ...localConfig,
        output: [
            { file: `dist/bundles/${pkgName}.es.min.js`, format: 'es', sourcemap: false },
        ]
    }
]
