// 为聊天作为服务器类
// 主要功能：消息分发和预处理。在此处定义协议，和上层消息解耦
// 使用token作为主键，以及存储，
import services from './file.services'
import flow from 'lodash/fp/flow'
// https://www.zhihu.com/question/36942520
const wsServices = {
  messages: [
    // 对象数组，含有userId和sessionId
  ],
  onlineWebSock: {
    userId: services.getUserId(),
    token: services.getToken(),
    websock: null,
    hasCheck: false // 跳入这个页面都会创建一个链接，但是必须要登陆才行，
  },
  protocol: {
    OnCreated: '1_1', // 创建时
    OnClose: '1_2',
    ERROR: '-1',
    SUCCESS: '-1',
    sendChatMessage: '2_1',
    OnCreatedSys: '1_1_1',
    CloseSession: '1_1_2'

  },
  dataProtocol: {
    message: '',
    token: '',
    fromUserId: '',
    toUserId: '',
    fromSessionId: '',
    messageType: '',
    protocol: '',
    id: ''
  },
  pushMessage(dataProtocol) {
    this.messages.push(dataProtocol)
  },
  sendMessage(websock, message, onSendSuccess) {
    if (websock) {
      var SendDataProtocol = {}
      SendDataProtocol.message = message
      SendDataProtocol.token = services.getToken()
      SendDataProtocol.userId = services.getUserId()
      SendDataProtocol.protocol = this.protocol.sendChatMessage
      // alert(JSON.stringify(SendDataProtocol))
      this.messages.push(SendDataProtocol)
      websock.send(JSON.stringify(SendDataProtocol))
      if (onSendSuccess != null && typeof onSendSuccess === 'function') {
        onSendSuccess(SendDataProtocol)
      }
    }
  },
  createSession(sendMessage) {
    // 初始化weosocket
    // ws地址
    // const wsuri = "ws://localhost:9999" + "/websocket/threadsocket";
    // TODO check登录
    if (this.onlineWebSock.hasCheck && this.onlineWebSock.websock && this.token && this.userId &&
      this.token === this.onlineWebSock.token &&
      this.userId === this.onlineWebSock.userId) {
      return this.onlineWebSock.websock
    }
    const wsuri = process.env.BASE_API.replace('http', 'ws').replace('"', '') + '/websocket' + '?token=' + services.getToken() + '&userId=' + services.getUserId()
    var websock = new WebSocket(wsuri)
    websock.onclose = this.websocketclose

    this.onlineWebSock.userId = services.getUserId()
    this.onlineWebSock.token = services.getToken()
    this.onlineWebSock.websock = websock
    this.onlineWebSock.hasCheck = false
    // this.websocks.push(_websock)
    if (typeof sendMessage === 'function') {
      const onSuccess = flow(
        this.beforeGetMessage,
        sendMessage,
        this.afterGetMessage,
      )
      websock.onmessage = onSuccess
    } else {
      const onSuccess = flow(
        this.beforeGetMessage,
        this.afterGetMessage,
      )
      websock.onmessage = onSuccess
    }

    return websock
  },
  beforeGetMessage(e) {
    var dataProtocol = JSON.parse(e.data)
    console.log(dataProtocol)
    // alert(wsServices.protocol.CloseSession)
    wsServices.pushMessage(dataProtocol)
    if (dataProtocol) {
      if (dataProtocol.protocol === wsServices.protocol.CloseSession) {
        // TODO 关闭链接

        wsServices.onlineWebSock.websock.close()
        wsServices.onlineWebSock.websock = null
        wsServices.onlineWebSock.hasCheck = false
        return
      }
      if (dataProtocol.protocol === wsServices.protocol.OnCreatedSys) {
        // 发送一个消息，以保存token
        // 能获取到，就说明是这个
        var SendDataProtocol = {}
        SendDataProtocol.token = services.getToken()
        SendDataProtocol.userId = services.getUserId()
        SendDataProtocol.protocol = wsServices.protocol.OnCreated
        wsServices.onlineWebSock.websock.send(JSON.stringify(SendDataProtocol))
        wsServices.messages.push(SendDataProtocol)
        return
      }
      if (dataProtocol.protocol === wsServices.protocol.SUCCESS) {
        // 系统的成功，忽视
        return
      }
      if (dataProtocol.protocol === wsServices.protocol.ERROR) {
        // 系统的失败，提示错误信息
        return
      }
      // 判断在不在协议里，如果不在，也忽视消息
    }
    return dataProtocol
  },
  afterGetMessage(dataProtocol) {
    if (dataProtocol) {
      // 最后处理
    }
  },
  getChatServiceIp() {
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
