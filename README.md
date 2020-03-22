# COVID-19

## 项目介绍
这个项目主要是对新型冠状病毒进行一个实实时的监控。
- 数据来自[Wuhan-2019-nCoV项目](https://github.com/canghailan/Wuhan-2019-nCoV)
- 数据通过python脚本进行筛选和切分并放到腾讯云COS上
- 图表采用Echarts绘制
- 支持省级数据和图表
- Vue-cli@4脚手架项目
- [线上示例](http://193.112.19.128)

## 性能测试
使用loadimpact测试网站的负载能力，该测试工具从10个客户端逐步增加了50个客户端来对用户网站的负载能力进行测试
![](https://note.youdao.com/yws/public/resource/ccbd697e0a33b78d122fe94174b7166d/xmlnote/28C8047F624E41ABA92533AB8B5E4A0E/3870)
这个网站平均响应时间是698ms,响应时间还是比较快的。

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
