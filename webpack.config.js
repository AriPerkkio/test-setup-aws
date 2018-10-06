const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getPath = dir => path.resolve(__dirname, dir);

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: getPath('src/index.js'),
        output: {
            path: getPath('public')
        },
        plugins: [
            new MiniCssExtractPlugin()
        ],
        module: {
            rules: [{
                test: /.scss$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ],
                    plugins: [
                        '@babel/plugin-proposal-class-properties'
                    ]
                }
            }]
        },
        devServer: {
            port: 3000,
            contentBase: getPath('public'),
            proxy: {
                '/api': {
                    target: 'http://d2yvewft3wdr35.cloudfront.net',
                    changeOrigin: true,
                    logLevel: 'debug'
                }
            }
        }
    }
}