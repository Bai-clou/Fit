<template>
  <view class="container">
    <uni-forms ref="courseForm" :model="form">
      <uni-forms-item label="课程名" name="courseName" required>
        <uni-easyinput v-model="form.title" placeholder="请输入课程名" />
      </uni-forms-item>
      
      <uni-forms-item label="课程类型" name="courseType" required>
        <uni-data-select v-model="form.type" :localdata="courseTypes" placeholder="请选择课程类型" />
      </uni-forms-item>
      
      <uni-forms-item label="课程介绍" name="courseDescription" required>
        <uni-easyinput v-model="form.introduction" type="textarea" placeholder="请输入课程介绍" />
      </uni-forms-item>
      
      <uni-forms-item label="课程时间（分钟）" name="courseTime" required>
        <uni-easyinput v-model="form.time" type="number" placeholder="请输入课程时间" />
      </uni-forms-item>
      
      <uni-forms-item label="课程难度" name="courseDifficulty" required>
        <uni-data-select v-model="form.grade" :localdata="courseDifficulties" placeholder="请选择课程难度" />
      </uni-forms-item>
      
      <uni-forms-item label="训练部位" name="courseBodyPart" required>
        <uni-data-select v-model="form.part" :localdata="courseBodyParts" placeholder="请选择训练部位" />
      </uni-forms-item>
      
      <uni-forms-item label="消耗量" name="courseCalories" required>
        <uni-easyinput v-model="form.consume" placeholder="请输入课程消耗量" />
      </uni-forms-item>
      
      <uni-forms-item label="预览图" name="courseImage" required>
        <uni-file-picker 
          :file-mediatype="'image'" 
          :limit="1" 
          @select="handleImageChange" 
        />
      </uni-forms-item>
      
      <uni-forms-item label="课程视频" name="courseVideo" required>
        <view v-if="!form.video">
          <uni-file-picker 
            :file-mediatype="'video'" 
            :limit="1" 
            @select="handleVideoChange" 
          />
        </view>
        <view v-else class="video-container">
          <video :src="form.video" controls class="video-player"></video>
          <uni-icons type="close" @click="deleteVideo" color="white" size="30" class="close-icon"></uni-icons>
        </view>
      </uni-forms-item>
      
      <view class="button-group">
        <button type="primary" @click="submitForm">上传</button>
      </view>
    </uni-forms>
  </view>
</template>

<script>
	import apiConfig from '@/config.js'
export default {
  data() {
    return {
      form: {bgimg:'',video:'',uploader:uni.getStorageSync('xm-user').username,uploaderavatar:uni.getStorageSync('xm-user').avatar,comments:'[]'},
      courseTypes: [{value: '户外跑步',text: '户外跑步'}, 
			{value: '跳绳燃脂',text: '跳绳燃脂'}, 
			{value: '热身放松',text: '热身放松'}, 
			{value: '健身操',text: '健身操'}, 
			{value: '瑜伽',text: '瑜伽'}, 
			{value: '单车燃脂',text: '单车燃脂'}, 
			{value: '拉伸',text: '拉伸'},
			{value: '器械训练',text: '器械训练'}, 
			{value: '助眠冥想',text: '助眠冥想'}],
      courseDifficulties: [{value:'K1零基础',text:'K1零基础'},
			{value:'K2初学',text:'K2初学'},
			{value:'K3进阶',text:'K3进阶'},
			{value:'K4强化',text:'K4强化'},
			{value:'K5挑战',text:'K5挑战'}],
      courseBodyParts: [{value:'全身',text:'全身'},
			 {value:'胸部',text:'胸部'},
			 {value:'腹部',text:'腹部'},
			 {value:'背部',text:'背部'},
			 {value:'手臂',text:'手臂'},
			 {value:'腿部',text:'腿部'},
			 {value:'腰部',text:'腰部'},
			 {value:'肩部',text:'肩部'},
			 {value:'臀部',text:'臀部'},
			 {value:'颈部',text:'颈部'},
			 {value:'脸部',text:'脸部'}]
    };
  },
  methods: {
    handleImageChange(e) {
		let that = this
		const filePath = e.tempFilePaths[0]
		uni.uploadFile({
			url: `${apiConfig.dev.baseUrl}/files/upload`,
			filePath: filePath,
			name: "file",
			formData: {
			    token: uni.getStorageSync('xm-user').token
			},
			success(res) {
				console.log(JSON.parse(res.data).data)
				that.form.bgimg=JSON.parse(res.data).data
			}
		})
    },
    handleVideoChange(e) {
		let that = this
		const filePath = e.tempFilePaths[0]
		uni.uploadFile({
			url: `${apiConfig.dev.baseUrl}/files/upload`,
			filePath: filePath,
			name: "file",
			formData: {
			    token: uni.getStorageSync('xm-user').token
			},
			success(res) {
				that.form.video=JSON.parse(res.data).data
			}
		})
    },
    deleteVideo() {
      this.form.video = '';
    },
    submitForm() {
	  this.$refs.courseForm.validate().then(valid => {
	          if (valid) {
				this.$request.post('/course//add', this.form).then(res => {
					console.log(res)
					if(res.code==='200'){
						uni.showToast({
						  title: '上传成功',
						  icon: 'success'
						});
					}
					
				})
	            
	          } else {
	            uni.showToast({
	              title: '请填写所有必填项',
	              icon: 'none'
	            });
	          }
	        });
   
    },
  }
};
</script>

<style>
.container {
  padding: 20px;
  margin: 0 auto;
  width: 90%;
  box-sizing: border-box;
}
.button-group {
  text-align: center;
  margin-top: 20px;
}
.video-container {
  position: relative;
  width: 100%;
}
.video-player {
  width: 100%;
}
.close-icon {
  position: absolute;
  top: 0px;
  right: 0px;
}
.uni-forms-item__label{
	padding: 0 7px 0 0 !important;
}
</style>
