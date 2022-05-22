---
title: 我来图书馆实现用云函数cfc进行自动化抢位置
tags: [NodeJs]
categories: [javscript,工具]
date: 2022-5-21 15:06:07
updated: 2022-5-21 15:06:10
index_img: https://dreamos.oss-cn-beijing.aliyuncs.com/gitblog/202205212219583.jpg
---
#### 前言

* 抓包的话就不多说啦

* 只实现四楼自动抢,其他楼自己改改就可以

* 先下载下代码,[单击我进入跳转下载](https://github.com/superBiuBiuMan/library_position)

* 下载代码后的操作

  ![下载zip格式](README.assets/202205212200893.png)

* 下载完成后,将其解压后重新在目录内压缩

![下载完成后,将其解压后重新在目录内压缩](README.assets/202205212204778.png)

#### 具体操作步骤

* 进入[单击我进入官网](https://cloud.baidu.com/product/cfc.html),登录注册实名就不多说了

![单击体验](README.assets/202205212130187.png)

* 再单击创建函数

![单击创建函数](README.assets/202205212132269.png)

* 选择空白函数后单击'下一步'

![选择空白函数后单击'下一步'](README.assets/202205212133464.png)

* 按照如图选择

![按照如图选择](README.assets/202205212134491.png)

* **单击提交,创建完成**

![创建完成](README.assets/202205212134445.png)

* 单击**'进入函数详情页'**

![单击进入函数详情页](README.assets/202205212137348.png)

* 单击'函数代码'

![单击'函数代码'](README.assets/202205212135973.png)

* 下载刚刚下载的代码
* 单击'上传代码.zip'

![单击'上传代码.zip'](README.assets/202205212138082.png)

* 选择刚刚下载的zip

![选择自己重新压缩过的](README.assets/202205212205986.png)

* 选择好后单击开始上传

![选择好后单击开始上传](README.assets/202205212205747.png)

* 切换回'在线编辑'

![切换回'在线编辑'](README.assets/202205212206008.png)

* 单击编辑进入环境变量设置

![单击编辑进入环境变量设置](README.assets/202205212206666.png)

* 添加这二个环境变量 ,单击保存

```
runLibraryUser 自己抓包的用户代码	
runLibraryUserSeatIdAndArea 座位号id&区域id 具体看github的里面的区域文档

比如
runLibraryUser rjwiaorjawrijoawr
runLibraryUserSeatIdAndArea 561&24
```



![添加环境变量](README.assets/202205212208903.png)

* 单击'触发器',增加触发器

![单击'触发器',增加触发器](README.assets/202205212209042.png)

* 添加完成
  * cron(30 14 * * ?)

![添加完成](README.assets/202205212210294.png)

![添加完成](README.assets/202205212211234.png)

* 后面就自动22:30预约了

可以在这里看预约日志

![可以在这里看预约日志](README.assets/202205212211395.png)