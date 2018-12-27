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
export default {
    data() {
        return {
            websock: null,
            content:'',
            input:''
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
            initWebSocket(){ //初始化weosocket
                //ws地址
                // const wsuri = "ws://localhost:9999" + "/websocket/threadsocket";
                const wsuri = "ws://localhost:9999" + "/websocket";
                this.websock = new WebSocket(wsuri);
                this.websock.onmessage = this.websocketonmessage;
                this.websock.onclose = this.websocketclose;
            },
            websocketonmessage(e){ //数据接收
                // const redata = JSON.parse(e.data);
                console.log(e.data);
                this.content = this.content + '\n'+e.data
            },
            websocketsend(){//数据发送
                this.content = this.content + '\n你说:'+this.input
                this.websock.send(this.input)
                this.input=''
            },
            websocketclose(e){  //关闭
                console.log("connection closed (" + e.code + ")");
                this.content = this.content + "\nconnection closed (" + e.code + ")"
            }
        },
        created(){
            this.initWebSocket()
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

