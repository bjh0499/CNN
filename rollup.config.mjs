// https://stackoverflow.com/questions/50322611/use-es-modules-from-content-scripts-of-web-extension-add-on
// https://github.com/rollup/rollup/issues/703
// https://rollupjs.org/tutorial/

export default [
  {
    input: "options/options.js",
    output: {
      file: "options/bundle_options.js",
    },
  },
  {
    input: "cnn/cnn.js",
    output: {
      file: "cnn/bundle_cnn.js",
    },
  },
];
