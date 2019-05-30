<template>
    <div>
         <el-select
            style="width:200px;"
            v-model="item.key"
            filterable
            allow-create
            default-first-option
            placeholder="请选择输入key值">
            <el-option
                v-for="item in KeyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
        </el-select>
        <el-input class="inputName" v-model="item.value" placeholder="请选择输入value值"></el-input>
        <el-button type="success" icon="el-icon-check" circle @click="saveSelf" style="margin-left:10px"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteSelf"></el-button>
<!-- 
        <el-select
            v-model="value"
            filterable
            allow-create
            default-first-option
            placeholder="请选择输入key值">
        </el-select> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            key:'',
            value:''
        }
    },
    methods: {
        deleteSelf () {
            console.log('deleteSlefId' + this.item.id)
            this.$emit('deleteSelf', this.item.id)
        },
        saveSelf () {
            const info = {
                id: this.item.id,
                key: this.item.key,
                value: this.item.value
            }
            this.$emit('saveSelf', info)
        }
    },
    props:{
        item: {
            required: true
        },
        KeyOptions:{
            default: [],
            required: false
        }
    }
}
</script>

<style lang="scss" scoped>
.inputName{
    width: 300px;
}
</style>

