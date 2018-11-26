const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: './static/mpages/js/index.js',
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,//处理CSS
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    "css-loader"
                ],
            },
            {
                test: /\.(html)$/,//处理html中图片
                use: {
                    loader: 'html-loader'
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,//处理css图片
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    },
                },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,//处理字体
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    },
                },
                ],
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),//清空构建目录
        new HtmlWebpackPlugin({ //生成选定页面
            title: '品创饰家手机端',
            filename: 'index.html',
            template: 'index.html'
        }),
        new MiniCssExtractPlugin({//分离css
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].css",
            chunkFilename: "[id].css"
        }),
    ]
}