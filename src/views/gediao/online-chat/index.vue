<template>
    <div>
        <div>在线聊天室</div>
        <div >
            <textarea class="mainChat" v-model="content"></textarea>
        </div>
        <div>
            <textarea  v-model="input"></textarea>
            <el-button @click="websocketsend()" >点击我发送消息</el-button>
        </div>
        
        
    </div>
</template>
<script>
import wsServices from '@/api/chat.services'
import services from '../../../api/file.services';
export default {
    data() {
        return {
            websock: null,
            content:'',
            input:'',
        }
    },
    methods: {
            threadPoxi(){  // 实际调用的方法
                //参数
                const agentData = "mymessage";
                //若是ws开启状态
                if (this.websock.readyState === this.websock.OPEN) {
                    this.websocketsend(agentData)
                }
                // 若是 正在开启状态，则等待300毫秒
                else if (this.websock.readyState === this.websock.CONNECTING) {
                    let that = this;//保存当前对象this
                    setTimeout(function () {
                        that.websocketsend(agentData)
                    }, 300);
                }
                // 若未开启 ，则等待500毫秒
                else {
                    this.initWebSocket();
                    let that = this;//保存当前对象this
                    setTimeout(function () {
                        that.websocketsend(agentData)
                    }, 500);
                }
            },
            initWebSocket(){ 
                this.websock = wsServices.createSession(services.getToken(),services.getUserId())
                //初始化weosocket
                //ws地址
                // const wsuri = "ws://localhost:9999" + "/websocket/threadsocket";
                if(this.websock!=null&&this.websock.readyState == this.websock.OPEN){
                    this.websock.onmessage = this.websocketonmessage;
                }else{
                    this.websock.onmessage = this.websocketonmessage;
                }
                
            },
            websocketonmessage(e){ //数据接收
                // const redata = JSON.parse(e.data);
                console.log(e.data);
                this.content = this.content + '\n'+e.data
            },
            websocketsend(){//数据发送
                this.content = this.content + '\n你说:'+this.input
                alert(wsServices.getChatServiceIp())
                console.log(wsServices.createSession(services.getToken(),services.getUserId()))
                // console.log(wsServices.createSession)
                this.websock.send(this.input)
                this.input=''
            },

        },
        created(){
            this.initWebSocket()
        },
        destroyed(){
            this.websock.close()
        }
}
</script>
<style>
.mainChat{
    min-height: 400px;
    min-width: 250px;
    widows: 80%;
}

</style>

