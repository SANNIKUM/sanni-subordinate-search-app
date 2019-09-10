const path = require('path');
const webpack = require('webpack');
const HWP = require('html-webpack-plugin');

module.exports={
    entry: ['@babel/polyfill', path.join(__dirname,"/src/index.js")],
    output:{
        filename : "bundle.js",
        path:path.join(__dirname,"/dist")
        
    },
    plugins:[
        new webpack.LoaderOptionsPlugin({
            debug: true
          }),
          new webpack.HotModuleReplacementPlugin(),
          new webpack.ContextReplacementPlugin(/moment[\\\/]lang$/, /^\.\/(en-gb|de|pl)$/),
        new HWP({
            template:path.join(__dirname,"/src/index.html")
        })
    ],
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