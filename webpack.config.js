const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    mode: 'production',
    entry: {
        style: path.resolve(__dirname, 'src', 'styles', 'styles.scss'),
        multiplayer: path.resolve(__dirname, 'src', 'js', 'multiplayer.js'),
        login: path.resolve(__dirname, 'src', 'js', 'login.js'),
        register: path.resolve(__dirname, 'src', 'js', 'register.js'),
        online: path.resolve(__dirname, 'src', 'js', 'online.js'),
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].bundle.js',
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue',
            validator: 'validator/validator.js'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'production',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new webpack.ProvidePlugin({
            Vue: 'vue',
            validator: 'validator'
        }),
        new CompressionPlugin({
            // asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            // threshold: 10240,
            minRatio: 0.8
        }),
    ],

    module: {
        rules: [{
                test: /\.(s*)css$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ],
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                vue: {
                    test: /[\\/]node_modules[\\/](.*vue.*)[\\/]/,
                    name: "vue",
                    chunks: 'all',
                    minSize: 0,
                    maxInitialRequests: Infinity,
                },
                echarts: {
                    test: /[\\/]node_modules[\\/](validator)[\\/]/,
                    name: "validator",
                    chunks: 'all',
                    minSize: 0,
                    maxInitialRequests: Infinity,
                }
            },
        },

        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                uglifyOptions: {
                    comments: false, // remove comments
                    compress: {
                        unused: true,
                        dead_code: true, // big one--strip code that will never execute
                        drop_debugger: true,
                        conditionals: true,
                        evaluate: true,
                        drop_console: true, // strips console statements
                        sequences: true,
                        booleans: true,
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true
                        }
                    }],
                },
                canPrint: true
            })
        ],
    },

    devtool: 'cheap-source-map',
}