module.exports = {
  // 覆盖蓝色主题
  // lintOnSave: true,
  // devServer: {
  //   open: true,
  //   port: 8888
  // },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          blue: '#3296fa'
        }
      }
    }
  }
}
