const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HWP = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PUBLIC_PATH = '/';
 const GLOBALS = {
   'process.env.PUBLIC_PATH': JSON.stringify(PUBLIC_PATH)
 };
module.exports={
  mode: 'production',
  entry: path.join(__dirname,"/src/index.js"),
  output: {
    path: path.join(__dirname, 'dist', PUBLIC_PATH), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: PUBLIC_PATH,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist', PUBLIC_PATH)
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.ContextReplacementPlugin(/moment[\\\/]lang$/, /^\.\/(en-gb|de|pl)$/),
    new HWP({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "app.css"
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
    module:{
        rules:[
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                use: ['babel-loader']
            },
            {
              test: /(\.css)$/,
              use: ['style-loader', 'css-loader']
            }
        ]
    }
}