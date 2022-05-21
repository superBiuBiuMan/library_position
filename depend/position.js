const axios = require("axios");
//加密模块
const rsa = require("./security.js");
//加密算法所需
var modulus = "00ae1d6d965af848bc5814af9073dce0b03ee18f5f2448f922549826c7ae54601ea7c09ef026c8997343833160298849a9b73483f324100b7095b4bd10afabed447ea1b0871ca613aeb391f1e7361f3ae0a147d1431ddd1c1c080ba46a51d70dc93508a9fc4dcc683ed64d429e026d1335ab01020cfee00e788d78dced6fe5199b";
var exponent = "010001";
var rsaArea = rsa.getKeyPair(exponent, "", modulus);

function rushPlace(option) {

    //日期
    var dateNow = new Date();
    var year = dateNow.getFullYear();
    //获取天 并转化为转化为xx格式
    var today = formatTime(dateNow.getDate() + 2); //+0 预约今天 +1预约明天 +2预约后天
    //获取月 并转化为转化为xx格式
    var month = formatTime(dateNow.getMonth() + 1);
    //预约天数 比如 "2022-04-10"
    var day_time = `${year}-${month}-${today}`;
    // process.env.runLibraryUserSeatIdAndArea = "642&24"
    //读取userID -抓包获取
    var temp = process.env.runLibraryUserSeatIdAndArea.split("&"); // temp[0]为id  temp[1]为vd_id
    //创建三个promise对象,使用Promise.all发送
    let time1 = new Promise((resolve, reject) => {
        let info = getInfo({
            id: temp[0],
            vd_id: temp[1],
            //预约区域
            num: 1,
            day_time: day_time,
            time_end: "12:00"
        });
        //加密过后数据赋值给
        option.params.info = info;
        axios(option)
            .then(data => {
                //返回成功的值
                resolve(data.data.message);
            })
            .catch(reason => {
                resolve("失败了1");
            });
    });
    let time2 = new Promise((resolve, reject) => {
        let info = getInfo({
            id: temp[0],
            vd_id: temp[1],
            num: 2,
            day_time: day_time,
            time_end: "17:00"
        });
        //加密过后数据赋值给
        option.params.info = info;
        axios(option)
            .then(data => {
                //返回成功的值
                resolve(data.data.message);
            })
            .catch(reason => {
                resolve("失败了2");
            });
    });
    let time3 = new Promise((resolve, reject) => {
        let info = getInfo({
            id: temp[0],
            vd_id: temp[1],
            num: 3,
            day_time: day_time,
            time_end: "23:00"
        });
        //加密过后数据赋值给
        option.params.info = info;
        axios(option)
            .then(data => {
                //返回成功的值
                resolve(data.data.message);
            })
            .catch(reason => {
                resolve("失败了3");
            });
    });
    var allInfo;
    Promise.all([time1, time2, time3]).then(data => {
        allInfo = data;
    }).catch(reason => {
        allInfo = reason;
    });
    //返回执行信息
    return allInfo;
}

/**
 * 根据信息获取加密字段info
 * @param {Object} obj 配置项
 * @returns 加密字段
 */
function getInfo(obj) {
    let {
        id,
        vd_id,
        num,
        day_time,
        time_end
    } = obj; //解构赋值
    let rsa_data = id + "," + vd_id + "," + num + "," + day_time + ", " + time_end;
    return rsa.encryptedString(rsaArea, rsa_data);
}

//日期格式化
function formatTime(t) {
    return t.toString()[1] ? t : "0" + t;
}

exports.position = rushPlace