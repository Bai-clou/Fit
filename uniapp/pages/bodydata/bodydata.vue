<template>
	<view style="padding: 20rpx;">
		<view class="box">
			<uni-forms style="margin-top: 40rpx;" :modelValue="form" :rules="rules" ref="formRef" label-width="140rpx" label-align="right">
				<uni-forms-item label="体重(公斤)" name="weight">
					<uni-easyinput type="number" v-model="form.weight" placeholder="请输入体重" />
				</uni-forms-item>
				<uni-forms-item label="身高(厘米)" name="height">
					<uni-easyinput type="number" v-model="form.height" placeholder="请输入身高" />
				</uni-forms-item>
				<uni-forms-item label="BMI" name="bmi">
					<uni-easyinput type="number" v-model="form.bmi" placeholder="基于体重与身高自动计算" disabled />
				</uni-forms-item>
				<uni-forms-item label="体脂率(%)" name="rate">
					<uni-easyinput type="number" v-model="form.rate" placeholder="请输入体脂率" />
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
				form: {},
			}
		},
		onLoad(){
			let form=uni.getStorageSync('userdata')
			if(form!=null){
				this.form=form
			}
		},
		computed:{
			calcumbi(){
				this.form.bmi=((this.form.weight/this.form.height/this.form.height)*10000).toFixed(1)
			}
		},
		methods: {
			save(){
				let currentDate = new Date();
				currentDate=currentDate.getTime()
				this.form.lastRecord=currentDate;
				let form=uni.getStorageSync('userdata')
				if(form!=null){
					this.$request.put('/user/updateUserData', this.form).then(e => {
						console.log(e);
						if (e.code === '200') {
							uni.showToast({
								icon: "success",
								title: '保存成功'
							})
							uni.setStorageSync('userdata', this.form)
						} else {
							uni.showToast({
								icon: "error",
								title: e.msg
							})
						}
						
					})
				}
				else{
					this.form.userid=uni.getStorageSync('xm-user').id
					this.$request.post('/user/addUserData',this.form).then(res=>{
						console.log(res)
						if (res.code === '200') {
							uni.showToast({
								icon: "success",
								title: '保存成功'
							})
							uni.setStorageSync('userdata', this.form)
						} else {
							uni.showToast({
								icon: "error",
								title: res.msg
							})
						}
					})
				}
				
			}
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
	.uni-forms-item__label{
		padding: 0 10px 0 0 !important;
	}
</style>
