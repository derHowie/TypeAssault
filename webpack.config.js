var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackConfig = new HtmlWebpackPlugin({
  template: __dirname + '/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  devServer: {
    inline: true,
    port: 3333
  },
  module: {
    loaders: [
            {
              test: /\.jsx?$/,
              loader: ['babel'],
              exclude: /node_modules/,
              query: {
                presets: ['es2015', 'react']
              }
            },
            {
              test: /\.scss$/,
              loaders: ['style', 'css', 'sass']
            }
    ]
  },
  plugins: [HtmlWebpackConfig]
}
