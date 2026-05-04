const { resolve } = require('path');
const nodeExternals = require('webpack-node-externals');

const rendererBabelOptions = {
  presets: [
    ['@babel/preset-env', { targets: { electron: 12 } }],
    '@babel/preset-typescript',
    '@babel/preset-react',
  ],
};

const mainBabelOptions = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
};

module.exports = [
  // CJS Renderer
  {
    entry: './src/renderer/index.ts',
    target: 'electron-renderer',
    output: {
      filename: 'renderer.js',
      path: resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
    },
    resolve: { extensions: ['.ts', '.js', '.tsx', '.jsx'] },
    devtool: 'source-map',
    externals: [nodeExternals()],
    externalsPresets: { electronRenderer: true },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: { loader: 'babel-loader', options: rendererBabelOptions },
          exclude: /node_modules/,
        },
      ],
    },
  },
  // CJS Main
  {
    entry: './src/main/index.ts',
    target: 'electron-main',
    output: {
      filename: 'main.js',
      path: resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
    },
    resolve: { extensions: ['.ts', '.js'] },
    devtool: 'source-map',
    externals: [nodeExternals()],
    externalsPresets: { electronMain: true },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: { loader: 'babel-loader', options: mainBabelOptions },
          exclude: /node_modules/,
        },
      ],
    },
  },
  // ESM Renderer
  {
    experiments: { outputModule: true },
    entry: './src/renderer/index.ts',
    target: 'electron-renderer',
    output: {
      filename: 'renderer.mjs',
      path: resolve(__dirname, 'dist'),
      library: { type: 'module' },
      chunkFormat: 'module',
    },
    resolve: { extensions: ['.ts', '.js', '.tsx', '.jsx'] },
    devtool: 'source-map',
    externalsType: 'module',
    externals: [nodeExternals({ importType: 'module' })],
    externalsPresets: { electronRenderer: true },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: { loader: 'babel-loader', options: rendererBabelOptions },
          exclude: /node_modules/,
        },
      ],
    },
  },
  // ESM Main
  {
    experiments: { outputModule: true },
    entry: './src/main/index.ts',
    target: 'electron-main',
    output: {
      filename: 'main.mjs',
      path: resolve(__dirname, 'dist'),
      library: { type: 'module' },
      chunkFormat: 'module',
    },
    resolve: { extensions: ['.ts', '.js'] },
    devtool: 'source-map',
    externalsType: 'module',
    externals: [nodeExternals({ importType: 'module' })],
    externalsPresets: { electronMain: true },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: { loader: 'babel-loader', options: mainBabelOptions },
          exclude: /node_modules/,
        },
      ],
    },
  },
];
