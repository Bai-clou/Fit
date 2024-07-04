<template>
  <div>
    <div class="search">
      <el-input placeholder="请输入用户id查询" style="width: 200px" v-model="userid"></el-input>
      <el-input placeholder="请输入用户名查询" style="width: 200px; margin-left: 10px" v-model="name"></el-input>
      <el-button type="info" plain style="margin-left: 10px" @click="load(1)">查询</el-button>
      <el-button type="warning" plain style="margin-left: 10px" @click="reset">重置</el-button>
    </div>

    <div class="operation">
      <el-button type="danger" plain @click="delBatch">批量删除</el-button>
    </div>

    <div class="table">
      <el-table :data="tableData" strip @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="序号"  align="center" sortable></el-table-column>
        <el-table-column prop="userid" label="发布者ID" ></el-table-column>
        <el-table-column prop="name" label="发布者"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column label="帖子图集">
          <template v-slot="scope">
            <div style="display: flex; align-items: center">
              <el-image style="width: 50px; height: 50px; border-radius: 5px" v-if="scope.row.imgs"
                        :src="scope.row.bgimg" :preview-src-list="scope.row.imgs"></el-image>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="sharetime" label="发布时间"></el-table-column>


        <el-table-column label="操作" align="center" width="180">
          <template v-slot="scope">
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
  </div>
</template>

<script>
export default {
  name: "Share",
  data() {
    return {
      tableData: [],  // 所有的数据
      pageNum: 1,   // 当前的页码
      pageSize: 10,  // 每页显示的个数
      total: 0,
      name: null,
      userid: null,
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
    }
  },
  created() {
    this.$request.get('/share/selectAll').then(res => {
      res.data.forEach(item => {
        let date = new Date(item.sharetime);
        let year = date.getFullYear();
        let month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        item.sharetime=year+'-'+month+'-'+day+' '+hours+':'+minutes;
        item.imgs=JSON.parse(item.imgs);
      });
      console.log(res.data)
      this.tableData=res.data;
    })
  },
  methods: {
    del(id) {   // 单个删除
      this.$confirm('您确定删除吗？', '确认删除', {type: "warning"}).then(response => {
        this.$request.delete('/share/delete/' + id).then(res => {
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
        this.$request.delete('/share/delete/batch', {data: this.ids}).then(res => {
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
      this.$request.get('/share/selectPage', {
        params: {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          name: this.name,
          userid:this.userid,
        }
      }).then(res => {
        res.data?.list.forEach(item => {
          let date = new Date(item.sharetime);
          let year = date.getFullYear();
          let month = date.getMonth() + 1; // 月份从 0 开始，需要加 1
          let day = date.getDate();
          let hours = date.getHours();
          let minutes = date.getMinutes();
          item.sharetime=year+'-'+month+'-'+day+' '+hours+':'+minutes;
          item.imgs=JSON.parse(item.imgs);
        });
        this.tableData = res.data?.list
        this.total = res.data?.total
      })
    },
    reset() {
      this.userid = null
      this.name=null
      this.load(1)
    },
    handleCurrentChange(pageNum) {
      this.load(pageNum)
    },
  }
}
</script>

<style scoped>

</style>