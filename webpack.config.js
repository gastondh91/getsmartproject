const path = require('path');

const scssLoader = [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      modules: {
        mode: "local",
        localIdentName: "[path][name]__[local]--[hash:base64:5]",
        context: path.resolve(__dirname, "src")
      }
    }
  },
  "sass-loader"
];

module.exports = {
  mode: 'development',
  entry: './front/src/index.js',
  output: {
    path: __dirname,
    filename: './back/public/bundle.js'
  },
  
  resolve: {
    extensions: ['.js', '.jsx']
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            '@babel/preset-react',
            '@babel/env'
          ]
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: scssLoader
      },
    ]
  },
  devtool: 'source-map'
};
