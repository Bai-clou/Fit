<template>
	<view class="content">
		<view class="container">
			<!-- 输入框 -->
			<uni-easyinput type="text" v-model="form.title" placeholder="请输入标题" maxlength="20" :inputBorder="false"
			 style="height: 200rpx;font-size: 18px;"/>
			<view style="width: 100%;height: 1px;background-color: #eaeaea;margin-bottom: 40rpx;"></view>
			<textarea placeholder="想说什么就说什么叭- -" @blur="inputBlur" :focus="inputFocus" :auto-height="true"
				:show-confirm-bar="false" maxlength="1500" v-model="form.content" class="post-txt"></textarea>

			<!-- 上传图片or视频 -->
			<view class="img-list">
				<view v-for="(item,index) in form.imageList" :key='index' class="img-list-box">
					<image v-if="!video" :src="item" class="img-item" @tap="imgTypeSelect(item)"></image>
					<video v-else :src="item" @longpress="videoTypeSelect(item)"></video>
				</view>
				<view v-if="form.imageList.length < 9 && !video" class="icon-camera" @tap="selectType">
					<uni-icons type="camera-filled" size="27" color=#D3D4D6></uni-icons>
				</view>
			</view>

			<!-- 选择位置 -->
			<view @click="chooseLocation" class="choose-location">
				<u-icon name="map" size="30rpx"></u-icon>
				<text class="txt">{{ form.address || '你在哪里?' }}</text>
			</view>
		</view>
		<!-- 选择板块 -->

		<!-- 底部确定按钮 -->
		<view @click="clickCreate" class="yue-base-button">
			<view>确定发布~</view>
		</view>
	</view>
</template>


