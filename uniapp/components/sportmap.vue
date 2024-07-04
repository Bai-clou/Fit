<template>
	<view>
		<view style="height: 60rpx;width: 250rpx;margin: 20rpx;display: flex;flex-direction: row;align-items: center;position: fixed;z-index: 99;">
			<image :src="sporticon" style="height: 50rpx;width: 50rpx;"></image>
			<text style="font-size: 35rpx;font-weight: bold;margin-left: 10rpx;">{{sporttitle}}</text>
		</view>
		<view class="page-body">
			<map :scale="18" style="width: 100vw; height: 100vh;position: fixed;" 
			:latitude="latitude" :longitude="longitude" :markers="markers" :polyline="polyline"
			@markertap="onMarkerTap" @markertouchmove="onMarkerTouchMove"></map>
		</view>
	</view>
</template>

<script>
	export default {
		name:"sportmap",
		props:{
			sporticon:{
				type:String,
				default:'../static/icons/walk.png'
			},
			sporttitle:{
				type:String,
				default:'户外行走'
			},
			
		},
		data() {
			return {
				latitude: '',
				longitude: '',
				markers: [{ 
					id: 0,
					longitude: '120.2826', 
					latitude: '36.722',
					iconPath: '../static/icons/start.png',
					width: 50,
					height: 50,
				},
				{ 
					id: 1,
					longitude: '', 
					latitude: '', 
					iconPath: '../static/icons/loc.png',
					width: 40,
					height: 40,
				}], // 标记点，用于显示起点、终点等
				polyline: [{
					points: [],
					color: '#27ff6f',
					width: 12,
					arrowLine: true
				}], // 折线，用于绘制跑步轨迹
				timer:null,
				lastLocation: null,
				currentLocation: null,
				distance: 0,
			};
		},
		mounted(){
			let that=this;
			uni.getLocation({
			  type: 'gcj02', 
			  success: function (res) {
				console.log(res)
				console.log('当前位置的经度：' + res.longitude)
				console.log('当前位置的纬度：' + res.latitude)
				that.latitude=res.latitude;
				that.longitude=res.longitude;
				that.markers[0].longitude = res.longitude;
				that.markers[0].latitude = res.latitude;
				that.markers[1].longitude = res.longitude;
				that.markers[1].latitude = res.latitude;
				that.lastLocation = { longitude: '', latitude: '' };
				that.currentLocation = { longitude: res.longitude, latitude: res.latitude };
			  }, fail (error) {
				console.log('失败', error)
			  }
			})
		},
		 methods: {
			//计算距离
			calculateDistance(location1, location2) {
				  const EARTH_RADIUS = 6378137.0; // 地球半径，单位：米
				  const radLng1 = location1.longitude * Math.PI / 180.0;
				  const radLng2 = location2.longitude * Math.PI / 180.0;
				  const a = radLng1 - radLng2;
				  const b = (location1.latitude - location2.latitude) * Math.PI / 180.0;
				  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(b / 2), 2) +
					Math.cos(location1.latitude * Math.PI / 180.0) * Math.cos(location2.latitude * Math.PI / 180.0) * Math.pow(Math.sin(a / 2), 2)));
				  s *= EARTH_RADIUS;
				  return s/1000;
			},
		    // 开始绘制路径
		    startDrawingPath() {
				let that=this;
				console.log("开始");
		      this.timer = setInterval(() => {
		        // 获取用户位置
		        uni.getLocation({
		          type: 'gcj02',
		          success: (res) => {
		            // 更新用户位置
					that.longitude = res.longitude;
					that.latitude = res.latitude;
					that.markers[1].latitude=res.latitude;
					that.markers[1].longitude=res.longitude;
					var newPoint = {
					    longitude: that.longitude,
					    latitude: that.latitude
					}; 
					// 添加路径点
					that.polyline[0].points.push(newPoint);
					that.currentLocation = { longitude: res.longitude, latitude: res.latitude };
					that.updateDistance();
					let data={}
					data.distance=that.distance;
					data.altitude=res.altitude;
					that.$emit('update-distance', data);
		          }
		        });									
		      }, 500);
		    },
			updateDistance() {
			      if (this.lastLocation) {
			        const distance = this.calculateDistance(this.lastLocation, this.currentLocation);
			        this.distance += distance;
			      }
			      this.lastLocation = { longitude: this.currentLocation.longitude, latitude: this.currentLocation.latitude };
			},
			endSport(){
				this.markers[1].iconPath='../../static/icons/end.png';
				this.markers[0].iconPath='../../static/icons/start.png';
				let data=[];
				data.push(this.markers);
				data.push(this.polyline);
				return data;
			},
			stopDrawingPath() {
				clearInterval(this.timer);
			},
		}
	}
</script>

<style>
	

</style>