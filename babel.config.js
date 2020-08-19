module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ["es2015", {
      "modules": false
    }]
  ],
  plugin: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
  // 按需引入vant，需要安装 npm i babel-plugin-import -D
  // plugins: [
  //   ['import', {
  //     libraryName: 'vant',
  //     libraryDirectory: 'es',
  //     // 指定样式路径
  //     style: name => `${name}/style/less`
  //   }, 'vant']
  // ]
};
