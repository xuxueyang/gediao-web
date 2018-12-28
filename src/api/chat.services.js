// 为聊天作为服务器类
// 主要功能：消息分发和预处理。在此处定义协议，和上层消息解耦
// 使用token作为主键，以及存储，
import services from './file.services'

const wsServices = {
  sessionUserIdAndWebSockMap: [
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
  sendMessage(websock, message, onSendSuccess) {
    var SendDataProtocol = {}
    SendDataProtocol.message = message
    SendDataProtocol.token = services.getToken()
    SendDataProtocol.userId = services.getUserId()
    // SendDataProtocol.fromUserId = 
    // alert(JSON.stringify(SendDataProtocol))
    websock.send(JSON.stringify(SendDataProtocol))
    if (onSendSuccess != null && typeof onSendSuccess === 'function') {
      onSendSuccess()
    }
  },
  createSession(sendMessage) {
    // 初始化weosocket
    // ws地址
    // const wsuri = "ws://localhost:9999" + "/websocket/threadsocket";
    // var websock = new WebSocket(process.env.GEDIAO_WS_API)
    // alert(process.env.BASE_API.replace('http', 'ws') + '/websocket')
    var websock = new WebSocket(process.env.BASE_API.replace('http', 'ws') + '/websocket')
    websock.onclose = this.websocketclose
    // this.sessionMap[userId] = userId
    this.sendMessage[services.getUserId()] = websock
    // console.log('1:' + websock)
    if (typeof sendMessage === 'function') {
      websock.onmessage = sendMessage
    }
    return websock
  },
  getChatServiceIp() {
    // console.log(process.env.GEDIAO_WS_API)
    // return 'ws://localhost:9999/websocket'
    // return 'ws://193.112.17.169:9999/websocket'
    return process.env.BASE_API.replace('http', 'ws') + '/websocket'
  },
  websocketclose(e) {
  // 关闭
    // console.log('connection closed (' + e.code + ')')
    // this.content = this.content + '\nconnection closed (' + e.code + ')'
  }
}
export default wsServices
