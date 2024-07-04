<template>
	<view style="padding: 20rpx;">
		<view class="box">
			<uni-forms :modelValue="form" :rules="rules" ref="formRef" label-width="140rpx" label-align="right">
				<uni-forms-item label="头像" name="avatar">
					<uni-file-picker limit="1" :image-styles="imageStyles" :del-icon="false" :disable-preview="true"
						fileMediatype="image" v-model="avatar" @select="handleAvatarUploadSuccess"></uni-file-picker>
				</uni-forms-item>
				<uni-forms-item label="用户名" name="username">
					<uni-easyinput type="text" v-model="form.username" placeholder="" disabled />
				</uni-forms-item>
				<uni-forms-item label="姓名" name="name">
					<uni-easyinput type="text" v-model="form.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="性别" name="sex">    
					<uni-data-checkbox style="position: relative; top: 10rpx;" v-model="form.sex" :localdata="range"></uni-data-checkbox>
				</uni-forms-item>
				<uni-forms-item label="电话" name="phone">
					<uni-easyinput type="text" v-model="form.phone" placeholder="请输入电话" />
				</uni-forms-item>
				<uni-forms-item label="简介" name="info">
					<uni-easyinput type="textarea" v-model="form.info" placeholder="请输入主页简介" />
				</uni-forms-item>
				<uni-forms-item>
					<button type="primary" size="mini" @click="save">保 存</button>
				</uni-forms-item>
			</uni-forms>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar:[],
				form: {},
				user: uni.getStorageSync('xm-user'),
				imageStyles: {
					"height": 80, // 边框高度
					"width": 80, // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "50%" // 边框圆角，支持百分比
					}
				},
				range: [
					{ text: '男', value: '男' },
					{ text: '女', value: '女' },
					{ text: '神秘', value: '神秘'}
				]
			}
		},
		onLoad() {
			this.form = JSON.parse(JSON.stringify(this.user))
			this.avatar = [{
				url: this.user.avatar
			}]
		},
		methods: {
			save() {
				this.$request.put('/user/update', this.form).then(res => {
					if (res.code === '200') {
						uni.showToast({
							icon: "success",
							title: '操作成功'
						})
					uni.setStorageSync('xm-user', this.form)  // 更新浏览器缓存的用户信息	
					} else {
						uni.showToast({
							icon: "error",
							title: res.msg
						})
					}
				})
			},
			handleAvatarUploadSuccess(e) {
				let _this = this
				const filePath = e.tempFilePaths[0]
				uni.uploadFile({
					url: _this.$baseUrl + '/files/upload',
					filePath: filePath,
					name: "file",
					success(res) {
						console.log(res)
						let url = JSON.parse(res.data || '{}').data
						_this.form.avatar = url
					}
				})
			},
		}
	}
</script>

<style>
	.box{
		padding: 20rpx; 
		margin: 80rpx 0; 
		background-color: #fff; 
		box-shadow: 0 2rpx 10rpx rgba(0,0,0,.1); 
		border-radius: 10rpx;
	}
</style>