<template>
	<view>
		<view style="height: 300rpx;width: 100%;background-color: #7e6af8;position: fixed;">
			
		</view>
		<view class="container">
			<view style="display: flex;">
				<view style="height: 150rpx;width: 150rpx;background-color: white;border-radius: 50%;margin-left: 60rpx;margin-top: -40rpx;">
					<image style="height: 150rpx;width: 150rpx;border-radius: 50%;" :src="inform.avatar"></image>
				</view>
				<view style="display: flex; justify-content: space-around;width: 600rpx;height: 40rpx;margin-top: 40rpx;" @click="switchFans">
					<view class="three"><text>关注</text><text>{{attention}}</text></view>
					<view class="three"><text>粉丝</text><text>{{fans}}</text></view>
					<view class="three"><text>获赞</text><text>{{praised}}</text></view>
				</view>
			</view>
			<view style="margin-left: 60rpx;font-size: 18px;">{{inform.username}}</view>
			<view class="row1" style="width: 90%; color: #a7a7a7;display: flex;margin: 15rpx auto;align-items: center;justify-content: space-between;">
				<view class="inform"><text>{{inform.sex}}</text><text>|</text><text>{{inform.address}}</text></view>
				<navigator style="height: 40rpx;width: 180rpx;border: solid 1px #e7e7e7;border-radius: 10px;display: flex;justify-content: center;" url="/pages/selfindex/selfindex">
					<text style="margin-right: 10rpx;">个人主页</text><uni-icons type="right" size="15"></uni-icons>
				</navigator>
			</view>
			<view class="row2" style="height: 250rpx;width: 90%;margin: 20rpx auto;border-radius: 10px;background-color: white;box-shadow: 0 2rpx 10rpx rgba(0,0,0,.1);">
				<view style="font-size: 16px;padding-top: 20rpx;margin-left: 20rpx;">我的课程</view>
				<view class="cards">
					<view class="card" @click="switchWant">
						<view style="display: flex;align-items: center;">
							<view style="height: 130rpx;width: 130rpx;background-color: #7e6af8;border-radius: 8px;display: flex;justify-content: center;align-items: center;">
								<image src="../../static/icons/课程.png" style="height: 80rpx;width: 100rpx;"></image>
							</view>
							<view style="height: 110rpx;width: 15rpx;background-color: #e5e5e5;border-radius: 8px;"></view>
							<view style="height: 90rpx;width: 15rpx;background-color: #eeeeee;border-radius: 8px;"></view>
						</view>
						<view style="display: flex;flex-direction: column;margin: auto 20rpx;"><text style="font-size: 16px;margin-bottom: 20rpx;">想练</text><text style="color: gray;white-space: nowrap;">{{userdata.wantcourse}}节课程</text></view>
					</view> 
					<view class="card" @click="switchAlready">
						<view style="display: flex;align-items: center;">
							<image :src="bgimg" style="height: 130rpx;width: 130rpx;border-radius: 8px;"></image>
							<view style="height: 110rpx;width: 15rpx;background-color: #e5e5e5;border-radius: 8px;"></view>
							<view style="height: 90rpx;width: 15rpx;background-color: #eeeeee;border-radius: 8px;"></view>
						</view>
						<view style="display: flex;flex-direction: column;margin: auto 20rpx;"><text style="font-size: 16px;margin-bottom: 20rpx;">练过</text><text style="color: gray;white-space: nowrap;">{{userdata.alreadycourse}}个训练</text></view>
					</view>
				</view>
			</view>
			<view style="height: 200rpx; width: 90%;margin: 10rpx auto; display: flex;justify-content: space-between;">
				<view class="card_sport" style="height: 200rpx;width: 49%;border-radius: 10px;background-color: white;box-shadow: 0 2rpx 10rpx rgba(0,0,0,.1);">
					<view class="threeView" style="padding: 20rpx;" @click="switchSports">
						<view style="display: flex;justify-content: space-between;"><text style="font-size: 16px;">总运动</text><uni-icons type="right" size="15"></uni-icons></view>
						<view style="display: flex;align-items: flex-end;"><view style="font-size: 20px;font-weight: bold;margin-right: 10rpx;">{{userdata.weekconsum}}</view><text style="color: gray;font-size: 12px;">小时</text></view>
						<view style="color: gray;">共消耗{{userdata.allconsum}}千卡</view>
					</view>
					
				</view>
				<view class="card_weight" style="height: 200rpx;width: 49%;border-radius: 10px;background-color: white;box-shadow: 0 2rpx 10rpx rgba(0,0,0,.1);">
					<view class="threeView" style="padding: 20rpx;" @click="switchData">
						<view style="display: flex;justify-content: space-between;"><text style="font-size: 16px;">体重</text><uni-icons type="right" size="15"></uni-icons></view>
						<view style="display: flex;align-items: flex-end;"><view style="font-size: 20px;font-weight: bold;margin-right: 10rpx;">{{userdata.weight}}</view><text style="color: gray;font-size: 12px;">公斤</text></view>
						<view style="color: gray;">上次记录{{diffDays}}天前</view>
					</view>
					
				</view>
			</view>
			<view :class="shares.length===0?'high':'low'" style="width: 90%;margin: 20rpx auto; border-radius: 5px;background-color: white;box-shadow: 0 2rpx 10rpx rgba(0,0,0,.1);">
				<view style="display: flex;justify-content: space-between;font-size: 16px;padding: 30rpx 40rpx;"><view>动态相册</view><view><text style="font-size: 14px;color: gray;" @click="switchindex">查看全部</text><uni-icons type="right" size="15"></uni-icons></view></view>
				<view style="height: 75%;width: 89%;margin: 2rpx auto;background-color: #f8f8f8;border-radius: 10px;display: flex;justify-content: center;align-items: center;">
					<view v-if="shares.length===0" class="logo" style="display: flex; justify-content: center;align-items: center;flex-direction: column;">
						<image src="../../static/icons/动态.png" style="height: 150rpx;width: 150rpx;"></image>
						<view style="color: #a7a7a7;">快去发布你的第一张照片吧</view>
						<view style="width: 120rpx;height: 30rpx; border-radius: 30px;background-color: #0cbf21;color: white;text-align: center;line-height: 30rpx;" @click="switchFabu">去发布</view>
					</view>
					<view v-else class="imgs">
						<image :src="shares[0].bgimg"></image>
						<image v-if="shares.length>=2" :src="shares[1].bgimg"></image>
						<image v-if="shares.length>=3" :src="shares[2].bgimg"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { cloneDeep } from 'lodash';
	export default {
		data() {
			return {
				inform:uni.getStorageSync('xm-user'),
				attention:0,
				fans:0,
				praised:0,
				userdata: {alreadycourse:0,wantcourse:0,weekconsum:0,allconsum:0,weight:0},
				bgimg:'../../static/icons/课程3.png',
				alreadycourse:'',
				wantcourse:'',
				shares:[],
				diffDays:0,
			}
		},
		onPullDownRefresh() { 
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad(){
			
			this.$request.get(`/user/selectById/${this.inform.id}`).then(res => {
				this.attention=JSON.parse(res.data.attention).length;
				this.fans=JSON.parse(res.data.fans).length;
				this.praised=JSON.parse(res.data.praised).length;
			})
			
			this.$request.get(`/share/selectById/${this.inform.id}`).then(res => {
				if(res.data!=null)
					this.shares=res.data
			})
			
			let that=this;
			this.$request.get(`/user/selectUserDataById/${this.inform.id}`).then(res => {
				console.log(res);
				if(res.data!=null){
					let data = cloneDeep(res.data);
					this.userdata=data;
					uni.setStorageSync('userdata', data)
					this.wantcourse=data.wantcourse;
					this.alreadycourse=data.alreadycourse;
					this.userdata.weight=parseFloat(this.userdata.weight).toFixed(1);
					
					let currentDate = new Date();
					currentDate=currentDate.getTime()
					let diffTimeStamp = currentDate- this.userdata.lastRecord;
					let diffDays = Math.floor(diffTimeStamp / (24 * 3600 * 1000));
					this.diffDays=diffDays;
					let arr1 = JSON.parse(this.userdata.alreadycourse);
					let arr2 = JSON.parse(this.userdata.wantcourse);
					this.userdata.alreadycourse=arr1.length;
					this.userdata.wantcourse=arr2.length;
					this.$request.get(`/course/selectById/${arr1[0]}`).then(e => {
						console.log(e.data)
						if (that.userdata.alreadycourse!=0)	that.bgimg=e.data.bgimg
					})
				}
				else{
					
					uni.showToast({
						title: '快去填写自己的数据吧！',
						icon: 'none',
						duration: 2000
					}) 
				}
				
			})
		},
		methods: {
			switchAlready(){
				uni.navigateTo({
					url: '/pages/alreadycourse/alreadycourse?alreadycourse='+this.alreadycourse
				});
			},
			switchWant(){
				uni.navigateTo({
					url: '/pages/wantcourse/wantcourse?wantcourse='+this.wantcourse
				});
			},
			switchSports(){
				uni.navigateTo({
					url: '/pages/allsports/allsports'
				});
			},
			switchData(){
				uni.navigateTo({
					url: '/pages/bodydata/bodydata'
				});
			},
			switchFabu(){
				uni.navigateTo({
					url: '/pages/upshare/upshare'
				});
			},
			switchFans(){
				uni.navigateTo({
					url: '/pages/attention/attention'
				});
			},
			switchindex(){
				uni.navigateTo({
					url: '/pages/selfindex/selfindex'
				});
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		/* height: 100%; */
		width: 100%;
		position: absolute;
		top: 10%;
		background-color:#fcfcfc;
		border-top-right-radius: 20px;
		border-top-left-radius: 20px;
	}
	.three{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 10rpx;
	}
	.three > text:nth-child(1){
		color: #a7a7a7;
		font-size: 14px;
	}
	.three > text:nth-child(2){
		font-size: 16px;
		font-weight: bold;
	}
	.inform > text{
		padding: 10rpx;
	}
	.cards{
		display: flex;
		justify-content: space-around;
	}
	.card{
		display: flex;
		flex-direction: row;
		padding: 20rpx;
	}
	.threeView > view{
		padding-top: 10rpx;
	}
	.logo > view, 
	.logo > image{
		padding: 20rpx;
	}
	
	.imgs{
		display: flex;
		width: 90%;
	}
	.imgs > image{
		height: 100px;
		width: 100px;
		border-radius: 10rpx;
		margin-right: 20rpx;
		/* margin-bottom: 30rpx; */
	}
	
	.high{
		height: 580rpx;
	}
	.low{
		height: 450rpx;
	}
	
</style>
