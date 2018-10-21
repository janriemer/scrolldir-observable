import {config, libraryName} from './rollup.common.config';

const pkg = require('./package.json');

export default [
  {
    ...config,
    output: [
      { file: pkg.main, name: libraryName, format: 'cjs', sourcemap: false },
      { file: pkg.module, format: 'es', sourcemap: false },
    ],
    // leave it up to the consumer to bundle deps
    external: ['rxjs', 'rxjs/operators']
  }
]
