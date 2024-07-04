<template>
	<view style="height: 93vh;width: 90%;margin: 9% 5%;background-color: #fff; box-shadow: 0 2rpx 10rpx rgba(0,0,0,.1); border-radius: 10rpx;">
		<view style="margin: 25rpx;padding-top: 40rpx;">
			<view style="height:100rpx;width:100%;display: flex;align-items: center;">
		    <image :src="userdata.avatar" style="height: 60rpx;width: 60rpx;border-radius: 50%;margin-right: 20rpx;"></image>
		    <view>
				<view style="font-size: 17px;padding-bottom: 10rpx;">{{userdata.username}}</view>
				<view style="color: rgb(173, 173, 173);">{{form.date}}</view>
		    </view>
		  </view>
			  <view style="margin-top: 60rpx;">
					<view><image :src="sporticon" style="height: 40rpx;width: 40rpx;margin-right: 20rpx;"/><text style="font-size: 17px;font-weight: bold;">{{sporttitle}}</text></view>
					<view><text style="font-size: 65px;font-weight: 900;">{{form.disnum}}</text><text>公里</text></view>
			  </view>
			<map scale="16" enable-scroll="false" style="width: 100%; height: 500rpx;margin: 20rpx auto;"
				:latitude="latitude" :longitude="longitude" :markers="form.markers" :polyline="form.polyline"></map>
			<view style="font-size: 18px;font-weight: 550;margin-top: 40rpx;">运动数据</view>
			<view class="sixblock">
				<view class="eachone">
					<view>00:{{form.alltime}}</view>
					<view>运动时长</view>
				</view>
				<view class="eachone">
					<view>{{form.disnum}}</view>
					<view>{{disnumtext}}</view>
				</view>
				<view class="eachone">
					<view>{{form.typenum}}</view>
					<view>{{typetext}}</view>
				</view>
				<view class="eachone">
					<view style="display: flex;align-items: baseline;"><view>{{form.consumption}}</view><text style="font-size: 15px;font-weight: 400;">千卡</text></view>
					<view>运动消耗</view>
				</view>
				<view class="eachone">
					<view>{{form.stepnum}}</view>
					<view>步数</view>
				</view>
				<view class="eachone">
					<view style="display: flex;align-items: baseline;"><view>{{form.stepfre}}</view><text style="font-size: 15px;font-weight: 400;">步/分</text></view>
					<view>平均步频</view>
				</view>
			</view>
		</view>
		
	</view>
</template> 

<script>
	export default {
		data() {
			return {
				userdata :uni.getStorageSync('xm-user'),
				form: {},
				latitude: 36.08743,
				longitude: 120.37479,
				sporticon: '',
				sporttitle: '',
				typetext:'',
				disnumtext:''
			}
		},
		onLoad(e){
			console.log(e)
			let data;
			if(e.dates!=null){
				console.log("dates")
				let t=JSON.parse(e.dates);
				data=t;
			}
			else if(e.form!=null){
				console.log("form")
				data=JSON.parse(e.form);
			} 
			console.log(data)
			let form=data;
			form.markers=JSON.parse(form.markers);
			form.polyline=JSON.parse(form.polyline);
			this.form=form;
			this.latitude=form.markers[0].latitude;
			this.longitude=form.markers[0].longitude;
			if(e.type==='0'){
				this.sporttitle='户外行走'
				this.typetext='步频'
				this.sporticon='../../static/icons/walk.png'
				this.disnumtext='行走距离'
			}
			else if(e.type==='1'){
				this.sporttitle='户外跑步'
				this.typetext='配速'
				this.sporticon='../../static/icons/run.png'
				this.disnumtext='跑步距离'
			}
			else{
				this.sporttitle='户外骑行'
				this.typetext='时速'
				this.sporticon='../../static/icons/bike.png'
				this.disnumtext='骑行距离'
			}
			
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		min-height: 0;
	}
	.sixblock{
		margin-top: 40rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(2, 1fr);
		grid-column-gap: 100rpx;
		grid-row-gap: 20rpx;
	}
	.eachone > view:nth-child(2){
	  color: rgb(165, 163, 163);
	}
	.eachone > view:nth-child(1){
	  font-size: 20px;
	  font-weight: bold;
	}
</style>
