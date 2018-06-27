/**
 * Created by BIYY on 2018-6-21.
 */
const path = require('path');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
function resolve (dir) {
  return path.join(__dirname, '..', dir);
}
module.exports = [
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: [resolve('../../src')],
    exclude: [resolve('../..src/common/lib/react-scoped-style')]
  },
  {
    test: /\.css/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader',
        options: {
          minimize: true
        }
      }
    ]
  },
  {
    test: /\.less$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader',
        options: {
          minimize: true,
          importLoaders: 1,
          modules: true,
          localIndexName: '[name]__[local]___[hash:base64:5]',
        }
      },
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),
            autoprefixer({
              browsers: [
                "last 10 versions",
                "ie >= 6",
                "ie_mob >= 6",
                "ff >= 10",
                "chrome >= 14",
                "safari >= 3",
                "ios >= 4",
                "android >= 4.0"
              ]
            })
          ],
        },
      },
      {
        loader: require.resolve('less-loader'), // compiles Less to CSS
      },
    ]
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('../../src')]
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000000,
      name: path.posix.join('static', 'img/[name].[ext]')
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader?limit=1000000',
    query: {
      limit: 1000000,
      name: path.posix.join('static', 'fonts/[name].[ext]')
    }
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: path.posix.join('static', 'media/[name].[hash:7].[ext]')
    }
  }
];