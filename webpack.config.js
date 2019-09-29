require('dotenv').config()
const { resolve } = require('path')

const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  devtool: 'cheap-module-eval-source-map',

  context: resolve(__dirname, 'src'),

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?https://review-system-employee.herokuapp.com',
    'webpack/hot/only-dev-server',
    './index.jsx',
    './styles/main.scss',
  ],

  output: {
    path: resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    hot: true,
    contentBase: resolve(__dirname, 'build'),
    publicPath: '/',
    historyApiFallback: true
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.(gif|svg|jpg|png)$/,
        loader: "file-loader"
      },
      {
        test: /\.scss|css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          'sass-loader?sourceMap'
        ]
      },
    ]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'API_URL': JSON.stringify('http://localhost:3000/api/v1')
      }
    }),
    new ExtractTextPlugin({ filename: './styles/style.css' }),
    new HtmlWebpackPlugin({ template: './index.html', inject: 'body' }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

module.exports = config