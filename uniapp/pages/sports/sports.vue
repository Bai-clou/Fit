<template>
	<view>
		<view class="topContainer">
			<view style="display: flex;align-items: center;">
				<image :src="avatar" style="height: 80rpx;width: 80rpx;border-radius: 50%;"></image>
				<view style="font-size: 22px;font-weight: 550;margin-left: 20rpx;">{{date}}</view>
			</view>
			<view style=""><uni-icons type="search" size="25"></uni-icons></view>
		</view>
		<scroll-view class="scroll-view_H" scroll-x="true">
			<view class="scroll-view-item_H" style="padding-right: 10rpx;" @click="switchStep(0)">
				<view class="sportcard" style="height: 200rpx;width: 300rpx;background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);border-radius: 20px;">
					<image src="../../static/icons/行走.png" style="height: 60rpx;width: 60rpx;"></image>
					<view style="font-weight: bold;">开始行走</view>
					<view style="font-size: 24rpx;font-weight: 200;">点击前往行走页面</view>
				</view>
			</view>
			<view class="scroll-view-item_H" style="padding-left: 10rpx;padding-right: 10rpx;" @click="switchStep(1)">
				<view class="sportcard" style="height: 200rpx;width: 300rpx;background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);border-radius: 20px;">
					<image src="../../static/icons/跑步.png" style="height: 60rpx;width: 60rpx;"></image>
					<view style="font-weight: bold;">开始跑步</view>
					<view style="font-size: 24rpx;font-weight: 200;">点击前往跑步页面</view>
				</view>
			</view>
			<view class="scroll-view-item_H" style="padding-left: 10rpx;" @click="switchStep(2)">
				<view class="sportcard" style="height: 200rpx;width: 300rpx;background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);border-radius: 20px;">
					<image src="../../static/icons/骑行.png" style="height: 60rpx;width: 60rpx;"></image>
					<view style="font-weight: bold;">开始骑行</view>
					<view style="font-size: 24rpx;font-weight: 200;">点击前往骑行页面</view>
				</view>
			</view>
		</scroll-view>
		<view class="calendar-content">
			<zsyCalendar
				:sundayIndex="6"
				@change="change"
				:markedDates="markedDates"
			/>
			<!-- <punch-calendar @switchMonth="switchMonth" @chooseDay="chooseDay" :errorList="errorList" :successList="successList" ref="calendar"></punch-calendar> -->
		</view>
		<view style="margin: 30rpx 0 20rpx 40rpx;font-size: 17px;font-weight: bold;">根据你的运动偏好推荐</view>
		<view v-for="(item,index) in items" :key="index" class="card">
			<view style="display: flex;align-items: center;margin: 20rpx;">
				<image :src="item.bgimg" style="height: 100rpx;width: 100rpx;border-radius: 10px;"></image>
				<view style="margin-left: 20rpx;">
					<view style="font-size: 17px;margin-bottom: 10rpx;width: 400rpx; white-space: nowrap;overflow: hidden; text-overflow: ellipsis;">{{item.title}}</view>
					<view style="font-size: 13px;color: #a7a7a7;"><text>{{item.grade}}</text>·<text>{{item.time}}</text>·<text>{{item.consume}}</text></view>
				</view>
			</view>
		</view>
		<image src="../../static/icons/添加.png" style="height: 150rpx;width: 150rpx;position: fixed;bottom: 50px;right: 20px;" @click="opensch"></image>
		<uni-popup ref="popup" background-color="#fff" type="bottom" border-radius="12px 12px 0 0">
			<view style="height:220px;display: flex;flex-direction: column; align-items: center;justify-content: space-around;">
				<view style="font-size: 18px;font-weight: bold;">周目标</view>
				<view style="color: gray;">请输入周目标：每周的运动天数</view>
				<view style="display: flex;">
					<input v-model="weekdays" type="number" style="border: none;border-bottom: 1px solid #a5a5a5;
					width: 100px;font-size: 50px;text-align: center;height: 50px;font-weight: bold"></input><text style="margin-top: 26px;">天</text>
					</view>
				<button type="primary" style="height: 50px;line-height: 50px;width: 70%;border-radius: 50px;" @click="submit">确认</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import zsyCalendar from '../../uni_modules/zsy-calendar/components/zsy-calendar/zsy-calendar'
	export default {
		components: {
		            zsyCalendar
		        },
		data() {
			return {
				date: '3月11日',
				markedDates:[],
				items:[],
				avatar:uni.getStorageSync('xm-user').avatar,
				weekdays:uni.getStorageSync('weekdays'),
				alreadysportdays:0,
			}
		},
		onLoad() {
			let that=this;
			let currentDate = new Date();
			let currentMonth = currentDate.getMonth() + 1;
			let currentDay = currentDate.getDate(); 
			this.date=currentMonth+'月'+currentDay+'日';
			let timer = setTimeout(()=>{
				this.addTimer()
			},2000)
			
			//推荐课程
			var userId = uni.getStorageSync('userdata').userid;
			var userBMI = uni.getStorageSync('userdata').bmi;
			var wantcourse=JSON.parse(uni.getStorageSync('userdata').wantcourse);
			var recommendedCourses = [];
			var sportCounts = {
			    '户外步行': 0,
			    '户外跑步': 0,
			    '户外骑行': 0
			};
			this.$request.get(`/sport/selectById/${userId}`).then(res => {
				var userSports = res.data.filter(function(item) {
				    return item.userid === userId;
				});
				for (let i = 0; i < userSports.length; i++) {
				    var sportType = userSports[i].type;
				    switch (sportType) {
				        case 0:
				            sportCounts['户外步行']++;
				            break;
				        case 1:
				            sportCounts['户外跑步']++;
				            break;
				        case 2:
				            sportCounts['户外骑行']++;
				            break;
				        default:
				            break;
				    }
				}
				var maxSportType = Object.keys(sportCounts).reduce(function(a, b) { 
				    return sportCounts[a] > sportCounts[b] ? a : b; 
				});
				this.$request.get('/course/selectAll').then(res => {
					var courses=res.data;
					switch (maxSportType) {
					    case '户外跑步':
					        recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'户外跑步')))] ;
					        recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'拉伸')))] ;
					        recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'热身放松')))] ;
					        break;
					    case '户外步行':
					        recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'热身放松')))] ;
					        recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'助眠冥想')))] ;
					        break;
					    case '户外骑行':
					        recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'单车燃脂')))] ;
					        recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'拉伸')))] ;
					        break;
					    default:
					        break;
					}
					if (userBMI >= 25) {
					        recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'单车燃脂')))] ;
							recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'跳绳燃脂')))] ;
					    }
          else {
					        recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'拉伸')))] ;
					        recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'热身放松')))] ;
							recommendedCourses = [...new Set(recommendedCourses.concat(that.getCoursesByType(courses,'助眠冥想')))] ;
					    }
					var wantCourses = [];
					for (let j = 0; j < wantcourse.length; j++) {
					    var courseId = wantcourse[j];
					    var course = courses.find(function(item) {
					        return item.id === courseId;
					    });
					    if (course) {
					        wantCourses.push(course);
					    }
					}
					recommendedCourses = [...new Set(recommendedCourses.concat(wantCourses))] ;
					recommendedCourses.sort(() => 0.5 - Math.random());
					recommendedCourses = recommendedCourses.slice(0, 5);
					that.items=recommendedCourses;
				})
			})
			let timestamps=JSON.parse(uni.getStorageSync('userdata').sportdate)
			if (!this.hasThreeWorkoutDaysInWeek(timestamps)) {
			    console.log("您本周还没有完成运动计划，请进行运动！");
				this.allowsend()
				this.sendMsg()
			} else {
			    console.log("您本周已完成运动计划，继续保持！");
			}
			
			
		},
		methods: {
			getCoursesByType(courses,type) {
			    return courses.filter(function(course) {
			        return course.type === type;
			    });
			},
			change(e) {
				console.log(e)
			},
			opensch(){
				this.$refs.popup.open('bottom')
			},
			allowsend(){
				uni.requestSubscribeMessage({
					tmplIds:['dvXu3GQfCF-5_2aAjOD7fb-28bU9NbqWkWtaWa76XDc'],
					success(res){
						console.log(res)
					}
				})
			},
			sendMsg(){
				let openid=uni.getStorageSync('user')
				let result = `${this.alreadysportdays}/${this.weekdays}`
				let target = `每周运动${this.weekdays}天`
				let message={thing1:"周运动天数计划",thing7:target,character_string8:result,thing4:"您还没有完成本周运动目标",thing9:"记得规律锻炼喔"}
				message=JSON.stringify(message) 
				this.$request.post('/sendMsg',{
					"openid":openid,
					"msg":message
				}).then(res => {
					console.log(res)
				})
			},
			submit(){
				uni.setStorageSync('weekdays',this.weekdays)
				this.$refs.popup.close()
			},
			addTimer() {
				this.$request.get(`/user/selectUserDataById/${uni.getStorageSync('xm-user').id}`).then(res => {
					let sportdate=JSON.parse(res.data.sportdate);
					 sportdate.forEach(e=>{ 
						let date = new Date(e);
						let year = date.getFullYear();
						let month = String(date.getMonth() + 1).padStart(2, '0');
						let day = String(date.getDate()).padStart(2, '0');
						let formattedDate= `${year}-${month}-${day}`;
						this.markedDates.push(formattedDate);
					 })
				})
				
				
			},
			hasThreeWorkoutDaysInWeek(timestamps) {
			    const now = Date.now();
			    const oneWeekInMillis = 7 * 24 * 60 * 60 * 1000;
			    const oneWeekAgo = now - oneWeekInMillis;
			    const workoutsThisWeek = timestamps.filter(ts => ts >= oneWeekAgo && ts <= now);
			    const uniqueWorkoutDays = new Set(workoutsThisWeek.map(ts => new Date(ts).toDateString()));
				let weekdays=uni.getStorageSync('weekdays')
				this.alreadysportdays=uniqueWorkoutDays.size
			    return uniqueWorkoutDays.size >= weekdays;
			},
			switchStep(e){
				uni.navigateTo({
					url: '/pages/walk/walk?type='+e
				});
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
	.calendar-content{
		width: 90%;
		margin: 40rpx 5%;
		border-radius: 10px;
	}
	.card{
		width: 90%;
		height: 150rpx;
		margin: 20rpx 5%; 
		background-color: white;
		border-radius: 10px;
		display: flex;
	}
</style>
