'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = 'production';

const basePlugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin('globals'),
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    __dirname
  ),
];

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  })
];

const plugins = basePlugins
  .concat((process.env.NODE_ENV === PRODUCTION) ? prodPlugins: []);

module.exports = {
  entry: {
    globals: [
      'zone.js',
      'reflect-metadata'
    ],
    app: './src/main.ts',
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].[hash].js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'tslint', exclude: /node_modules/, enforce: 'pre' },
      { test: /\.ts$/, loader: 'awesome-typescript', exclude: /node_modules/ },
      { test: /\.json$/, loader: 'json' },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loaders: ['css-to-string', 'css'] }
    ]
  },
  plugins: plugins,
  devServer: {
    noInfo: true,
    historyApiFallback: true
  }  
};