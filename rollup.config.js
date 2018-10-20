const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const { eslint } = require('rollup-plugin-eslint');
const replace = require('rollup-plugin-replace');
const { uglify } = require('rollup-plugin-uglify');
const { version } = require('./package.json');
const isProd = process.env.NODE_ENV === 'production';

export default {
  input: 'src/index.js',
  output: {
    name: 'srt',
    file: isProd ? 'dist/srt.js' : 'docs/js/srt.js',
    format: 'umd'
  },
  plugins: [
    eslint({
      exclude: [
        'node_modules/**',
        'docs/**'
      ]
    }),
    nodeResolve(),
    commonjs(),
    babel({
      runtimeHelpers: true,
      exclude: 'node_modules/**',
      plugins: ['@babel/external-helpers', '@babel/transform-runtime']
    }),
    replace({
      exclude: 'node_modules/**',
      __ENV__: JSON.stringify(process.env.NODE_ENV || 'development'),
      __VERSION__: version
    }),
    isProd && uglify()
  ]
};
