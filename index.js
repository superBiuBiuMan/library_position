// 'use strict';
const tool = require("./depend/position.js");
var userSeatInfoOption = {
  method: "get",
  url: "https://wxcourse.jxufe.cn/wxlib/wx/appoint",
  params: {
    'isPeriod': 1,
    'userId': process.env.runLibraryUser,
    'appointType': 0,
    'officeCode': "jxcjdx",
    'colleageId': 51,
    //添加加密后的字段
    'info': ""
  },
  //伪装
  headers: {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 11; IN2010 Build/RP1A.201005.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/3171 MMWEBSDK/20211202 Mobile Safari/537.36 MMWEBID/7693 MicroMessenger/8.0.18.2060(0x28001237) Process/toolsmp WeChat/arm32 Weixin NetType/4G Language/zh_CN ABI/arm64',
    'Referer': 'https://servicewechat.com/wxa30b47e94c4c8f08/25/page-frame.html'
  }
};
exports.handler = (event, context, callback) => {
  var info = tool.position(userSeatInfoOption);
  //输出执行结果
  callback(null, info);
};