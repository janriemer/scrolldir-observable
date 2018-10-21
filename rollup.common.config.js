import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'

const pkg = require('./package.json')
export const pkgName = pkg.name;

export const libraryName = 'scrollDirObservable'

export const config = 
  {
    input: `src/index.ts`,
    watch: {
      include: 'src/**',
    },
    plugins: [
      // Allow json resolution
      json(),
      // Compile TypeScript files
      typescript({ useTsconfigDeclarationDir: true }),
    ],
  };
