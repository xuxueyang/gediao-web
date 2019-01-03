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
            hasInit: false
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
            // websocketonmessage(e){ //数据接收
            //     // const redata = JSON.parse(e.data);
            //     // console.log(e.data);
            //     this.content = this.content + '\n'+e.data
            // },
            websocketsend(){//数据发送
                if(!!this.input){
                    // this.content = this.content + '\n你说：' + this.input
                    // 在后台返回时，添加到前台，不然没办法删除自己发送的
                    wsServices.sendMessage(this.websock,this.input,this.onSendSuccess)
                }
            },

            // 发送成功的回调
            onSendSuccess(dataProtocol) {
                if(dataProtocol){
                    if(this.hasInit) {
                        this.content = this.content + '\n' + dataProtocol.message
                        this.input = ''
                    }
                }
            }
        },
        created(){
            this.websock = wsServices.createSession(this.onSendSuccess)
        },
        mounted(){
            this.hasInit = true;
        },
        destroyed(){
            // if(this.websock){
            //     this.websock.close()
            // }
        }
}
</script>
<style>
.mainChat{
    min-height: 400px;
    width: 80%;
    margin-left:20px;
}

</style>

