const webpack = require('webpack')
const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}
module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 8990,
    proxy: {
      '/mag': {
        target: 'https://127.0.0.1'
      }
    },
    publicPath: ''
  },
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = 'ICS-Admin'
        return args
      })
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
  },
  configureWebpack: {
    devtool: 'souce-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          APP_ENV: JSON.stringify(process.env.APP_ENV) // 创建自定义环境变量，结合 cross-env 第三方插件进行脚本设置
        }
      })
    ]
  }
}
