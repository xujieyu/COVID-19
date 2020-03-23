# COVID-19

## 项目介绍
这个项目主要是对新型冠状病毒进行一个实实时的监控。
- 数据来自[Wuhan-2019-nCoV项目](https://github.com/canghailan/Wuhan-2019-nCoV)
- 数据通过python脚本进行筛选和切分并放到腾讯云COS上
- 图表采用Echarts绘制
- 支持省级数据和图表
- Vue-cli@4脚手架项目
- [线上示例](http://193.112.19.128)

## 数据处理方法

通过编写脚本，对数据进行处理并拆分，生成前端能够直接使用的数据，而不需要在前端处理数据

处理后的数据放到腾讯云COS上
- 获取全国每个省现存确诊病历来绘制全国地图
- 获取各省每个市区的现存确诊病历来绘制各省地图
- 获取全国每日数据变化来绘制变化曲线
- 获取全国/湖北/非湖北每日数据变化来绘制对比曲线
- 获取各省每日数据变化来绘制变化曲线

[数据处理代码地址](https://github.com/xujieyu/getCOVIDJson)

## 页面优化方式
首先安装webpack-bundle-analyzer插件来查看哪些文件比较大
```
npm install --save-dev webpack-bundle-analyzer

//然后运行
npm run build -- --report
//打开dist里的report.html就可以查看分析 
```

### 1 网络部分
- 对数据进行处理和合并减少HTTP请求数
- 把一些静态资源，例如图片和数据，放到CDN上
- 避免出现重定向和404错误

### 2 内容部分
- 路由的懒加载
- 压缩JavaScript和CSS
- 减少js对DOM的访问
- gzip压缩
- 对图片进行压缩

### 3 外部插件的优化
- 按需加载
- 通过CDN引用


## 性能测试
在腾讯云服务器用nginx部署静态网站

网站服务器配置

![](https://note.youdao.com/yws/public/resource/ccbd697e0a33b78d122fe94174b7166d/xmlnote/F0FF22060A924EC69DBD09DF04EAC979/3924)



使用loadimpact测试网站的负载能力，该测试工具从10个客户端逐步增加了50个客户端来对用户网站的负载能力进行测试
![](https://note.youdao.com/yws/public/resource/ccbd697e0a33b78d122fe94174b7166d/xmlnote/28C8047F624E41ABA92533AB8B5E4A0E/3870)
这个网站平均响应时间是698ms,响应时间还是比较快的。

