// 为聊天作为服务器类
// 主要功能：消息分发和预处理。在此处定义协议，和上层消息解耦
// 使用token作为主键，以及存储，
const wsServices = {
  sessionMap: [
    // 对象数组，含有userId和sessionId
  ],
  dataProtocol: {
    message: '',
    token: '',
    sessionId: '',
    userId: '',
    fromUserId: '',
    toUserId: '',
    fromSessionId: '',
    toSessionId: '',
    messageType: ''
  },
  createSession(token, userId) {
    // var websock = new WebSocket(process.env.GDIAO_WS_API)
    var websock = new WebSocket('ws://193.112.17.169:9999/websocket')
    websock.onclose = this.websocketclose
    console.log('1:' + websock)
    return websock
  },
  getChatServiceIp() {
    // return 'http://localhost:9999'
    // return 'http://193.112.17.169:9999'
    // return process.env.GDIAO_WS_API
  },
  websocketclose(e) {
  // 关闭
    // console.log('connection closed (' + e.code + ')')
    // this.content = this.content + '\nconnection closed (' + e.code + ')'
  }
}
export default wsServices
