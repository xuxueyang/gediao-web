<template>
  <div style="margin-top:-20px;line-height:5px">
    <!-- 日期控件（默认今天，不选则显示全局）  添加 -->
    <!-- 搜索功能 ：按文字，按照标签 -->
    <!-- 表格： 下拉选择状态（根据状态不同，文字颜色会改变，同时已经完成的会沉底， -->
    <!-- 显示内容 -->
    <!-- 按钮：显示细节（笔记之类的） 删除 -->
    <!-- 标签 -->
    <div>
      <div style="margin-top:15px;margin-right:35px;float:right">
        <el-button @click="addEachShow()">添加便签</el-button>
      </div>
      <div style="float:left;margin-top:20px">
        <div>
          <!-- 搜索框，搜索全部文件的 -->
          <el-input placeholder="请输入内容" v-model="searchName" class="input-with-select"
                    style="width:200px;margin-left:0px;margin-bottom:20px;">
          </el-input>
          <el-button slot="append" icon="el-icon-search" @click="searchLog()" circle></el-button>
          <!-- 日期选择 -->
          <!-- 标签选择 -->
          <!-- 状态选择 -->
          <span style="margin-left:20px">便签状态:</span>
          <el-select v-model="select" slot="prepend" placeholder="请选择" @change="searchLog()">
            <el-option

              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left:20px">番茄工作法:</span>
          <el-select v-model="tomatoType" slot="prepend" placeholder="请选择" @change="searchLog()">
            <el-option

              v-for="item in tomatoOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <span style="margin-left:20px">标签:</span>
          <el-select v-model="selectTag" slot="prepend" placeholder="请选择" @change="searchLog()">
            <el-option

              v-for="item in tagOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="margin-bottom:18px;margin-top:5px">
          <div style="text-align:left">
            <span class="demonstration">日期范围:</span>
            <el-date-picker
              @onPick="searchLog()"
              v-model="rangeDate"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
        </div>
      </div>
      <div>
        <el-table
          border
          max-height="600"
          :data="tableDate"
          style="width: 98%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            label="状态"
            width="180">
            <template slot-scope="scope">
              <!-- :change="changeStatus(scope.row)" -->
              <el-select v-model="scope.row.status" placeholder="请选择便签状态" @change="changeStatus($event,scope.row)">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            prop="updatedDate"
            sortable
            label="更新日期"
            :formatter="formatter"
            width="180">
          </el-table-column>
          <el-table-column
            prop="title"
            sortable
            label="标题"

            width="180">
          </el-table-column>

          <el-table-column
            prop="message"
            label="消息">
          </el-table-column>
          <el-table-column
            prop="tomatoType"
            width="180"
            label="番茄工作法">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="showDetailDialog(scope.row)"
                type="text"
                size="small">
                细节
              </el-button>
              <el-button
                @click.native.prevent="updateEachShow(scope.row)"
                type="text"
                size="small">
                更新消息
              </el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.row)"
                type="text"
                size="small">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页的控件 -->
        <!-- <el-pagination
            :style="'margin-top:10px'"
            background
            :current-page="pageablePage"
            @current-change="currentChange"
            layout="prev, pager, next"
            :total="total">
        </el-pagination> -->
        <!-- 浮动显示更新 -->
        <!-- <el-dialog  :visible.sync="dialogDetail">
            <h2 style="margin-bottom:40px">详情</h2>
            集成富文本编辑器
                                <full-textarea v-bind:eachId="eachId" v-bind:detailId="detailId" :key='eachId+detailId'></full-textarea>

        </el-dialog> -->
      </div>
    </div>
    <div>
      <!-- 更新便签的：添加标签的基本操作啥的 -->
      <!-- 添加便签：所属日期（日期选择，不选则默认今天），标题，状态（可选，默认为未完成），类型 -->
      <el-dialog :visible.sync="addEach">
        <h2 style="margin-bottom:40px">创建消息日志</h2>
        <el-form :rules="eachRules" ref="form" :model="form" label-width="120px">
          <el-form-item label="消息标题:" prop="title">
            <el-input v-model="form.title" :maxlength="50" style="width:200px;float:left"
                      :placeholder="'最多50个字符'"></el-input>
          </el-form-item>
          <el-form-item label="消息类型:" style="width:100px;" prop="status">
            <el-select v-model="form.status" style="width:150px" placeholder="请选择消息类别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="番茄工作法:" style="width:100px;" >
            <el-select v-model="form.tomatoType" style="width:150px" placeholder="请选择消息类别">
              <el-option
                v-for="item in tomatoOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消息内容" prop="message">
            <el-input type="textarea"

                      v-model="form.message"
                      :autosize="true"
                      style="width:500px;float:left"
                      :placeholder="'最多不能输入200字符'"></el-input>
          </el-form-item>
          <el-form-item label="标签:" style="width:80%;height:80px">
            <template>
              <el-select
                style="width:100%;height:80px"
                v-model="form.tags"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择标签">
                <el-option
                  v-for="item in tagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item style="margin-top:20px">
            <el-button type="primary" @click="onCreateEach('form')">立即创建</el-button>
            <el-button @click="cancelAddEach">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 更新each的消息 -->
      <el-dialog :visible.sync="updateEach">
        <h2 style="margin-bottom:40px">更新</h2>
        <el-form :rules="eachRules" ref="updateform" :model="form" label-width="120px">
          <el-form-item label="消息标题:" prop="title">
            <el-input v-model="updateform.title" :maxlength="50" style="width:200px;float:left"
                      :placeholder="'最多50个字符'"></el-input>
          </el-form-item>
          <el-form-item label="番茄工作法:" style="width:100px;">
            <el-select v-model="updateform.tomatoType" style="width:150px" placeholder="请选择消息类别">
              <el-option
                v-for="item in tomatoOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消息类型:" style="width:100px;" prop="status">
            <el-select v-model="updateform.status" style="width:150px" placeholder="请选择消息类别">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="消息内容" prop="message">
            <el-input type="textarea"

                      v-model="updateform.message"
                      :autosize="true"
                      style="width:500px;float:left"
                      :placeholder="'最多不能输入200字符'"></el-input>
          </el-form-item>
          <el-form-item label="标签:" style="width:80%;height:80px">
            <template>
              <el-select
                style="width:100%;height:80px"
                v-model="updateform.tags"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请选择标签">
                <el-option
                  v-for="item in tagOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-form-item>
          <el-form-item style="margin-top:20px">
            <el-button type="primary" @click="onUpdateEach('updateform')">更新</el-button>
            <el-button @click="cancelUpdateEach">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import services from '@/api/file.services'

  export default {
    name: 'showLogEach',
    props: ['projectType'],
    components: {
      // fullTextarea
    },
    data() {
      return {
        // 添加便签
        focus: false,
        // eachId:'',
        // detailId:'',
        addEach: false,
        updateEach: false,
        // 暂时不管分页
        pageableSize: 50,
        pageablePage: 0,
        total: 100,
        openDetailArray: [],
        selectTag: '',
        form: {
          title: '',
          status: '',
          message: '',
          tomatoType: '',
          tags: []
        },
        updateform: {
          id: '',
          belongDate: '',
          tomatoType: '',
          title: '',
          status: '',
          message: '',
          tags: []
        },
        eachRules: {
          title: [
            { required: true, message: '请输入消息标题', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '请选择消息类型', trigger: 'change' }
          ],
          message: [
            { required: false, message: '请填写消息内容', trigger: 'blur' }
          ]
        },
        searchName: '',
        rangeDate: '',
        tomatoOptions: [
          { value: '紧急+重要', label: '紧急+重要' },
          { value: '紧急_不重要', label: '紧急_不重要' },
          { value: '不紧急_重要', label: '不紧急_重要' },
          { value: '慢慢做', label: '慢慢做' },
          { value: '未分类', label: '未分类' }

        ],
        tomatoType: '',
        // dialogDetail: false,
        messageDetail: false,
        tableDate: [],
        select: '',
        options: [],
        tagOptions: [
          // {
          //     label: '网站搭建',
          //     value: 'wzdj'
          // },
          // {
          //     label: '日志记录',
          //     value: 'rzjl'
          // },
        ],
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '昨天和今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '今天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        }
      }
    },
    mounted() {
      //获取token和用户信息（放在缓存中）
      //判断有没有登陆，判断有没有缓存的用户信息
      this.getLogEachs()
      this.getStatus()
      this.getTags()
      this.setRangeDate()

    },
    methods: {
      currentChange() {
        console.log('分页改变:' + this.pageablePage)
        this.getLogEachs()
      },
      setRangeDate() {
        // 默认带出今天的日志
        this.rangeDate = []
        const today = new Date()
        const num = 1
        const yDate = services.getOtherDate(today, -1)
        this.rangeDate.push(yDate)
        this.rangeDate.push(today)
      },
      tableRowClassName({ row, rowIndex }) {
        // console.log(rowIndex)
        // TODO 通过数据字典获取描述
        if (row.tomatoType === '紧急+重要') {
          return 'www-row'
        } else {
          if (row.status === '1') {
            return 'wwc-row'
          } else if (row.status === '2') {
            return 'wc-row'
          }
        }

        return ''
      },
      getTags() {
        // 得到全部的标签
        const token = services.getToken()
        const userId = services.getUserId()
        if (token && userId) {
          const url = '' + services.getServiceIp() + '/api/app/log/tags' + '?token=' + token + '&userId=' + userId
          this.$http.get(url, {}).then(function(res) {
            if (res.data.returnCode.startsWith('200')) {
              this.$message({
                type: 'success',
                showClose: true,
                message: services.getMessageByCode(res.data.returnCode)
              })
              // 赋值
              this.tagOptions.pop()
              this.tagOptions = []
              // 为了便于查找，添加个默认的
              this.tagOptions.push({
                label: '显示全部',
                value: 0
              })
              for (var i = 0; i < res.data.data.length; i++) {
                this.tagOptions.push({
                  label: res.data.data[i].name,
                  value: res.data.data[i].id
                })

              }

            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: services.getMessageByCode(res.data.returnCode)
              })
            }
          })
        } else {
          // 登录失效，转到登录页面
          this.$router.history.push('/gediao')
        }
      },
      getStatus() {
        const url = services.getGediaoMessageStatusUrl()
        this.$http.get(url, {}).then(function(res) {
          // 处理消息拉,没有就设置为默认
          if (res.data.returnCode.startsWith('200')) {
            // 返回
            const status = res.data.data
            // //加一个默认
            // this.options.push({
            //     type: "APP_GEDIAO_LOG_MESSAGE_STATUS",
            //     label : "显示全部",
            //     value : 0
            // })
            const statusDefault = [{
              value: '0',
              label: '显示全部',
              type: '0'
            }]
            for (var i = 0; i < status.length; i++) {
              this.options.push(status[i])
            }
            this.options.push(statusDefault[0])
          } else {
            const status = [{
              value: '0',
              label: '默认',
              type: '0'
            }]
            for (var i = 0; i < status.length; i++) {
              this.options.push(status[i])
            }
          }
        })
      },
      addEachShow() {
        this.addEach = true
      },
      updateEachShow(row) {
        this.updateEach = true
        // row赋值给updateform
        this.updateform.title = row.title
        this.updateform.message = row.message
        this.updateform.status = row.status
        this.updateform.tomatoType = row.tomatoType

        this.updateform.id = row.id
        this.updateform.belongDate = row.belongDate
        this.updateform.tags = []
        for (var key in row.tagMap) {
          this.updateform.tags.push(row.tagMap[key].name)
          // this.updateform.tags.push(
          //     {
          //         label:row.tagMap[key].name,
          //         value:row.tagMap[key].id
          //     }
          // )
        }
      },
      cancelAddEach() {
        this.addEach = false
      },
      cancelUpdateEach() {
        this.updateEach = false
      },
      changeStatus(event, row) {
        // 改变了each状态时，需要更新
        //创建each，自动添加一个数据（如果日期什么为空，还有归属日期）
        // console.log("row"+JSON.stringify(row))
        // console.log("_rw"+JSON.stringify(this.tableDate))
        // console.log("event"+event)
        // console.log("row"+row.status)

        if (row) {
          const token = services.getToken()
          const userId = services.getUserId()
          if (token && userId) {
            const url = '' + services.getServiceIp() + '/api/app/log/each'
            const body = {
              id: row.id,
              title: row.title,
              status: event,
              message: row.message,
              belongDate: row.belongDate,
              tags: row.tags,
              token: token,
              userId: userId
            }
            this.$http.post(url, body).then(function(res) {
              if (res.data.returnCode.startsWith('200')) {
                this.$message({
                  type: 'success',
                  showClose: true,
                  message: services.getMessageByCode(res.data.returnCode)
                })
                // this.getLogEachs()
              } else {
                this.$message({
                  type: 'error',
                  showClose: true,
                  message: services.getMessageByCode(res.data.returnCode)
                })
              }
            }).catch(function(res) {
              this.$message({
                type: 'error',
                showClose: true,
                message: '服务器正在抢修中~'
              })
            })
            this.addEach = false
          } else {
            this.$message({
              type: 'error',
              showClose: true,
              message: '登录失效'
            })
            this.$router.history.push('/gediao')
          }
        }

      },
      onUpdateEach() {
        // 创建each，自动添加一个数据（如果日期什么为空，还有归属日期）
        const token = services.getToken()
        const userId = services.getUserId()
        const today = services.getTodayDate()
        // 得到的是value，label没有给
        // console.log(this.form.tags)
        var tags = []
        for (var i = 0; i < this.updateform.tags.length; i++) {
          // console.log(i+":"+this.form.tags[i])
          tags.push(this.updateform.tags[i])
        }
        if (token && userId) {
          const url = '' + services.getServiceIp() + '/api/app/log/each'
          const body = {
            id: this.updateform.id,
            title: this.updateform.title,
            status: this.updateform.status,
            message: this.updateform.message,
            belongDate: this.updateform.belongDate,
            tomatoType: this.updateform.tomatoType,
            tags: tags,
            token: token,
            userId: userId
          }
          this.$http.post(url, body).then(function(res) {
            if (res.data.returnCode.startsWith('200')) {
              this.$message({
                type: 'success',
                showClose: true,
                message: services.getMessageByCode(res.data.returnCode)
              })
              this.updateform.id = ''
              this.updateform.belongDate = ''
              this.updateform.title = ''
              this.updateform.status = ''
              this.updateform.message = ''

              this.getLogEachs()
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: services.getMessageByCode(res.data.returnCode)
              })
            }
          }).catch(function(res) {
            this.$message({
              type: 'error',
              showClose: true,
              message: '服务器正在抢修中~'
            })
          })
          this.updateEach = false
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: '登录失效'
          })
          this.$router.history.push('/gediao')
        }

      },
      onCreateEach() {
        // 创建each，自动添加一个数据（如果日期什么为空，还有归属日期）
        const token = services.getToken()
        const userId = services.getUserId()
        const today = services.getTodayDate()
        // 得到的是value，label没有给
        // console.log(this.form.tags)
        var tags = []
        for (var i = 0; i < this.form.tags.length; i++) {
          // console.log(i+":"+this.form.tags[i])
          tags.push(this.form.tags[i])
        }
        if (token && userId) {
          const url = '' + services.getServiceIp() + '/api/app/log/each'
          const body = {
            title: this.form.title,
            status: this.form.status,
            message: this.form.message,
            tomatoType: this.form.tomatoType,
            belongDate: today,
            tags: tags,
            token: token,
            userId: userId
          }
          this.$http.put(url, body).then(function(res) {
            if (res.data.returnCode.startsWith('200')) {
              this.$message({
                type: 'success',
                showClose: true,
                message: services.getMessageByCode(res.data.returnCode)
              })
              this.form.title = ''
              this.form.status = ''
              this.form.message = ''

              this.getLogEachs()
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: services.getMessageByCode(res.data.returnCode)
              })
            }
          }).catch(function(res) {
            this.$message({
              type: 'error',
              showClose: true,
              message: '服务器正在抢修中~'
            })
          })
          this.addEach = false
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: '登录失效'
          })
          this.$router.history.push('/gediao')
        }

      },
      searchLog() {
        // console.log(this.select)
        this.getLogEachs()

      },
      getLogEachs() {
        const token = services.getToken()
        const userId = services.getUserId()
        if (token && userId) {
          var url = '' + services.getServiceIp() + '/api/app/log/eachs' + '?token=' + token + '&userId=' + userId
          console.log(this.rangeDate)
          if (this.rangeDate === '') {
            this.setRangeDate()
          }
          if (this.rangeDate != null && !isNaN(this.rangeDate[0]) && !isNaN(this.rangeDate[1])) {
            const startDate = services.transferZonetimedateToBelongDate(this.rangeDate[0])
            const endDate = services.transferZonetimedateToBelongDate(this.rangeDate[1])
            url = url + '&startDate=' + startDate + '&endDate=' + endDate
          }
          if (this.selectTag != null && this.selectTag != undefined && this.selectTag != 0 & this.selectTag != '0') {
            url = url + '&tagId=' + this.selectTag
          }
          if (this.select != null && this.select != undefined && this.select != 0 & this.select != '0') {
            url = url + '&type=' + this.select
          }
          url = url + '&searchContext=' + this.searchName
          // 塞入分页信息
          if (this.pageableSize && this.pageableSize != 0) {
            url = url + '&size=' + this.pageableSize + '&page=' + this.pageablePage
          } else {
            url = url + '&size=' + 100 + '&page=' + this.pageablePage
          }
          if (this.tomatoType !== '') {
            url += `&tomatoType=${this.tomatoType}`
          }
          //   url = url + "&size="+this.pageableSize+"&page="+this.pageablePage
          this.$http.get(url, {
            // 分页信息
            //   page: 0,
            //   size: 20
          }).then(function(res) {
            if (res.data.returnCode.startsWith('200')) {
              var map = res.data.data

              this.$message({
                type: 'success',
                showClose: true,
                message: services.getMessageByCode(res.data.returnCode)
              })
              this.total = map.totalPages
              // console.log(this.total)
              // this.pageableSize = map.numberOfElements
              this.tableDate = []
              // TODO 虽然服务器返回的是按照时间，但是对于已完成的优先级要更低，所以要对数组排序
              var arr = []
              for (var i = 0; i < map.data.length; i++) {
                arr.push(map.data[i])
              }
              for (var i = 0; i < arr.length; i++) {
                for (var j = i + 1; j < arr.length; j++) {
                  // 2是已完成，1是未完成
                  // console.log("————————")
                  // console.log("i:"+arr[i].status)
                  // console.log("j:"+arr[j].status)
                  if (arr[i].status === '2' && arr[j].status === '1') {
                    //交换两个
                    var tmp = arr[i]
                    arr[i] = arr[j]
                    arr[j] = tmp
                  }
                }
              }
              for (var i = 0; i < arr.length; i++) {
                this.tableDate.push(arr[i])
              }
              this.openDetailArray = []
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: services.getMessageByCode(res.data.returnCode)
              })
            }
          }).catch(function(res) {
            console.log(res)
            this.$message({
              type: 'error',
              showClose: true,
              message: '服务器正在抢修中~688'
            })
          })
        } else {
          this.$message({
            type: 'error',
            showClose: true,
            message: '登录失效'
          })
          this.$router.history.push('/gediao')
        }

      },
      showDetailDialog(row) {
        const eachId = row.id
        const object = row.appLogDetailDTOList[0]

        if (object == null || object == undefined) {
          // this.$router.push({
          //     path : '/gediao/detail',
          //     query: {
          //         'eachId': eachId,
          //     }
          // })
          // alert(window.location.origin + '/gediao/detail?eachId='+eachId)
          // 有个问题，直接跳转会有刷新问题--没有办法获取到最新的数据
          // 调用接口。获取到最新的
          // window.open(window.location.origin + '/#/gediao/detail?eachId='+eachId+'&detailId='+row.appLogDetailDTOList[0].id)
          if (!this.openDetailArray.includes(eachId)) {
            this.openDetailArray.push(eachId)
            window.open(window.location.origin + '/#/gediao/detail?eachId=' + eachId)
          } else {
            var url = '' + services.getServiceIp() + '/api/app/log/details' + '?token=' + services.getToken() + '&eachId=' + eachId
            this.$http.get(url, {
              // 分页信息
              //   page: 0,
              //   size: 20
            }).then(function(res) {
              if (res.data.returnCode.startsWith('200')) {
                services.removeElement(this.openDetailArray, eachId)
                // for(var i=0;i<this.openDetailArray.length;i++){
                //     if(eachId === this.openDetailArray ){
                //         this.openDetailArray[i]
                //     }
                // }
                row.appLogDetailDTOList = res.data.data
                if (row.appLogDetailDTOList[0] == null || row.appLogDetailDTOList[0] == undefined) {
                  window.open(window.location.origin + '/#/gediao/detail?eachId=' + eachId)
                } else {
                  window.open(window.location.origin + '/#/gediao/detail?eachId=' + eachId + '&detailId=' + row.appLogDetailDTOList[0].id)
                }
              }
            })
          }

        } else {
          // this.$router.push({
          //     path : '/gediao/detail',
          //     query: {
          //         'eachId': eachId,
          //         'detailId':object.id
          //     }
          // })
          window.open(window.location.origin + '/#/gediao/detail?eachId=' + eachId + '&detailId=' + object.id)
        }
        // this.$router.push({
        //     path: ,
        //     query:merge(this.$route.query,{'eachId':eachId,'detailId':detailId})
        // })
        // this.$router.push({
        //     path : '/gediao/detail',
        //     query: {
        //         'eachId': eachId,
        //         'detailId':detailId
        //     }
        // })
        // this.dialogDetail = true
        // 这里有个bug因为，创建的时候会each没有刷新，就算有，也不会显示..而是创建新的detail...所以应该在这边刷新（不过因为做页面切换了，所以不需要了）
        // this.getLogEachs()
      },
      showMessageDialog(row) {
        this.messageDetail = true
      },

      deleteRow(row) {
        //删除文件，逻辑删除
        this.$confirm('此操作将删除该便签, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (row.id == null || '' == row.id) {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            })
            this.getLogEachs()
          } else {
            const token = services.getToken()
            const userId = services.getUserId()
            if (token && userId) {
              const url = '' + services.getServiceIp() + '/api/app/log/each/' + row.id + '?token=' + token + '&userId=' + userId
              this.$http.delete(url, {}).then(function(res) {
                if (res.data.returnCode.startsWith('200')) {
                  this.$message('删除成功')
                  this.getLogEachs(false)
                } else {
                  this.$message('删除成功')
                }
              })
            } else {
              this.$message({
                type: 'error',
                showClose: true,
                message: '登录失效'
              })
              this.$router.history.push('/gediao')
            }
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            showClose: true,
            message: '已取消删除'
          })
        })

      },
      formatter(row, column) {
        // new Date('' + row.updatedDate)
        return (row.updatedDate + '').substring(0, 10) + ' : ' + (row.updatedDate + '').substring(11, 19)
        // return service.changeToBJTime(row.updatedDate);//.substring(0,10);
      }
    }
  }
</script>
<style>
  .el-table .wwc-row {
    background: rgb(253, 227, 227);
  }
  .el-table .www-row {
    background: rgb(227, 19, 19);
  }

  .el-table .wc-row {
    background: #f0f9eb;
  }
</style>

