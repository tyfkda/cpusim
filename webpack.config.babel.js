import path from 'path'
import webpack from 'webpack'

module.exports = {
  context: __dirname + '/src',
  mode: 'production',
  entry: {
    vendors: ['./vendors.ts'],
    main: './main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
  },
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: {loader: 'babel-loader'}},
      {test: /\.ts$/, exclude: /node_modules/, use: {loader: 'ts-loader'}},
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          enforce: true,
          chunks: 'all',
        },
      },
    },
  },
}
