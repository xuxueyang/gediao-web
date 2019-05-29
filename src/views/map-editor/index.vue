<template>
    <div>
    <!-- 左边显示图片列表，可以上下点击浏览，也可以滚轮浏览 ，右边显示一个可以配置的，大小自己定义，宽高定死，然后百分比来，js写配置，css活学活用那本书~！-->

    <article class="map-editor">
        <div class="left-images">
          <aside>
            <nav>
                <h2>构建自己的地图</h2>
                <ul class="nav-ul">
                    <li>
                        <a @click="setIndex('mapbase')">上传图片切面</a>
                    </li>
                    <li>
                        <a @click="setIndex('mapeditor')">编辑地图</a>
                    </li>
                </ul>
            </nav>
          </aside>
        </div>
        <div class="right-content">
            <h1 v-if="index === ''">不存在的模块</h1>
            <mapbase v-else-if="index === 'mapbase'"></mapbase>
            <mapeditor v-else-if="index === 'mapeditor'"></mapeditor>
            <h1 v-else>不存在的模块</h1>
        </div>        
    </article>


    </div>
</template>

<script>
import mapbase from './components/mapbase'
import mapeditor from './components/mapeditor'

export default {
    components: {
        mapbase,
        mapeditor
    },
    data () {
      return {
          index: 'mapbase',
      }
    },
    methods: {
        setIndex(index) {
            this.index = index
        }
    }
}
</script>

<style lang="scss" scoped>
.map-editor {
    display: flex;
    .left-images{
        width: 300px;
        .nav-ul li{
            list-style: none;
            background-color: #8e8a8a;
            color: white;
            /* height: 30px; */
            font-size: 20px;
            line-height: 40px;
            border: black 1px solid;
            margin-top: 5px;
        }
    }
    .right-content{
        flex: 1;
        margin-left: 10px;
    }
}
</style>

