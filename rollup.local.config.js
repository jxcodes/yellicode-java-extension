export default {
  input: 'F:\\DevSpace/MINAM/cites-peru/cg-cites-peru/node_modules/yellicode-java-extension/dist/es6/java.js', // rollup requires ES input
  output: {
    format: 'umd',
    name: 'yellicode-java-extension',
    file: 'F:\\DevSpace/MINAM/cites-peru/cg-cites-peru/node_modules/yellicode-java-extension/dist/bundles/java.umd.js'
  },
  external: ['@yellicode/core', '@yellicode/elements'] // https://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependency
}
