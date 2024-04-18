<template>
	<view>
		<view class="topContainer">
			<view style="display: flex;align-items: center;">
				<image src="../../static/icons/我的2.png" style="height: 80rpx;width: 80rpx;border-radius: 50%;background-color: aqua;"></image>
				<view style="font-size: 22px;font-weight: 550;margin-left: 20rpx;">{{date}}</view>
			</view>
			<view style=""><uni-icons type="search" size="25"></uni-icons></view>
		</view>
		<scroll-view class="scroll-view_H" scroll-x="true">
			<view class="scroll-view-item_H" style="padding-right: 10rpx;">
				<view class="sportcard" style="height: 200rpx;width: 300rpx;background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);border-radius: 20px;">
					<image src="../../static/icons/行走.png" style="height: 60rpx;width: 60rpx;"></image>
					<view style="font-weight: bold;">开始行走</view>
					<view style="font-size: 24rpx;font-weight: 200;">点击前往行走页面</view>
				</view>
			</view>
			<view class="scroll-view-item_H" style="padding-left: 10rpx;padding-right: 10rpx;">
				<view class="sportcard" style="height: 200rpx;width: 300rpx;background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);border-radius: 20px;">
					<image src="../../static/icons/跑步.png" style="height: 60rpx;width: 60rpx;"></image>
					<view style="font-weight: bold;">开始跑步</view>
					<view style="font-size: 24rpx;font-weight: 200;">点击前往跑步页面</view>
				</view>
			</view>
			<view class="scroll-view-item_H" style="padding-left: 10rpx;">
				<view class="sportcard" style="height: 200rpx;width: 300rpx;background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);border-radius: 20px;">
					<image src="../../static/icons/骑行.png" style="height: 60rpx;width: 60rpx;"></image>
					<view style="font-weight: bold;">开始骑行</view>
					<view style="font-size: 24rpx;font-weight: 200;">点击前往骑行页面</view>
				</view>
			</view>
		</scroll-view>
		<view class="calendar_container"> 
			<zsyCalendar
				:sundayIndex="6"
				@change="change"
				:mode="mode"
			/>
		</view>
		
	</view>
</template>

<script>
	import zsyCalendar from 'uni_modules/zsy-calendar/components/zsy-calendar/zsy-calendar'
	export default {
		data() {
			return {
				date: '3月11日',
				mode: 'close'
			}
		},
		onLoad() {
			let currentDate = new Date();
			let currentMonth = currentDate.getMonth() + 1;
			let currentDay = currentDate.getDate(); 
			this.date=currentMonth+'月'+currentDay+'日';
			if(this.mode === 'open'){
				console.log(this.mode);
				document.getElementsByClassName('calendar_container').style.height='800rpx';
				
			}
		},
		components: {
			zsyCalendar
		},
		methods: {
			change(e) {
				console.log(e)
			}
		}
	}
</script>

<style>
	page {
	  background-color: #f5f5f5;
	}
	.topContainer{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.topContainer > view{
		padding: 20rpx;
	}
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}
	
	.scroll-view-item_H {
		display: inline-block;
		width: 300rpx;
		height: 200rpx;
		font-size: 32rpx;
		color: white;
		padding-right: 20rpx;
		padding-left: 20rpx;
	}
	::-webkit-scrollbar {
	  display: none;
	}
	.sportcard > view{
		margin-left: 20rpx;
		margin-bottom: 10rpx;
	}
	.sportcard > image{
		margin-top: 20rpx;
		margin-left: 20rpx;
	}
	.calendar_container {
		/* min-height: calc(100vh - var(--window-top)); */
		background-color: #ffffff;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 20px;
		margin: 20rpx;
	}

</style>
