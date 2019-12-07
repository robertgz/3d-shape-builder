import commonjs from 'rollup-plugin-commonjs' 
import VuePlugin from 'rollup-plugin-vue';
// "rollup-plugin-vue": "5.1.1", works but 5.1.2+ does not as of 11/30/2019

import alias from '@rollup/plugin-alias';

let threeRoot = 'https://unpkg.com/three@0.111.0';

export default [{
  input: './src/main.js',
  output: [{
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    commonjs(),
    alias({ 
      entries: [
        { 
          find: /^three$/, 
          replacement: threeRoot + '/build/three.module.js'
        },
        { 
          find:/(^three)(\/examples)(.*)/, 
          replacement: threeRoot + '$2$3.js'
        },
          { 
          find: /^vue$/, 
          replacement: 'https://unpkg.com/vue@2.6.10/dist/vue.esm.browser.js'
        },        
      ]
    }),    
    VuePlugin(),
  ],
  external: [
    'https://unpkg.com/three@0.111.0/build/three.module.js',
    'https://unpkg.com/three@0.111.0/examples/jsm/libs/stats.module.js',
    'https://unpkg.com/three@0.111.0/examples/jsm/controls/OrbitControls.js',
    'https://unpkg.com/vue@2.6.10/dist/vue.esm.browser.js'
  ]
}];