const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
    return {
        entry: './src/app.ts',
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: [/node_modules/, /src\/server/]
                },
                {
                test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader'
                    ]
                },
                {
                    test: /\.gwm$/,
                    use: 'raw-loader'
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {}
                        }
                    ]
                },
                {
                    test: /\.ttf$/,
                    use: ['file-loader']
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({ filename: "app.css"}),
            new webpack.DefinePlugin({
                DEBUG: env === 'debug' ? true : false
            }),
            // new BundleAnalyzerPlugin({
            //     analyzerPort: 8887
            // }),
            new webpack.optimize.LimitChunkCountPlugin({
                maxChunks: 1
            })
        ],
        resolve: {
            extensions: [ '.tsx', '.ts', '.js', 'scss', '.css' ]
        },
        output: {
            filename: 'app.js',
            library: {
                name: 'silhouette',
                type: 'var'
            },
            publicPath: ''
        },
        externals: {
            "babylonjs": "BABYLON"
        },
        devtool: 'eval',
        context: __dirname,
        devServer: {
            static: ['.', './test', './assets'],
            port: 3001
        }
    }
};