<template>
	<view>
		<swiper circular autoplay :interval="3000" :duration="500" indicator-dots style="height: 350rpx;"
		  indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#3CB371">
		  <swiper-item v-for="item in banners" :key="item.id">
		    <navigator>
		      <image :src="item.img" alt="" mode="widthFix" style="width: 100%;" />
		    </navigator>
		  </swiper-item>
		</swiper>
		<!-- 公告 -->
		<view class="box">
		  <uni-icons type="sound" size="20" style="position: relative; top: 5rpx;"></uni-icons>
		  <text style="margin-left: 5rpx;">{{ notice }}</text>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				banners: [],
				noticeList: [],
				notice: ''
			}
		},
		onLoad() {
			this.load();
		},
		methods: {
			load() {
			  // this.$request.get('/banner/selectAll').then(res => {
			  //   this.banners = res.data || []
			  // })
			  
			  // 获取公告数据
			  this.$request.get('/notice/selectAll').then(res => {
			    this.noticeList = res.data || []
			    if (this.noticeList.length) {
			      let i = 0
			      this.notice = this.noticeList[i++].content
			      if (this.noticeList.length > 1) {
			        setInterval(() => {
			          if (i === this.noticeList.length) {
			            i = 0
			          }
			          this.notice = this.noticeList[i++].content
			        }, 3000)
			      }
			    }
			  })
			}
		}
	}
</script>

<style>
	.box {
		background-color: #fff;
		padding: 20rpx;
		border-radius: 10rpx;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, .1);
	}
</style>
