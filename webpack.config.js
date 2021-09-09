const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, argv) => {
  const isDevelopment = argv.mode !== 'production';

  return {
    entry: [
        './src/index.js',
        './src/styles/styles.scss'
    ],
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
    },
    devServer: {
      port: 5050,
      hot: true,
    },
    devtool: isDevelopment ? 'cheap-module-source-map' : false,
    mode: argv.mode,
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              compact: !isDevelopment,
            },
          },
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'file-loader',
                    options: { outputPath: 'css/', name: '[name].min.css'}
                },
                {
                    loader: "sass-loader",
                },
            ],
            sideEffects: true
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
            }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html' }),
      new MiniCssExtractPlugin({ filename: 'css/styles.min.css' }),
    ],
    performance: {
      hints: isDevelopment ? 'warning' : 'error',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
  };
};