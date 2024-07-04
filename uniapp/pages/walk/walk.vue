<template>
	<view>
		<view style="height: 150rpx;width: 100%;position: relative;">
			<view class="tag">
				<image src="../../static/icons/3D环图.png" style="height: 100rpx;width: 100rpx;margin-left: 20rpx;"></image>
				<view>
					<text>本月{{typename}}距离</text>
					<view>
						<text style="font-size: 16px;font-weight: bold;">{{walkdistance}}</text>
						<text style="margin-left: 10rpx;">公里</text>
					</view>
					
				</view>
			</view>
		</view>
		 <view class="page-body" style="margin-top: 20rpx;">
			 <map style="width: 100%; height: 800rpx;" :latitude="latitude" :longitude="longitude" :markers="markers"></map>
			 <view style="position: absolute;width: 100%; 
				display: flex; justify-content: center;flex-direction: column;align-items: center;">
				 <!-- <view style="margin: 40rpx;font-size: 40rpx;font-weight: bold;">自由走</view> -->
				 <wuc-tab style="margin: 40rpx;"
				 :tab-list="tabList" :tabCur="TabCur" @change="tabChange" 
				 tab-class="text-center text-black bg-white" 
				 select-class="text-x2"></wuc-tab>
				 <view style="height: 200rpx;width: 200rpx;background-color: #55ffb8;border-radius: 50%;
				  display: flex; justify-content: center;align-items: center;" @click="begin">
					 <image src="../../static/icons/go.png" style="height: 150rpx;width: 150rpx;"></image>
				 </view>
			 </view>	
		</view>
	</view>
</template>

<script>
	import WucTab from 'components/wuc-tab/wuc-tab.vue';
	export default {
		components:{
			WucTab
		},
		data() {
			return {
				walkdistance:'0.00',
				latitude: '',
				longitude: '',
				title: 'map',
				typename:'',
				markers: [], // 标记点，用于显示起点、终点等
				tabList: [{ name: '户外行走' }, { name: '户外跑步' },{ name: '户外骑行' }],
				TabCur: 0,
			}
		},
		onLoad(e) {
			this.TabCur=e.type
			if(e.type==='0')	this.typename='行走';
			else if(e.type==='1')	this.typename='跑步';
			else this.typename='骑行';
			let that=this;
			  // 获取用户是否开启 授权获取当前的地理位置、速度的权限。
			  uni.getSetting({
				success (res) {
				  console.log(res)
		
				  // 如果没有授权
				  if (!res.authSetting['scope.userLocation']) {
					// 则拉起授权窗口
					uni.authorize({
					  scope: 'scope.userLocation',
					  success () {
						//点击允许后--就一直会进入成功授权的回调 就可以使用获取的方法了
						uni.getLocation({
						  type: 'gcj02',
						  success: function (res) {
							console.log(res)
							console.log('当前位置的经度：' + res.longitude)
							console.log('当前位置的纬度：' + res.latitude)
							that.latitude=res.latitude;
							that.longitude=res.longitude;
							// 更新标记点，显示起点
							that.markers.push({ latitude: res.latitude, longitude: res.longitude });
						  }, fail (error) {
							console.log('失败', error)
						  }
						})
					  },
					  fail (error) {
						//点击了拒绝授权后--就一直会进入失败回调函数--此时就可以在这里重新拉起授权窗口
						console.log('拒绝授权', error)
		
						uni.showModal({
						  title: '提示',
						  content: '若点击不授权，将无法使用位置功能',
						  cancelText: '不授权',
						  cancelColor: '#999',
						  confirmText: '授权',
						  confirmColor: '#f94218',
						  success (res) {
							console.log(res)
							if (res.confirm) {
							  // 选择弹框内授权
							  uni.openSetting({
								success (res) {
								  console.log(res.authSetting)
								}
							  })
							} else if (res.cancel) {
							  // 选择弹框内 不授权
							  console.log('用户点击不授权')
							}
						  }
						})
					  }
					})
				  } else {
					// 有权限则直接获取
					uni.getLocation({
					  type: 'gcj02',
					  success: function (res) {
						console.log(res)
						console.log('当前位置的经度：' + res.longitude)
						console.log('当前位置的纬度：' + res.latitude)
						that.latitude=res.latitude;
						that.longitude=res.longitude;
						// 更新标记点，显示起点
						that.markers.push({ id:1,latitude: res.latitude, longitude: res.longitude });
					  }, fail (error) {
						console.log('失败', error)
					  }
					})
				  }
				}
			  })
		},
		methods: {
			tabChange(index) {
			    this.TabCur = index;
				if(this.TabCur===0)	this.typename='行走';
				else if(this.TabCur===1)	this.typename='跑步';
				else this.typename='骑行';
			},
			begin(){
				uni.redirectTo({
					url: '/pages/walking/walking?type='+this.TabCur
				});
			}
		}
	}
</script>

<style>
	.tag{
		height: 120rpx;
		width: 400rpx;
		background-color: #f7f7f7;
		border-radius:40px;
		position: absolute;
		top: 15%;
		left: 40rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
