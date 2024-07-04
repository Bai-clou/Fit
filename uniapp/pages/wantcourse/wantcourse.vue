<template>
	<view>
		<view style="height: 90vh;width: 90;margin: 9% 5%;background-color: #fff; box-shadow: 0 2rpx 10rpx rgba(0,0,0,.1); border-radius: 10rpx;">
			<view style="width: 90%;height: 100rpx;margin:20rpx 5%; display: flex;align-items: center;justify-content: space-between;">
				<text style="font-size: 18px;font-weight: bold;">想练的课程</text> 
				<text style="color: gray;">{{sum}}节课程</text>
			</view>
			<view style="width: 90%;height: 1px;margin: 0 auto;background-color: #d3d3d3;"></view>
			<scroll-view scroll-y="true" style="height: 85%;width: 100%;margin: 30rpx 0;">
				<uni-swipe-action v-for="(item,index) in courses" :key="index">
					<uni-swipe-action-item
						:right-options="options"
						auto-close="true"
						@click="bindClick(index)"
					>
						<view class="content-box" @click="switchCourse(item.id)">
							<image :src="item.bgimg" style="height: 80%;border-radius: 5rpx;margin-left: 20rpx;"></image>
							<view style="margin-left: 30rpx;width: 55%;">
								<view class="text1">{{item.title}}</view>
								<view class="text2">{{item.type}}</view>
								<view class="text2">{{item.grade}} · {{item.time}}</view>
							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</scroll-view>
		</view>  
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sum: 3,
				courses:[],
				options: [
					{
						text: '删除',
						style: {
							backgroundColor: '#F56C6C',
						}
					}
				],
			}
		},
		onLoad(e){
			let arr1 = JSON.parse(e.wantcourse);
			this.sum=arr1.length;
			for(let i=0;i<arr1.length;i++){
				this.$request.get(`/course/selectById/${arr1[i]}`).then(e => {
					this.courses.push(e.data);
				})
			}
		},
		methods: {
			
			bindClick(e) {
				console.log(e);
			},
			switchCourse(id){
				uni.navigateTo({
					url: '/pages/coursedetail/coursedetail?id='+id
				});
			}
		}
	}
</script>

<style>
	page{
		min-height: 0;
	}
	.content-box{
		height: 200rpx;
		width: 90%;
		margin: 20rpx auto;
		box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.08); 
		border-radius: 10rpx;
		display: flex;
		align-items: center;
	}
	.text1{
		font-size: 18px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.text2{
		padding-top: 10rpx;
		color: gray;
	}
</style>
