/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
/* eslint-enable @typescript-eslint/no-var-requires */

const mode = process.env.ENV;
const port = process.env.PORT;
const host = process.env.HOST_IP;
const name = process.env.PROJECT_NAME;

if ([port, host, name].includes(undefined)) {
  throw new Error('Environment is not set correctly. You must provide ENV, PORT, HOST and PROJECT_NAME environment variables.');
}

const appConfig = {
  mode,
  context: __dirname,
  entry: {
    [name]: [
      'webpack-hot-middleware/client',
      './src/scripts/app.ts',
    ],
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, './dist/assets'),
    publicPath: '/assets/',
    filename: '[name].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },
      // Stylesheets.
      {
        test: /\.s?css$/,
        use: [
          // `style-loader` turns CSS into JS modules.
          {
            loader: 'style-loader',
            options: {},
          },
          // `css-loader` resolves paths in CSS and adds assets as dependencies.
          {
            loader: 'css-loader',
            options: { sourceMap: true, import: false },
          },
          // `postcss-loader` is used to autoprefix CSS to ensure compatibility with all browsers.
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-sort-media-queries'], ['autoprefixer']],
                sourceMap: true,
              },
            },
          },
          // `sass-loader` converts SASS syntax into CSS.
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue: 'vue/dist/vue.runtime.js',
    },
    modules: ['src', 'node_modules'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.bundle.css',
    }),
    // Allows .vue files parsing.
    new VueLoaderPlugin(),
    // Enables HMR with webpack-dev-middleware.
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: false,
      environment: 'development',
      // chunks: ['app'],
      filename: path.resolve('./dist/', 'index.html'),
      template: path.resolve('./src/', 'html/index.html.ejs'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  node: false,
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    hot: true,
    port,
  },
  performance: {
    hints: false,
  },
  devtool: 'eval-source-map',
};

module.exports = appConfig;
