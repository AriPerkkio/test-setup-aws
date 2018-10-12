const path = require('path');
const cf = require('./api/cf-output.json');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const getPath = dir => path.resolve(__dirname, dir);

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    const plugins = isProduction ?
        [ new MiniCssExtractPlugin() ] :
        [ new HtmlWebPackPlugin({ templateContent: '<div id="app-root"></div>'}) ];

    return {
        entry: getPath('src/index.js'),
        output: {
            path: getPath('public')
        },
        plugins,
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
            proxy: {
                '/api': {
                    target: `http://${cf.CloudFrontDomainName}`,
                    changeOrigin: true,
                    logLevel: 'debug'
                }
            }
        }
    };
};
