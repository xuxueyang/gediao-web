<template>
<div>
    <el-button @click="addBlog()">添加博客</el-button>
    <ul>
        <li v-for="blog in blogs" v-bind:key="blog.id">
            <div>
                <span>{{blog.title}}</span>
                <a @click="updateBlog(blog.id)">查看编辑</a>
            </div>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    name: 'blog-manager',
    data() {
        return {
            blogs: [{
                title: '测试博客1',
                id: '1',
                createDate: '',
                updateDate: '',
                readCount: 4,
            },{
                title: '测试博客2',
                id: '2',
                createDate: '',
                updateDate: '',
                readCount: 4,
            },{
                title: '测试博客3',
                id: '3',
                createDate: '',
                updateDate: '',
                readCount: 4,
            }
            ]
        }
    },
    methods:{
        getAllBlog() {
            // 获取到所有的博客

        },
        addBlog() {
            // 跳转到新增页面
            this.$router.push(
                {path: '/gediao/blog'}
            )
        },
        updateBlog(id) {
            // 跳转到编辑页面（和新增页面一样，区别在于，如果没有，会创建）（带有查询ID，如果没有，则视为创建)
            this.$router.push(
                {path: '/gediao/blog?blogId=' + id}
            )
        }
    }
}
</script>
<style scoped>

</style>
