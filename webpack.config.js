const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',     
  entry: './src/app.ts',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
    library: {
      type: 'module',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@commands': path.resolve(__dirname, 'src/commands/index'),
      '@helpers': path.resolve(__dirname, 'src/helpers/index'),
      '@api': path.resolve(__dirname, 'src/api/index'),
      '@constants': path.resolve(__dirname, 'src/constants/index'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces/index'),
      '@scenes': path.resolve(__dirname, 'src/scenes/index'),
      '@middlewares': path.resolve(__dirname, 'src/middlewares/index'),
      '@config': path.resolve(__dirname, 'src/config/index'),
      '@models': path.resolve(__dirname, 'src/models/index'),
    },
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      fs: false,
      os: require.resolve('os-browserify/browser'),
    },  
  },
  experiments: {
    outputModule: true,
  },
  externals: [nodeExternals()],
};