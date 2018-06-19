<template>
    <div style="width:800px; margin-left:auto; margin-right:auto;">
        发起资源申请
        <!-- list列表选择申请:申请人，申请时间、申请类型（QUEID）（目前前台写好下拉，供选择），表单数据（表单类型，表单的值）——List -->
        <!-- 选选择类型，然后根据选择的类型进入下一栏目 -->
        <el-steps :active="active" align-center style="margin-top:20px">
            <el-step title="选择申请的资源类型" description="步骤1"></el-step>
            <el-step title="填写申请表" description="步骤2"></el-step>
            <el-step title="等待夏夜对你的邀请" description="步骤3"></el-step>
        </el-steps>
        <div style="margin-top:80px">
            <div v-if="active==0">
                <!-- 下拉选择资源 -->
                <el-select v-model="type" placeholder="请选择" style="width:400px">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                            </div>
            <div v-if="active==1">
                <!-- 填写表单:申请人，申请备注（必填面板，没空的时间 -->
                <!-- 后期可以支持动态表单配置，专门有个页面可以构造动态表单， -->
                <qlh-apply-105-ask 
                    v-on:Next="Next"
                    v-if="type=='APPLY_105_ASK'" 
                    ref="childForm">
                </qlh-apply-105-ask>
                <qlh-apply-week-battle-gu 
                    v-on:Next="Next"
                    v-if="type=='APPLY_WEEK_BATTLE_GU'" 
                    ref="childForm">
                </qlh-apply-week-battle-gu>
                <qlh-apply-105-gu 
                    v-on:Next="Next"
                    v-if="type=='APPLY_105_GU'" 
                    ref="childForm">
                </qlh-apply-105-gu>
            </div>
            <div v-if="active==2">
                <!-- 显示文案 -->
                <div style="margin-top:80px;">
                    恭喜你成功向夏夜gaygay发出py申请~~~
                </div>
            </div>
        </div>
        <div style="margin-top:50px;">
            <!-- 上一步下一步的按钮 -->
            <el-button style="margin-left:200px;float:left" v-if="active>0" @click="Pre" >上一步</el-button>
            <el-button style="margin-right:200px;float:right" v-if="active<1" @click="Next">下一步</el-button>
            <el-button style="margin-right:200px;float:right" v-if="active==1" @click="postAsk">发起申请</el-button>
            <!-- 发起申请调用子节点的方法，然后如果成功则进入下一步 -->
            <el-button style="margin-right:200px;float:right" v-if="active==2" @click="First" >返回</el-button>

        </div>
    </div>
</template>

<script>
import  qlhApply105Ask from './qlh-apply/qlh-apply-105-ask.vue'
import  qlhApplyWeekBattleGu from './qlh-apply/qlh-apply-week-battle-gu.vue'
import  qlhApply105Gu from './qlh-apply/qlh-apply-105-gu.vue'

export default {
    name:'qlh-resource-apply',
    // props:["active"],
    data() {
        return {
            active: 0,
            projectType: 'QLH',
            type: 'APPLY_105_ASK',
            options: [
                {
                    value: 'APPLY_105_ASK',
                    label: '105团申请'
                }, 
                {
                    value: 'APPLY_WEEK_BATTLE_GU',
                    label: '帮战请假申请'
                },
                {
                    value: 'APPLY_105_GU',
                    label: '105团请假'
                }
                ],
            value: ''
        }
    },
    mounted() {
    },
    methods: {
        Pre() {
            if (this.active > 0 ) this.active--;
        },
        Next() {
            if (this.active < 2) this.active++;
        },
        First() {
            this.active = 0;
        },
        postAsk() {
            this.$refs.childForm.postAsk()//通过$refs找到子组件，并找到方法执行
        }
    },
    components:{
        qlhApply105Ask,
        qlhApplyWeekBattleGu,
        qlhApply105Gu,
    }
}
</script>

