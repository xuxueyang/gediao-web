import axios from 'axios'
import returnCode from './services.returnCode'
const services = {
  // serviceIp =  ,
  getServiceIp() {
    // return 'http://localhost:9999'
    return 'http://193.112.17.169:9999'
  },
  getImageServiceUrl(imageName) {
    return 'http://193.112.161.157:8080/resource/images/' + imageName
  },
  getGediaoMessageStatusUrl() {
    // type: APP_GEDIAO_LOG_MESSAGE_STATUS
    const url = '' + this.getServiceIp() + '/api/dist/codes/' + 'APP_GEDIAO_LOG_MESSAGE_STATUS'
    return url
  },
  transferZonetimedateToBelongDate(date) {
    // Jul 21 2018 11:36:04 GMT+0800 (ä¸­å½æ åæ¶é´),Sat Jul 21 2018 11:36:04 GMT+0800 (ä¸­å½æ åæ¶é´)
    var tmp = new Date(date)
    var month = tmp.getMonth()
    month = month + 1
    if (month < 9 ) {
      month = '0' + month
    }
    var day = tmp.getDate()
    if (day <= 9) {
      day = '0' + day
    }
    return '' + tmp.getFullYear() + '-' + month + '-' + day
  },
  getTodayDate() {
    // 得到今天的日期
    const seperator1 = '-'
    const date = new Date()
    const year = date.getFullYear()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate
  },
  getOtherDate(date, num) {
    const y = date.valueOf() + num * 24 * 60 * 60 * 1000;
    return new Date(y);
  },
  getBFileMB(bsize) {
    // 转为int，/1024/1024
    const size = parseFloat(bsize)
    var num = size / 1024 / 1024
    return num.toFixed(2) + 'MB'
  },
  getMessageByCode(code) {
    if (returnCode[code] === undefined) {
      return '未知错误'
    } else {
      return returnCode[code]
    }
  },
  getUserId() {
    const info = window.localStorage.getItem('userinfo')
    var userId = undefined
    JSON.parse(info, function(k, v) {
      if (k === 'id') {
        userId = v;
      }
    })
    // console.log(userId)
    return userId
  },
  saveUserinfo(userinfo) {
    window.localStorage['userinfo'] = JSON.stringify(userinfo)
  },
  getToken() {
    return window.localStorage.getItem('token')
  },
  saveToken(data) {
    window.localStorage['token'] = data
  },
  changeToBJTime(time) {
    return (new Date(time)).toLocaleString()
    // 把标准时间添加时区的8小时
    // var date = new Date(time)
    // // console.log(date)
    // var hour = date.getHours()
    // var month = date.getMonth()
    // var day = date.getDate()
    // var year = date.getFullYear()
    // // console.log(day)
    // console.log(time)
    // console.log(date)
    // if((hour+8)>24) {
    //   hour = hour -16;
    //   day = day +1;
    //   //得到月份
    //   const bigM = [1,3,5,7,8,10,12]
    //   var belong = false
    //   for(var i =0;i<bigM;i++){
    //     if(bigM[i]==month&&day>31) {
    //         month = month +1;
    //         day = day - 31;
    //         belong = true
    //         break
    //     }
    //   }
    //   if(!belong) {
    //     if(month==2){
    //       if(day==29&&Math.ceil(year,4)!=Math.floor(year,4)){
    //         month = month+1
    //         day = day -1
    //         belong = true;
    //       }
    //     }
    //   }
    //   if(!belong) {
    //     if(day>30) {
    //         month = month +1
    //         day = day-30
    //     }
    //   }
    //   if(month>12){
    //     month  = month -12
    //     year = year +1
    //   }
    // }
    // return ''+year+'-'+month+'-'+day +'—'+hour+''//年月日

  },
  async getAllFiles(pararms) {
    // var res = null
    const res = axios.get('' + this.getServiceIp() + '/api/uaafile/list', { pararms })
    return res
  },

}
export default services
  // getUsers: async (params) => {
  //   const res = await http('get', 'cubeuaa/api/users', {
  //     params
  //   })
  //   return res
  // },
  // // 获取所有数据字典
  // getAllDictionaries: async () => {
  //   const res = await http('get', 'dict/api/111/222/dict-codes', {params: {status: 1, page: 0, size: 2000}});
  //   return res;
  // },
  // // 获取某个数据字典的列表
  // getDictionary: async (id) => {
  //   const res = await http('get', `dict/api/111/222/dict-code/${id}`, {params: {status: 1, page: 0, size: 2000}});
  //   return res;
  // },
  // // 创建应用
  // async createApplication(){
  //   return await http('post', 'workflow/api/app', {data: {}});
  // },
  // // 获取应用列表
  // async getApplications(data = {status: 'P,UP,SP'}){
  //   return await http('get', 'workflow/api/apps', {params: data});
  // },
  // // 删除应用
  // async deleteApplication(id){
  //   return await http('delete', `workflow/api/app/${id}`);
  // },
  // // 获取单个应用信息
  // async getApplicationInfo(id){
  //   return await http('get', `workflow/api/app/${id}`);
  // },
  // // 保存表单设计
  // async saveForm(data){
  //   return await http('put', 'workflow/api/app', {data: data});
  // },
  // // 获取组织架构下的所有用户信息
  // async getAllGroupsAndUsers(){
  //   return await http('get', 'cubeuaa/api/groups/all');
  // },
  // // 下载附件
  // async downloadFile(data){
  //   return await http('get', 'upload/api/file', {params: data});
  // },
  // // 添加节点
  // async createNode(data){
  //   return await http('post', 'workflow/api/workflow/node', {data: data});
  // },
  // // 删除节点
  // async deleteNode(id, appId){
  //   return await http('delete', `workflow/api/workflow/node/${id}`, {params: {appId: appId}});
  // },
  // // 添加子分支
  // async createChildBranch(data){
  //   return await http('post', 'workflow/api/workflow/branch', {data: data});
  // },
  // // 删除子分支
  // async deleteChildBranch(id, appId){
  //   return await http('delete', `workflow/api/workflow/branch/${id}`, {params: {appId: appId}});
  // },
  // // 修改子分支
  // async updateChildBranch(data){
  //   return await http('put', 'workflow/api/workflow/branch', {data: data});
  // },
  // // 更新节点
  // async updateNode(data){
  //   return await  http('put', 'workflow/api/workflow/node', {data: data});
  // },
  // // 发布应用
  // async publishApplication(id){
  //   return await http('put', `workflow/api/app/publish/${id}`);
  // },
  // // 查询某一个应用的表单元素
  // async getFormElements(data){
  //   return await http('get', 'workflow/api/app/form-data', {params: data});
  // },
  // // 判断当前用户是否有权限申请
  // async hasPermissionApply(appId){
  //   return await http('get', 'workflow/api/app/check-apply-permission', {params: {appId: appId}});
  // },
  // // 判断应用是否需要密码
  // async needPassword(appId){
  //   return await http('get', 'workflow/api/app/check-apply-pwd', {params: {appId: appId}});
  // },
  // // 验证密码是否正确
  // async passwordValidate(appId, password){
  //   return await http('get', 'workflow/api/app/check-apply-pwd', {params: {appId: appId, pwd: password}});
  // },
  // async putSetting(data){
  //   return await http('put', 'workflow/api/app/setting',{data: data});
  // },
  // async getSetting(data){
  //   return await http('get', `workflow/api/app/setting/${data}`);
  // },
  // // 查询某个节点下的表单元素
  // async getFormElementsByNode(appId, workflowNodeId = null){
  //   return await http('get', 'workflow/api/app/publish/form-data', {
  //     params: {
  //       appId: appId,
  //       workflowNodeId: workflowNodeId
  //     }
  //   });
  // },
  // // 提交表单
  // async submitApply(appId, data){
  //   return await http('post', `workflow/api/app/${appId}/data`, {data: data});
  // },
  // // 显示抄送节点
  // showTaskResource(appId) {
  //   return http('get', 'workflow/api/app/all-carbon', {params: {appId}})
  // },
  // // 获取已办事项
  // getFinishedTask(appId) {
  //   return http('get', 'workflow/api/app/all-finished', {params: {appId}})
  // },
  // // 获取已通过事项
  // getPassedTask(appId) {
  //   return http('get', 'workflow/api/app/all-pass', {params: {appId}})
  // },
  // // 获取未通过事项
  // getUnPassedTask(appId) {
  //   return http('get', 'workflow/api/app/all-unpass', {params: {appId}})
  // }
