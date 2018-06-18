import webpack from 'webpack'
import path from 'path'

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['./src/vendors.ts'],
    main: './src/main.ts',
  },
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.jsx']
  },
  module: {
    rules: [
      {test: /\.js$/, use: {loader: 'babel-loader'}},
      {test: /\.ts$/, use: {loader: 'ts-loader'}},
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
