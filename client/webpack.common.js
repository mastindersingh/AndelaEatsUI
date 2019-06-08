const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DotEnv = require('dotenv-webpack');

module.exports = {
  context: __dirname,
  devtool: 'inline-source-map',
  entry: [
    path.resolve(__dirname, './src/index')
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  node: {
    fs: 'empty'
  },
  resolve: {
    modules: ['node_modules', './src'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader!sass-loader'
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: 'css-loader'
        }),
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/images/',
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          plugins: [
            'transform-class-properties',
            'transform-object-rest-spread'
          ]
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
      'process.env.CLOUDINARY_API_KEY': JSON.stringify(process.env.CLOUDINARY_API_KEY),
      'process.env.CLOUDINARY_CLOUD_NAME': JSON.stringify(process.env.CLOUDINARY_CLOUD_NAME),
      'process.env.CLOUDINARY_URL': JSON.stringify(process.env.CLOUDINARY_URL),
      'process.env.SENTRY_URL': JSON.stringify(process.env.SENTRY_URL),
      'process.env.ANDELA_API_URL': JSON.stringify(process.env.ANDELA_API_URL),
      'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
    }),
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      inject: 'body',
      favicon: 'src/assets/images/favicon.ico',
    }),
    new ExtractTextPlugin("css/bundle.css"),
  ],
};