<script>
	import apiConfig from '@/config.js'
	export default {
		data() {
			return {
				// 默认输入框获得焦点
				inputFocus: true,
				form: {
					title:'',
					content: '',
					address: '',
					imageList: [],
				},		
				video: '',
			}
		},

		methods: {
			uploadImage(filePath) {
			   return new Promise((resolve, reject) => {
			      uni.uploadFile({
			        url: `${apiConfig.dev.baseUrl}/files/upload`,
			        filePath: filePath,
			        name: 'file',
					formData: {
					    token: uni.getStorageSync('xm-user').token
					},
			        success: function(res) {
			          const result = JSON.parse(res.data);
			          resolve(result.data);
			        },
			        fail: function(err) {
			          console.error('上传失败', err);
			          reject(err);
			        }
			      });
			    });
			},
			// 选择媒体类型
			selectType() {
				let that = this
				let itemL = that.form.imageList.length!=0 ? !that.form.imageList.video ? ['拍照', '从相册选择照片']: '' : ['拍照', '从相册选择照片', '从相册选择视频']
				uni.showActionSheet({
					itemList: itemL,
					success: function(res) {
						if (res.tapIndex == 0) {
							uni.chooseImage({
								sourceType: ['camera'], // 拍照选择
								success: function(res) {
									const tempFilePaths = res.tempFilePaths;
									that.uploadImage(tempFilePaths[0])
									  .then(uploadedPath => {
										this.form.imageList.push(uploadedPath);
									  })
									  .catch(error => {
										console.error('图片上传失败', error);
									  });
								}
							});
						}
						if (res.tapIndex == 1) {
							uni.chooseImage({
								count: 9 - that.form.imageList.length,
								sourceType: ['album'], //从相册选择
								success: function(res) {
									const tempFilePaths = res.tempFilePaths;
									const uploadPromises = tempFilePaths.map(filePath => that.uploadImage(filePath));
									Promise.all(uploadPromises)
									  .then(uploadedPaths => {
										console.log('所有图片上传完成', uploadedPaths);
										uploadedPaths.forEach(imgPath => {
										  that.form.imageList.push(imgPath);
										});
									  })
									  .catch(error => {
										console.error('图片上传失败', error);
									  });
									
								}
							});
						}
						if (res.tapIndex == 2) {
							uni.chooseVideo({
								sourceType: ['album'], // 从相册选择视频
								success: function(res) {
									if (res.size > 20971520) {
										uni.showToast({
											title: "视频文件过大",
											duration: 2000
										});
										return;
									}
									const tempFilePath = res.tempFilePath;
									that.uploadImage(tempFilePath)
									  .then(uploadedPath => {
										that.video = true; 
										that.form.imageList.push(uploadedPath);
									  })
									  .catch(error => {
										console.error('视频上传失败', error);
									  });
									
								}
							});
						}
					}
				});
			},

			// 图片状态选择
			imgTypeSelect(item) {
				let that = this
				uni.showActionSheet({
					itemList: ['预览', '删除'],
					success: function(res) {
						if (res.tapIndex == 0) {
							uni.previewImage({
								current: item,
								urls: that.form.imageList
							})
						}
						if (res.tapIndex == 1) {
							let index = that.form.imageList.findIndex(url => url === item);
							if (index !== -1) {
								that.form.imageList.splice(index, 1);
							}
						}
					}
				});
			},
			
			// 视频状态选择
			videoTypeSelect(item){
				let that=this
				uni.showActionSheet({
					itemList: ['删除'],
					success: function(res) {
						if (res.tapIndex == 0) {
							let index = that.form.imageList.findIndex(url => url === item);
							if (index !== -1) {
								that.form.imageList.splice(index, 1);
							}
							that.video=false
						}
					}
				});
			},

			// 文字内容
			inputBlur(event) {
				this.inputCursor = event.detail.cursor;
				this.inputFocus = false;
			},

			// 位置选择
			chooseLocation() {
				let that = this;
				uni.chooseLocation({
					success: function(res) {
						that.form.address = res.name;
					}
				});
			},

			// 发布
			clickCreate() {
				console.log(this.form);
				if (!this.form.content) {
					uni.showToast({
						title: "请输入内容噢",
						icon: "error"
					})
					return;
				}
				let form=this.form
				let user=uni.getStorageSync('xm-user')
				let time=new Date();
				let data={
					userid:user.id,
					title:form.title,
					bgimg:form.imageList[0],
					imgs: JSON.stringify(form.imageList),
					content:form.content,
					sharetime:time,
					avatar:user.avatar,
					name:user.username,
					address:form.address,
					comments:'[]',
					subscriber:'[]',
					likesuser:'[]'
				}
				console.log(data)
				this.$request.post("/share/add",  data).then(res=> {
					if (res.code === '200') {
						uni.showToast({
							title: '发布成功',
							duration: 1500,
							mask: true
						});
						setTimeout(() => {
							uni.switchTab({
								url: '/pages/index/index'
							});
						}, 1500)
					}
				})
			},
		}
	}
</script>


<style lang="scss" scoped>
	.content {
		height: 100vh;
		background-color: #FFFFFF;
		border-radius: 30upx 30upx 0upx 0upx;
	}

	.container {
		padding: 20rpx 40rpx;
		overflow: hidden;
	}

	.post-txt {
		width: 100%;
		min-height: 300rpx;
		line-height: 1rpx;
	}

	/* 选择位置 */
	.choose-location {
		display: inline-flex;
		align-items: center;
		background-color: #eee;
		font-size: 28rpx;
		border-radius: 100rpx;
		padding: 10rpx 20rpx;
		margin-left: 5rpx;
		line-height: 1;
		color: #616161;

		.txt {
			margin-left: 10rpx;
		}
	}

	.yue-base-button {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		bottom: 0;
		width: 100%;
		padding: 40rpx 0;
		z-index: 3;
	}

	.yue-base-button view {
		width: 560rpx;
		text-align: center;
		height: 96rpx;
		line-height: 96rpx;
		border-radius: 96rpx;
		font-size: 32rpx;
		font-weight: 400;
		color: #FFFFFF;
		background: #07C062;
	}

	// 相机icon
	.icon-camera {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 210rpx;
		height: 210rpx;
		border-radius: 6rpx;
		margin: 5rpx 0rpx 0rpx 5rpx;
		background-color: #f4f5f7;
	}

	// 媒体列表
	.img-list {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
	}

	.img-list-box {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.img-item {
		width: 210rpx;
		height: 210rpx;
		margin: 5rpx;
		border-radius: 6rpx
	}
</style>


