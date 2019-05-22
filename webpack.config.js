const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry:['@babel/polyfill','./src/js/index.js'],
    output:{
        path:path.resolve(__dirname,'./dist'),
        filename:'js/bundle.js'
    },

    module:{
        rules:[
            {
                test:/\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    { loader:'css-loader' },
                    { loader:'postcss-loader' }, //Should be between these two
                    { loader:'sass-loader' }
                ]
            },
            {
                test:/\.(jpe?g|png|gif|svg|jpg)$/,
                use:{
                    loader:'file-loader',
                    options:{
                        outputPath:'img'
                    }
                }
            },
            {
                test:/\.html$/,
                use:'html-loader' 
            },
            {
                test:/\.js$/,
                exclude:'/node_modules/',
                use:['babel-loader']
            }
        ]
    },

    plugins:[
        new webpack.ProvidePlugin({
            $:'jquery',
            jQuery:'jquery'
        }),
        new webpack.LoaderOptionsPlugin({
            options:{
                postcss:[
                    autoprefixer()
                ]
            }
        }),
        new HtmlWebpackPlugin({
            filename:'index.html',
            template:'./src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'css/style.css'
        })
    ]
};

//autoprefixer handle all browser compatibility issues