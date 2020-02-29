const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  lintOnSave: true,
  transpileDependencies: ['resize-detector'],
  chainWebpack: config => {

    const svgRule = config.module.rule('svg')

    // clear all existing loaders.
    // if you don't do this, the loader below will be appended to
    // existing loaders of the rule.
    svgRule.uses.clear()

    svgRule
        .use('raw-loader')
        .loader('raw-loader')
        .end()

    config.optimization.clear('splitChunks').splitChunks({
      cacheGroups: {
        vue: {
          name: 'echarts',
          test: /[\\/]node_modules[\\/]echarts[\\/]/,
          priority: 0,
          chunks: 'initial'
        },
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    })
  },
  transpileDependencies: [
    'resize-detector'
  ],
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'content': 'components/content',
        'common': 'components/common',
        'assets': '@/assets',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://view.inews.qq.com', // 源地址
        changeOrigin: true, // 改变源
        pathRewrite: {
          '^/api': '' // 路径重写
        }
      },
      '/hospital': {
        target: 'https://wechat.wecity.qq.com', // 源地址
        changeOrigin: true, // 改变源
        pathRewrite: {
          '^/hospital': '' // 路径重写
        }
      }
    }
  }
}
