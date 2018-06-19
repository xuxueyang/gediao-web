import axios from 'axios'

const services = {
  // serviceIp =  ,
  getServiceIp() {
    // return 'http://localhost:9999'
    return 'http://193.112.17.169:9999'
  },
  getBFileMB(bsize) {
    // 转为int，/1024/1024
    const size = parseFloat(bsize)
    var num = size / 1024 / 1024
    return num.toFixed(2) + 'MB'
  },
  async getAllFiles(pararms) {
    // var res = null
    const res = axios.get('' + this.getServiceIp() + '/api/uaafile/list', { pararms })
    return res
  }
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
