<template>
	<view
		class="slider"
		:style="{ height: `${height}px` }"
	>
		<!-- 滑动框头部区域 -->
		<view
			class="head_line"
			@touchend.stop="touchendHandle"
			@touchmove.stop="touchmoveHandle"
			@touchstart.stop="touchstartHandle"
			:style="{ height: `${ headerHeight }px` }"
		>
			<view class="line"></view>
		</view>
		<view class="slider-container">
			<scroll-view :scroll-y="true" style="height: 100%" @scrolltolower="$emit('down')">
				<slot></slot>
				<!-- <transition name="fade"> -->
					<view v-if="height<500">
						<view class="partpage">
							<view class="eachblock">
								<view>{{disnum}}</view>
								<view>总距离</view>
							</view>
							<view class="eachblock" style="margin-right: 50rpx;">
								<view>{{alltime}}</view>
								<view>总时长</view>
							</view>
							<view class="eachblock">
								<view>{{typenum}}</view>
								<view>{{typetext}}</view>
							</view>
						</view>
					</view>
					<view v-else>
						<view class="pageall">
							<view style="display: flex;flex-direction: row;align-items: flex-end;">
								<view style="font-size: 200rpx;font-weight: bold;">{{disnum}}</view>
								<text style="font-size: 50rpx;margin: 40rpx 20rpx;">公里</text>
							</view>
							<view class="fourblock">
								<view class="eachone">
									<view>{{alltime}}</view>
									<view>总时长</view>
								</view>
								<view class="eachone">
									<view>{{typenum}}</view>
									<view>{{typetext}}</view>
								</view>
								<view class="eachone">
									<view>{{stepnum}}</view>
									<view>{{steptext}}</view>
								</view>
								<view class="eachone">
									<view>{{consumption}}</view>
									<view>总消耗</view>
								</view>
							</view>
							<view v-if="isPause" style="display: flex;flex-direction: row; margin: 60rpx 10%;">
								<image src="../static/icons/结束.png" style="height: 180rpx;width: 180rpx;margin-right: 40rpx;"
								@click="End"></image>
								<image src="../static/icons/开始.png" style="height: 180rpx;width: 180rpx;margin-left: 40rpx;"
								@click="Start"></image>
							</view>
							<view v-else style="margin: 60rpx 30%;">
								<image src="../static/icons/暂停.png" style="height: 180rpx;width: 180rpx;"
								@click="Pause"></image>
							</view>
						</view>
					</view>
				<!-- </transition> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { type } from 'os'
	import sportmap from 'components/sportmap.vue';
	export default {
		components: {
			sportmap
		},
		name:'uppage',
		props: {
			// 上滑框的最小高度
			minHeight: {
				type: Number,
				default: 100
			},
			// 是否开启分层上滑 0表示不开启
			middleHeight: {
				type: Number,
				default: 0
			},
			// 最大高度差值，单位 px
			maxHeightDV: {
				type: Number,
				default: 180
			},
			// 上拉弹框顶部的高度
			headerHeight: {
				type: Number,
				default: 50
			},
			disnum: {
				type: String,
				default: '0.00'
			},
			alltime: {
				type: String,
				default: '00:00'
			},
			typenum: {
				type: String,
				default: '0'
			},
			typetext: {
				type: String,
				default: '步频'
			},
			stepnum: {
				type: Number,
				default : 0
			},
			consumption: {
				type: Number,
				default: 0
			},
			steptext: {
				type: String,
				default: '步数'
			}
		},
		mounted () {
			 const info = uni.getSystemInfoSync()
			 this.maxHeight = info.windowHeight - this.maxHeightDV
			 this.height = this.minHeight
		},
		data() {
			return {
				// 滑块最大高度值
				maxHeight: 800,
				// 滑块实际高度值
				height: 100,
				// 首次按下的点坐标y所对应的值
				startY: 0,
				// 确认滑动方向，true 代表上滑，false 代表下滑
				up: true,
				// 确认是否触摸结束，true 代表触摸结束，false代表触摸开始
				flag: true,
				isPause: true,
			};
		},
		methods: {
			touchstartHandle(e) {
				this.startY = e.touches[0].pageY;
			},
			touchendHandle() {
				if (this.up) {
					if (this.middleHeight) {
						this.height < this.middleHeight ? this.height = this.middleHeight : this.height = this.maxHeight
					} else {
						this.height = this.maxHeight
					}
				} else {
					this.height = this.minHeight
				}
				this.flag = true
			},
			touchmoveHandle(e) {
				// 手指滑动时所在的纵坐标位置
				let currentY = e.touches[0].pageY
				// 用户滑动的距离
				let transformHeight = currentY - this.startY
				this.height = this.height - (transformHeight / 20)
				// 滑块的最大高度不能大于设置的高度
				if (this.height > this.maxHeight) {
					this.height = this.maxHeight
				}
				// 滑块最小高度不能低于设置的最小高度
				if (this.height < this.minHeight) {
					this.height = this.minHeight
				}
				// 用户手指触摸结束后确定滑动方向
				if (this.flag) {
					this.flag = false
					this.up = transformHeight < 0
				}
			},
			Start(){
				this.isPause=false;
				
				this.$emit('start-map');
			},
			Pause(){
				this.isPause=true;
				
				this.$emit('pause-map');
			},
			End(){
				this.$emit('end-map');
			}
		},
	}
</script>

<style lang="scss" scoped>
	.slider {
		z-index: 999;
		position: absolute;
		bottom: 0;
		width: 100vw;
		background-color: #6c646f;
		padding: 0 20rpx;
		border-top-right-radius: 20px;
		border-top-left-radius: 20px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		transition-property: height;
		transition-duration: .5s;
		transition-timing-function: ease-in-out;

		.head_line {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;

			.line {
				width: 37rpx * 2;
				height: 5rpx * 2;
				border-radius: 30rpx * 2;
				background-color: #919191;
			}
		}

		.slider-container {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
		.partpage{
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			align-items: center;
			
		}
		.eachblock{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.eachblock > view:nth-child(1){
			color: white;
			font-size: 50rpx;
			font-weight: bold;
		}
		.eachblock > view:nth-child(2){
			color: #d9d3d7;
			font-size: 30rpx;
		}
		.pageall{
			color: white;
			margin-left: 10%;
		}
		.eachone{
			display: flex;
			flex-direction: column;
			justify-self: start;
			// align-items: center;
		}
		.eachone > view:nth-child(1){
			font-size: 100rpx;
			font-weight: bold;
		}
		.eachone > view:nth-child(2){
			font-size: 40rpx;
			color: #bebbc6;
		}
		.fourblock{
			margin-top: 40rpx;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 1fr);
			grid-column-gap: 100rpx;
			grid-row-gap: 20rpx;
		}
	}
</style>
