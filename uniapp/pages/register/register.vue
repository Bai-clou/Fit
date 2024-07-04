<template>
	<view class="page">
		<view style="padding: 20rpx; margin: 80rpx 40rpx; background-color: #fff; box-shadow: 0 2rpx 10rpx rgba(0,0,0,.1); border-radius: 10rpx;">
			<view class="header">
				<image src="../../static/icons/Fit.png"></image>
			</view>
			<view style="margin: 50rpx 30rpx; font-size: 40rpx;">欢迎注册</view>
			<uni-forms ref="form" :modelValue="form" :rules="rules" validateTrigger='blur'>
				<uni-forms-item name="avatar" required>
					<view style="display: flex;">
						<image :src="form.avatar" style="height: 100rpx;width: 100rpx;border-radius: 50%;"></image>
						<button class="bottom" @click="authLogin">
							<image  src="../../static/icons/weixin.png" mode="aspectFit"></image>
							使用微信头像与用户名
						</button>
					</view>
				</uni-forms-item>
				<uni-forms-item name="username" required>
					<uni-easyinput prefixIcon="person" v-model="form.username" placeholder="请输入用户名" />
				</uni-forms-item>
				<uni-forms-item name="password" required>
					<uni-easyinput prefixIcon="locked" v-model="form.password" placeholder="请输入密码" />
				</uni-forms-item>
				<uni-forms-item>
					<button @click="register()" style="background-color: #ffd100; border-color: #ffd100; 
						height: 70rpx; line-height: 70rpx;">注 册</button>
				</uni-forms-item>
				<uni-forms-item>
					<view style="text-align: right;">已有账号？去 <navigator style="display: inline-block; color: dodgerblue; 
						margin-left: 4rpx;" url="/pages/login/login">登录</navigator></view>
				</uni-forms-item>
				
			</uni-forms>
		</view>
		<view> 
			<!-- //授权弹框 -->
			<view class="auth_wrap" :class="isAuth?'show':''">
				<view class="mask"></view>
				<view class="auth_content">
					<view class="auth_top">
						<view class="ptitle">获取您的昵称、头像</view>
						<view class="txt">获取用户头像、昵称，主要用于完善个人资料，向用户提供更好使用体验</view>
						<view class="close" @tap="closePopup">
							<image src="../../static/icons/del.png" mode=""></image>
						</view>
					</view>
					<view class="auth_ul">
						<view class="auth_li">
							<view class="tit">头像</view>
							<view class="rit">
								<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
									<image class="avatar" :src="avatarUrl"></image>
								</button>
							</view>
						</view>
						<view class="auth_li">
							<view class="tit">昵称</view>
							<view class="rit">
								<input type="nickname" class="weui-input" placeholder="请输入昵称" @blur="onNickname" />
							</view>
						</view>
					</view>
					<view class="confirm_btn" @tap.stop="WxgetUserProfile">保存</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		pathToBase64
	} from '@/utils/image.js'
	export default {
		data() {
			return {
				isAuth: false, //控制授权弹框显示与隐藏
				avatarUrl: '../../static/icons/defaultavatar.png', //头像
				nickname: '', //昵称
				isFrist: '', //判断是否是第一次授权
				form: {
					avatar:'../../static/icons/defaultavatar.png',
					username:'',
					password:'',
					sex:'神秘',
					address:'银河，地球',
					role: 'NormalUser'
				},
				rules: {
					// 对username字段进行必填验证
					username: {
						// username 字段的校验规则
						rules:[
							// 校验 username 不能为空
							{
								required: true,
								errorMessage: '请输入账号',
							},
							// 对username字段进行长度验证
							{
								minLength: 1,
								maxLength: 10,
								errorMessage: '账号长度在 {minLength} 到 {maxLength} 个字符',
							}
						],
					},
					password: {
						rules:[
							{
								required: true,
								errorMessage: '请输入密码',
							},
							{
								minLength: 3,
								maxLength: 10,
								errorMessage: '密码长度在 {minLength} 到 {maxLength} 个字符',
							}
						],
					}
				}
			}
		}, 
		methods: {
			authLogin() {
				this.isFrist=1;
				this.isAuth=true;
				
			},
			//关闭授权弹框
			closePopup() {
				this.isAuth = false;
			},
			//监听昵称变化
			onNickname(e) {
				this.nickname = e.detail.value;
			},
			//获取头像变化的值
			onChooseAvatar(e) {
				let _this = this;
				//将微信返的临时图片转为base64格式图
				pathToBase64(e.detail.avatarUrl).then(base64 => {
					console.log(base64)
					this.avatarUrl = base64;
				}).catch(error => {
					console.error(error)
				})
			},
			//微信授权接口
			WxgetUserProfile() {
				let that = this;
				if (this.isFrist === 1) {
					// 授权授权时提示输入昵称
					if (!this.nickname) {
						this.$message.info('请输入昵称');
						return
					}
					uni.getUserProfile({
						desc: '用于完善资料',
						success: infoRes => {
							that.form.avatar=that.avatarUrl;
							that.form.username=that.nickname;
							that.isAuth=false;
						},
						fail: err => {
							uni.hideLoading();
						}
					})
				}
			},
			register() {
				this.$refs.form.validate().then(res=>{
					this.$request.post('/register', this.form).then(res => {
						if (res.code === '200') {
							uni.showToast({
								icon: 'success',
								title: '注册成功'
							})
							
							// 跳转登录页面
							setTimeout(() => {
								// 跳转登录页面
								uni.navigateTo({
									url: '/pages/login/login'
								})
							}, 500)
						} else {
							uni.showToast({
								icon: 'error',
								title: res.msg
							})
						}
					})
				}).catch(err =>{
					console.log('表单错误信息：', err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page,
	body,
	.page {
		// min-height: 100vh;
		background: #fff;
	}

	//授权弹框 start
	.auth_wrap {
		position: fixed;
		width: 100%;
		bottom: -120%;
		transition: all 0.35s linear;

		&.show {
			bottom: 0;
			transition: all 0.35s linear;

			.mask {
				display: block;
			}
		}

		.mask {
			width: 100%;
			height: 100vh;
			position: fixed;
			background: rgba(0, 0, 0, 0.5);
			z-index: 98;
			top: 0;
			display: none;
		}

		.auth_content {
			padding: 32rpx 32rpx 72rpx 32rpx;
			position: relative;
			z-index: 99;
			background: #fff;
			border-radius: 16rpx 16rpx 0 0;

			.auth_top {
				position: relative;

				.ptitle {
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 24rpx;
				}

				.txt {
					font-size: 26rpx;
					color: #999;
				}

				.close {
					width: 26rpx;
					height: 26rpx;
					position: absolute;
					right: 0;
					top: 0;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.auth_ul {
				margin-top: 16rpx;

				.auth_li {
					display: flex;
					align-items: center;
					border-top: solid 1px #f5f5f5;
					padding: 24rpx 0;

					&:last-child {
						border-bottom: solid 1px #f5f5f5;
					}

					.tit {
						width: 140rpx;
						font-size: 30rpx;
					}

					.rit {
						width: calc(100% - 140rpx);

						input {
							font-size: 28rpx;
							height: 72rpx;
							width: 100%;
						}

						image {
							width: 54rpx;
							height: 54rpx;
							border-radius: 50%;
						}

						button {
							width: 100%;
							height: 72rpx;
							background: #fff;
							text-align: left;
							padding: 0;

							&:after {
								border: solid 1px #fff;
							}

							// opacity: 0;
						}
					}
				}
			}

			.confirm_btn {
				width: 420rpx;
				margin: 46rpx auto 0 auto;
				background: #39b54a;
				color: #fff;
				border-radius: 8rpx;
				height: 94rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
			}
		}
	}

	//授权弹框 end

	.header {
		height: 100rpx;
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		image {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.bottom {
		background: #fff;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #39b54a;
		width: 450rpx;
		margin: 0 32rpx;
		border: solid 1px #39b54a;
		border-radius: 50rpx;

		image {
			width: 54rpx;
			height: 54rpx;
			margin-right: 16rpx;
		}
	}
</style>