const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const path = require('path');

const { IgnorePlugin } = require('webpack');

const optionalPlugins = [];
if (process.platform !== "darwin") { // don't ignore on OSX
  optionalPlugins.push(new IgnorePlugin({ resourceRegExp: /^fsevents$/ }));
}

var babelOptions = {
  "presets": [
    ["@babel/env", {
      "loose": true,
      "modules": 'commonjs'
    }]
  ]
};

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  target: ['node','es5'],
  // externals: {
  //   fs: 'fs',
  // },
  // ------ ^
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        }
      ]
    }]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    // modules: [path.resolve(__dirname, "node_modules")],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname),
    library: {
      name: 'minecraft-addon-toolchain-json-generate',
      type: 'umd'
    }
  },
  plugins: [
    // new NodePolyfillPlugin({

    // }),
    ...optionalPlugins,
  ],
};
