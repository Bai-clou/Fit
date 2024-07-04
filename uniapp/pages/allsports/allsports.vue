<template>
	<view>
		<view style="height: 200rpx;width: 90%;margin: 0 auto;">
		    <view style="margin: 20rpx auto;text-align: center;color: gray;">总览</view>
		    <view style="display: flex;justify-content: space-around;align-items: center;">
				  <view style="text-align: center;">
					<view class="text1">{{alldata.alltime}}</view>
					<view class="text2">时长（小时）</view>
				  </view>
				  <view style="height: 60rpx;width: 1px;background-color: grey;"></view>
				  <view style="text-align: center;">
					<view class="text1">{{alldata.alltimes}}</view>
					<view class="text2">次数</view>
				  </view>
				  <view style="height: 60rpx;width: 1px;background-color: grey;"></view>
				  <view style="text-align: center;">
					<view class="text1">{{alldata.allconsum}}</view>
					<view class="text2">热量（千卡）</view>
				  </view>
			</view>
		</view>
		<uni-collapse v-for="(item,index) in sports" :key="index">
			<uni-collapse-item titleBorder="none" open="true">
				<template v-slot:title>
					<view slot="title" style="height: 200rpx;margin: 30rpx 30px;">
						<view style="font-size: 17px;">{{item.month}}</view>
						<view style="color: #959595; margin: 10rpx 0;">
							<text class="margin1">{{item.disnum}}公里</text><text class="margin1">{{item.alltime}}小时</text><text class="margin1">{{item.times}}次</text><text>{{item.allcon}}千卡</text>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-around;margin-top: 20rpx;">
							<view style="text-align: center;">
							  <view class="text3">{{item.typedis[0]}}</view>
							  <view class="text2">步行(公里)</view>
							</view>
							<view style="text-align: center;">
							  <view class="text3">{{item.typedis[1]}}</view>
							  <view class="text2">跑步(公里)</view>
							</view>
							<view style="text-align: center;">
							  <view class="text3">{{item.typedis[2]}}</view>
							  <view class="text2">骑行(公里)</view>
					    </view>
						</view>
					</view>
				</template>
				<view class="content">
					<uni-list :border="true" v-for="(i,ind) in item.dates" :key="ind" >
						<uni-list-chat :avatar-circle="true" :title="typedate[i.type].title" :avatar="typedate[i.type].icon" :note="i.disnum+'公里'" :time="i.date" :to="`/pages/completesport/completesport?dates=`+JSON.stringify(item.dates[ind])+`&type=`+i.type"></uni-list-chat>
					</uni-list>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				alldata:{
					alltime:'',
					alltimes:'',
					allconsum:''
				},
				sports:[],
				typedate:[
					{
						title:'户外步行',
						icon:'../../../../static/icons/walklist.png'
					},
					{
						title:'户外跑步',
						icon:'../../../../static/icons/runlist.png'
					},					
					{
						title:'户外骑行',
						icon:'../../../../static/icons/ridelist.png'
					}
				],
			}
		},
		onLoad(){
			let userid=uni.getStorageSync('xm-user').id;
			this.$request.get(`/sport/selectById/${userid}`).then(res => {
				console.log(res.data)
				let data=res.data;
				let r=this.calculTime(data);
				this.sports=this.splitAndSortByMonth(data);
				this.alldata.alltimes=data.length;
				this.alldata.allconsum=r.con;
				this.alldata.alltime=r.totalTimeInHours;
				let userdata = uni.getStorageSync('userdata');
				userdata.weekconsum=r.totalTimeInHours;
				uni.setStorageSync('userdata', userdata);
				this.$request.put('/user/updateUserData', userdata).then(e => {
					console.log(e);
				})
			})
		},
		methods: {
			splitAndSortByMonth(dateArray) {
			    let result = [];
			    dateArray.forEach(dateString => {
			        let [yearMonth, time] = dateString.date.split('-');
					let [year, month] = yearMonth.split('/');
					month = parseInt(month);
			        let monthKey = `${year}年${parseInt(month)}月`;
			        let monthObj = result.find(obj => obj.month === monthKey);
			        if (!monthObj) {
			            monthObj = {
			                month: monthKey,
			                dates: []
			            };
			            result.push(monthObj);
			        }
			        monthObj.dates.push(dateString);
			    });
			    result.forEach(obj => {
			        obj.dates.sort((a, b) => new Date(b) - new Date(a));
			    });
				
				result.forEach(e => {
					let r=this.calculTime(e.dates);
					let p=this.calcuTypeDis(e.dates);
					e.typedis=p;
					e.alltime=r.totalTimeInHours;
					e.allcon=r.con;
					e.disnum=r.disnum;
					e.times=r.times;
				});
				
			    return result;
			},
			calculTime(data){
				let totalMinutes = 0;
				let con=0;
				let dis=0;
				data.forEach(item => {
					let timeParts = item.alltime.split(":");
					let minutes = parseInt(timeParts[0]) + parseInt(timeParts[1])/60;
					totalMinutes += minutes;
					con+=item.consumption;
					dis+=parseFloat(item.disnum);
				});
				let totalTimeInHours = totalMinutes / 60;
				
				let result={};
				result.totalTimeInHours=totalTimeInHours.toFixed(1);
				result.con=con;
				result.disnum=dis.toFixed(2);
				result.times=data.length;
				return result;
			},
			calcuTypeDis(data){
				let result = Array.from({ length: 4 }, (_, i) => ('00.00' ));
				result = data.reduce((acc, curr) => {
					acc[curr.type] = parseFloat(acc[curr.type] || 0) + parseFloat(curr.disnum);
				    return acc;
				}, result);
				return result;
			},
			
		}
	}
</script>

<style>
	page{
		background-color: #f7f7f7;
	}
	.text1{
		font-size: 20px;
		font-weight: bold;
	}
	.text2{
		color: gray;
		font-size: 14px;
	}
	.text3{
	  font-size: 20px;
	}
	.content {
		width: 90%;
		margin: 0 5%;
	}
	.uni-collapse{
		width: 90% !important;
		margin: -20rpx 5%;
		border-radius: 10rpx;
	}
	.uni-collapse-item__title-arrow{
		margin-top: -70px;
	}
	.margin1{
		margin-right: 20rpx;
	}
	.uni-list-chat__content-title{
		font-size: 15px !important;
		color: gray !important;
	}
	.draft, .uni-list-chat__content-note{
		color: black !important;
		font-size: 17px !important;
	}
</style>
