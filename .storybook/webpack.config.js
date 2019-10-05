const path = require('path')
const createResolver = require('postcss-import-resolver')
const rootDir = path.resolve(__dirname, '../')
const alias = {
  static: path.resolve(__dirname, '../static'),
  assets: path.resolve('../assets'),
  '@': rootDir,
  '~': rootDir
}

module.exports = async ({ config, mode }) => {
  // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
  // You can change the configuration based on that.
  // 'PRODUCTION' is used when building the static version of storybook.

  // Make whatever fine-grained changes you need

  config.module.rules.push({
    test: /.*\.(ts|tsx)$/,
    loader: 'ts-loader',
    options: {
      appendTsSuffixTo: [/\.vue$/]
    }
  })

  config.module.rules.push({
    test: /\.scss$/i,
    use: [
      'vue-style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          url: false
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: (loader) => [
            require('postcss-import')({
              resolve: createResolver({
                alias: { ...alias },
                modules: [rootDir, 'node_modules']
              })
            }),
            require('postcss-url'),
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              stage: 2,
              browsers: 'last 2 versions',
              autoprefixer: {
                flexbox: 'no-2009',
                cascade: false,
                grid: true
              }
            })
          ]
        }
      },
      {
        loader: 'resolve-url-loader',
        options: {
          debug: false,
          sourceMap: false
        }
      },
      {
        loader: 'sass-loader',
        options: {
          prependData: '@import "@/assets/stylesheets/_globals.scss";'
        }
      }
    ]
  })

  config.module.rules.push({
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 1000, // 1kB
      name: 'fonts/[name].[hash:7].[ext]'
    }
  })

  config.resolve.alias = {
    ...config.resolve.alias,
    ...alias
  }

  config.resolve.extensions.push(
    '.ts',
    '.tsx',
    '.js',
    '.jsx',
    '.vue',
    '.css',
    '.scss',
    '.html'
  )

  // Return the altered config
  return config
}
