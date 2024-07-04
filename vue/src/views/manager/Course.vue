<template>
  <div>
    <div class="search">
      <el-input placeholder="请输入课程名查询" style="width: 200px" v-model="title"></el-input>
      <el-button type="info" plain style="margin-left: 10px" @click="load(1)">查询</el-button>
      <el-button type="warning" plain style="margin-left: 10px" @click="reset">重置</el-button>
    </div>

    <div class="operation">
      <el-button type="primary" plain @click="handleAdd">新增</el-button>
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>

    <div class="table">
      <el-table :data="tableData" strip @selection-change="handleSelectionChange" :custom-sort="customSort">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="序号" width="70" align="center"></el-table-column>
        <el-table-column prop="title" label="课程名"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="uploader" label="上传者"></el-table-column>
        <el-table-column prop="grade" label="等级"></el-table-column>
        <el-table-column prop="time" label="时间"></el-table-column>
        <el-table-column prop="part" label="部位"></el-table-column>

        <el-table-column label="预览图">
          <template v-slot="scope">
            <div style="display: flex; align-items: center">
              <el-image style="width: 50px; height: 50px; border-radius: 5px" v-if="scope.row.bgimg"
                        :src="scope.row.bgimg" :preview-src-list="[scope.row.bgimg]"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="180">
          <template v-slot="scope">
            <el-button size="mini" type="primary" plain @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" plain @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination">
        <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="pageNum"
            :page-sizes="[5, 10, 20]"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog :visible.sync="formVisible" title="课程" width="40%" :close-on-click-modal="false" destroy-on-close>
      <el-form :model="form">
        <el-form-item label="课程名" label-width="100px">
          <el-input v-model="form.title" placeholder="请输入课程名"></el-input>
        </el-form-item>
        <el-form-item label="课程类型" label-width="100px">
          <el-select v-model="form.type" placeholder="请选择" style="width: 120px;margin-right: 20px">
            <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          课程等级<el-select v-model="form.grade" placeholder="请选择" style="width: 120px;margin-left: 10px">
            <el-option
                v-for="item in grades"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="训练部位" label-width="100px">
          <el-select v-model="form.part" placeholder="请选择">
            <el-option
                v-for="item in parts"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程时间(分钟)" label-width="120px" >
          <el-input v-model="form.time" placeholder="请输入时间" style="width: 100px;margin-right: 20px"></el-input>
          课程消耗(千卡)<el-input v-model="form.consume" placeholder="请输入消耗" style="width: 100px;margin-left: 10px"></el-input>
        </el-form-item>
        <el-form-item label="课程介绍" label-width="100px" >
          <el-input type="textarea" :rows="2" placeholder="请输入介绍" v-model="form.introduction"></el-input>
        </el-form-item>
        <el-form-item label="预览图" style="margin-left: 45px">
          <el-upload
              class="avatar-uploader"
              :action="$baseUrl + '/files/upload'"
              :headers="{ token: user.token }"
              :file-list="form.bgimg? [form.bgimg] : []"
              list-type="picture"
              :on-success="handleAvatarSuccess"
          >
            <el-image style="width: 100px; height: 100px; border-radius: 5px"
                      :src="form.bgimg" v-if="form.bgimg"></el-image>
            <el-button type="primary" style=" " v-else>上传预览图</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="课程视频" style="margin-left: 45px">
          <div class="editPage__video">
            <div class="img__con">
              <el-upload
                  class="avatar-uploader"
                  :action="$baseUrl + '/files/upload'"
                  :show-file-list="false"
                  :on-success="handleVideoSuccess"
                  :before-upload="beforeAvatarUpload"
                  :on-progress="uploadVideoProcess"
              >
                <video width="100%" v-if="form.video" controls="controls" :key="menuKey">
                  <source :src="form.video" type="video/mp4" />
                </video>
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <el-progress
                    v-if="videoFlag === true"
                    type="line"
                    :percentage="videoUploadPercent"
                    style="margin-top: 30px"
                ></el-progress>
              </el-upload>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "Course",
  data() {
    return {
      tableData: [],  // 所有的数据
      pageNum: 1,   // 当前的页码
      pageSize: 10,  // 每页显示的个数
      total: 0,
      title: null,
      formVisible: false,
      form: {},
      ids: [],
      types:[{
        value: '户外跑步',
        label: '户外跑步'
      }, {
        value: '跳绳燃脂',
        label: '跳绳燃脂'
      }, {
        value: '热身放松',
        label: '热身放松'
      }, {
        value: '健身操',
        label: '健身操'
      }, {
        value: '瑜伽',
        label: '瑜伽'
      }, {
        value: '单车燃脂',
        label: '单车燃脂'
      }, {
        value: '拉伸',
        label: '拉伸'
      }, {
        value: '器械训练',
        label: '器械训练'
      }, {
        value: '助眠冥想',
        label: '助眠冥想'
      }],
      grades:[{
        value:'K1零基础',
        label:'K1零基础'},{
        value:'K2初学',
        label:'K2初学'},{
        value:'K3进阶',
        label:'K3进阶'},{
        value:'K4强化',
        label:'K4强化'},{
        value:'K5挑战',
        label:'K5挑战'}],
      parts:[{
        value:'全身',
        label:'全身'
      },{
        value:'胸部',
        label:'胸部'
      },{
        value:'腹部',
        label:'腹部'
      },{
        value:'背部',
        label:'背部'
      },{
        value:'手臂',
        label:'手臂'
      },{
        value:'腿部',
        label:'腿部'
      },{
        value:'腰部',
        label:'腰部'
      },{
        value:'肩部',
        label:'肩部'
      },{
        value:'臀部',
        label:'臀部'
      },{
        value:'颈部',
        label:'颈部'
      },{
        value:'脸部',
        label:'脸部'
      },],
      user: JSON.parse(localStorage.getItem('xm-user') || '{}'),
      uploadImgData: { busiName: 32 },
      // 应付多个组件的情况 记录当前组件的key值
      componentKey: null,
      menuKey: 1, // 用来强制刷新
      videoFlag: false,  // 进度条相关的
      videoUploadPercent: 0,  // 进度条相关的
    }
  },
  created() {
    this.$request.get('/course/selectAll').then(res => {
      this.tableData = res.data
    })
    // this.load(1)
  },
  methods: {
    handleAdd() {   // 新增数据
      this.form = {}  // 新增数据的时候清空数据
      this.formVisible = true   // 打开弹窗
    },
    handleEdit(row) {   // 编辑数据
      this.form = JSON.parse(JSON.stringify(row))  // 给form对象赋值  注意要深拷贝数据
      this.formVisible = true   // 打开弹窗
    },
    save() {   // 保存按钮触发的逻辑  它会触发新增或者更新
      this.form.uploader=this.user.name;
      this.form.uploaderavatar=this.user.avatar;
      this.form.comments='[]';
      console.log(this.form)
          this.$request({
            url: this.form.id ? '/course/update' : '/course/add',
            method: this.form.id ? 'PUT' : 'POST',
            data: this.form
          }).then(res => {
            if (res.code === '200') {  // 表示成功保存
              this.$message.success('保存成功')
              this.load(1)
              this.formVisible = false
            } else {
              this.$message.error(res.msg)  // 弹出错误的信息
            }
          })

    },
    del(id) {   // 单个删除
      this.$confirm('您确定删除吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/course/delete/' + id).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    handleSelectionChange(rows) {   // 当前选中的所有的行数据
      this.ids = rows.map(v => v.id)
    },
    delBatch() {   // 批量删除
      if (!this.ids.length) {
        this.$message.warning('请选择数据')
        return
      }
      this.$confirm('您确定批量删除这些数据吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/course/delete/batch', {data: this.ids}).then(res => {
          if (res.code === '200') {   // 表示操作成功
            this.$message.success('操作成功')
            this.load(1)
          } else {
            this.$message.error(res.msg)  // 弹出错误的信息
          }
        })
      }).catch(() => {
      })
    },
    load(pageNum) {  // 分页查询
      if (pageNum) this.pageNum = pageNum
      this.$request.get('/course/selectPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          title: this.title,
        }
      }).then(res => {
        this.tableData = res.data?.list
        this.total = res.data?.total
      })
    },
    reset() {
      this.title = null
      this.load(1)
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum)
    },
    handleAvatarSuccess(response, file, fileList) {
      // 把头像属性换成上传的图片的链接
      this.form.bgimg = response.data
    },
    handleVideoSuccess(response, file) {
      // 进度条恢复到初始状态
      this.videoFlag = false;
      this.videoUploadPercent = 0;
      ++this.menuKey;
      this.form.video = response.data;
      this.isupvideo=true;
    },
    beforeAvatarUpload(file) {
      const isMp4 = file.type === "video/mp4";
      // 限制文件最大不能超过 300M
      const isLt2M = file.size / 1024 / 1024 < 300;

      if (!isMp4) {
        this.$message.error("视频只能是mp4格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 300MB!");
      }
      return isMp4 && isLt2M;
    },

    //进度条
    uploadVideoProcess(event, file, fileList) {
      this.videoFlag = true;
      this.videoUploadPercent = parseInt(file.percentage);
    },
  }
}
</script>

<style scoped>
.editPage__video {

  .avatar-uploader-icon {
    font-size: 16px;
    color: #8c939d;
    width: 350px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
</style>