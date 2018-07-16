'use strict';
const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =

    {
        entry: './src/index.js',
        context: __dirname,
        output: {
            path: __dirname + '/build',
            filename: 'build.js'
        },
        devtool: "cheap-inline-module-source-map",
        watch: true,
        watchOptions: {
            aggregateTimeout: 200
        },
        devServer: {
            host: 'localhost',
            port: 3030,
            hot: true,
            proxy: {
                "/": "http://localhost:8080"
            }
            // proxy: {
            //     "/": "http://localhost:3000"
            // }
        },
        module: {
            loaders: [
                {
                    test: /\.(jsx|js)$/,
                    exclude: /node_modules\//,
                    loader: 'babel',
                    query: {
                        plugins: [
                            'transform-runtime',
                            'add-module-exports',
                            'transform-decorators-legacy'
                        ],
                        presets: ['es2015', 'react', 'stage-1']
                    }
                },
                {
                    test: /\.html$/,
                    loader: "raw"
                },
                {
                    test: /\.css$/,
                    loader: "style-loader!css-loader"
                },
                {
                    test: /\.scss$/,
                    loader: "style-loader!css-loader!sass-loader"
                },
                {
                    test: /\.(jpeg|jpg|png|woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000'
                },
                {
                    test: /\.less$/,
                    loader: 'style-loader!css-loader!less-loader'
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                }
            ]
        }
        ,
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
                filename: './index.html',
                inject: true
            })
        ]

    };