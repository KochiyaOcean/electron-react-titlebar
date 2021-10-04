const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [{
  entry: './src/renderer/index.ts',
  target: 'electron-renderer',
  output: {
    filename: 'renderer.js',
    path: resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx', 'jsx'],
  },
  devtool: 'source-map',
  externals: [nodeExternals()],
  externalsPresets: {
    electronRenderer: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  "targets": {
                    "electron": 12
                  }
                }
              ],
              '@babel/preset-typescript',
              '@babel/preset-react'
            ]
          }
        },
        exclude: /node_modules/
      }
    ]
  },
}, {
  entry: './src/main/index.ts',
  target: 'electron-main',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'source-map',
  externals: [nodeExternals()],
  externalsPresets: {
    electronMain: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript']
          }
        },
        exclude: /node_modules/
      }
    ]
  },
}]
