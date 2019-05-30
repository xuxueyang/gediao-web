<template>
    <div>
        <!-- 右边展示图片下拉列表，和定制化大小，左边显示一个分隔方框图 -->
        <article class="article-create-map">
            <header class="header-init">
            <!-- 2个输入长宽，一个button标识创建 -->
                <el-input v-model="inputCol" placeholder="请输入行数"></el-input>
                <el-input v-model="inputRow" placeholder="请输入列数"></el-input>
                <el-button type="primary" icon="el-icon-edit" circle @click="create"></el-button>
            </header>
            <aside class="container">
                <div class="left">
                    <div v-for="(item, index) in mapBases" v-bind:key="index"  draggable="true" 
                        >
                        <img :src="item.imagePath" 
                            @dragstart="drag" draggable="true" :id="item.id"/>
                    </div> 
                </div>
                <div class="right">
                    <div v-for="(item, index) in bases" v-bind:key="index">
                        <div 
                            @dragover="over"
                            @dragenter="over"
                            @drop="drop"
                            v-for="(itemcol, indexcol) in item" v-bind:key="indexcol" @click="showInfo(itemcol)" :id="itemcol.id">
                            背景图
                        </div>
                    </div>
                </div>       
            </aside>

        </article>
    </div>
</template>

<script>
import map from  "../../../api/map.services";
import services from  "../../../api/file.services";
export default {
    data () {
        return {
            mapBases: [],
            inputRow: 10,
            inputCol: 10,
            bases: [],
            idPre: 'mapeditorbase_',
            globalId: 0
        }
    },
    mounted() {
        this.getAllMapBases()
    },
    methods: {
        drop (e) {
            // 放下
            e.preventDefault();
            console.log('drop')
            console.log(e)
            var beizhuaid = e.dataTransfer.getData("id")
           
            var fangId = e.target.id
            //获取抓取元素，替换divd等等
            console.log('drop:' + beizhuaid + '  ' + fangId)
            // 替换图片
            var el = document.getElementById(fangId)
            console.log(document.getElementById(beizhuaid).src)
            el.style.backgroundImage =  'url(' +  document.getElementById(beizhuaid).src + ')'
        },
        drag (e) {
             console.log('drag')
            console.log(e)
          // 开始拖拽，记录抓取的元素  
          var id = e.target.id
          console.log('id-drag:' +id)
          e.dataTransfer.setData("id",id)
        },
        over (e) {
            e.preventDefault()            
        },
        showInfo(itemcol) {
            this.$message({
                type: 'success',
                showClose:true,
                message: itemcol
            })
        },
        create () {
            //判断长宽
            var reg=/^[0-9]+.?[0-9]*$/;
            if (reg.test(this.inputRow) && reg.test(this.inputCol)) {
                console.log('创建')
                this.bases = []
                for(var i=0;i<this.inputRow;i++){
                    var tmpbase=[]
                    for(var j=0;j<this.inputCol;j++){
                        tmpbase.push({row:j,col:i,id: this.idPre + this.globalId})
                        this.globalId = this.globalId + 1
                    }
                    this.bases.push(tmpbase)
                }
            }else {
                this.$message({
                    type: 'error',
                    showClose:true,
                    message: '不为数字，行数列数'
                })
            }
        },
        getAllMapBases () {
            map.getAllMapBases().then(res => {
                console.log('加载全部切片' + res)
                this.mapBases = res.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.article-create-map{
    min-width: 800px;
    min-height: 900px; 
    .container{
        display: flex;
        margin-top: 20px;
        .right{
            // min-height: 1000px;
            // width: 1000px;
            margin-left: 40px;
            display: flex;
            div{
                background-color: white;
                flex: 1;
                line-height: 100px;
                text-align: center;
                > div{
                    width: 100px;
                    height: 100px;
                    border-top:black 1px solid;
                }
            }
            > div:first-child {
                border-left:black 1px solid;
            }
            > div{
                border-bottom:black 1px solid;
                border-right:black 1px solid;
            }
        }
        .left{
            width: 200px;
            min-height: 100px;
            background-color: white;
        }
    }

    .header-init{
        display: flex;
        > .el-input{
            width: 200px;
        }
    }
}
</style>
