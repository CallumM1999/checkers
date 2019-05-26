const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (undefined, argv) => {
    return {
        mode: 'development',
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
            alias: { vue: 'vue/dist/vue' }
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: 'css/main.css' }),
            new webpack.ProvidePlugin({ Vue: 'vue' })
        ],
     
        module: {
            rules: [
                {
                    test: /\.(s*)css$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ],
        },
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            open: false,
        }
    }
}