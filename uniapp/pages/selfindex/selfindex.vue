<template>
	<view>
		<view style="height: 300rpx;width: 100%;background-color: #7e6af8;position: fixed;"></view>
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
			<view style="margin:5px 0 0 60rpx;font-size: 18px;">{{inform.username}}</view>
			<view style="width: 90%;margin: 10rpx 5%;font-size: 14px;">{{inform.info}}</view>
			<view class="row1" style="width: 90%; color: #a7a7a7;display: flex;margin: 15rpx auto;align-items: center;justify-content: space-between;">
				<view class="inform"><text>{{inform.sex}}</text><text>|</text><text>{{inform.address}}</text></view>
				<navigator v-if="isauthor" style="height: 40rpx;width: 180rpx;border: solid 1px #e7e7e7;border-radius: 10px;display: flex;justify-content: center;" url="/pages/userinfor/userinfor">
					<text style="margin-right: 10rpx;">修改资料</text><uni-icons type="right" size="15"></uni-icons>
				</navigator>
			</view>
			<view class="box">
				<image src="../../static/icons/编辑.png" style="height: 140rpx;width: 140rpx;position: fixed;bottom: 50px;right: 20px;z-index: 99;" @click="openfabu"></image>
				<uni-popup ref="popup2" background-color="#fff" type="bottom" border-radius="12px 12px 0 0">
					<view style="height:160px;display: flex;align-items: center;justify-content: space-around;">
						<view class="fabubox">
							<image src="../../static/icons/发动态.png" style="height: 120rpx;width: 120rpx;padding-bottom: 20rpx;" @click="switchput"></image>
							<view>发动态</view>
						</view>
						<view class="fabubox">
							<image src="../../static/icons/发视频.png" style="height: 120rpx;width: 120rpx;padding-bottom: 20rpx;" @click="switchupcourse"></image>
							<view>发课程</view>
						</view>
						
					</view>
				</uni-popup>
				<uni-popup ref="popup" background-color="#fff" type="bottom" border-radius="12px 12px 0 0">
					<view style="height:80px;display: flex;align-items: center;justify-content: center;"><text style="font-size: 17px;color: red;" @click="deleteshare">删除</text></view>
				</uni-popup>
				<uni-popup ref="popup3" background-color="#fff" type="bottom" border-radius="12px 12px 0 0">
					<view style="height:80px;display: flex;align-items: center;justify-content: center;"><text style="font-size: 17px;color: red;" @click="deletecourse">删除</text></view>
				</uni-popup> 
				<view style="position: fixed;z-index: 1;width: 100%;">
					<wuc-tab style="top: 120rpx;left: 40rpx;"
					:tab-list="tabList" :tabCur="TabCur" @change="tabChange" 
					tab-class="text-center text-black bg-white" 
					select-class="text-x2"></wuc-tab>
				</view>
				<view style="top: 275px; height: 100vh; width: 100%;position: fixed;">
					<swiper :current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
						<swiper-item>
							<scroll-view scroll-y=true style="height: 65vh;">
								<view style="display: flex;flex-wrap: wrap;flex-direction: row; justify-content: space-between;">
									<view v-if="share.length===0" style="color: gray;margin: 40rpx auto;">
										还没有动态，快去发布吧
									</view>
									<view v-else class="content" v-for="(item,index) in share" :key="index">
										<view style="display: flex;align-items: center;">
											<image :src="inform.avatar" style="height: 50px;width: 50px;border-radius: 50%;margin-right: 20rpx;"></image>
											<view>
												<view style="font-size: 17px;">{{inform.username}}</view>
												<view style="margin-top: 10rpx;color: #b5b5b5;">{{item.sharetime}}</view>
											</view>
											<view style="position: absolute;right: 20px;font-size: 16px;" @click="open(item.id)">· · ·</view>
											
										</view>
										<view style="margin-top: 40rpx;">
											<view style="font-weight: bold;font-size: 17px;margin-bottom: 10px;">{{item.title}}</view>
											<view style="width: 100%;white-space: nowrap;overflow: hidden; text-overflow: ellipsis;margin-bottom: 10px;">{{item.content}}</view>
											<image :src="item.bgimg" style="height: 400rpx;width: 300rpx;border-radius: 10px;"></image>
										</view>
										<view v-if="share.length>1" style="height: 1px;width: 100%;background-color: #e3e3e3;margin: 20rpx 0;"></view>
									</view>
								</view>
							</scroll-view>
						</swiper-item>
						<swiper-item>
							<scroll-view scroll-y=true style="height: 80vh;" class="bg-white padding text-center text-black">
								<view style="display: flex;flex-wrap: wrap;flex-direction: row; justify-content: space-between;">
									<view v-if="courses.length===0" style="color: gray;margin: 40rpx auto;">
										还没有上传课程，快去上传吧
									</view>
									<view v-else v-for="(item,index) in courses" :key="index" class="content-box">
										
										<image :src="item.bgimg" style="height: 80%;width: 45%; border-radius: 5rpx;margin-left: 20rpx;" @click="switchCourse(item.id)"></image>
										<view style="margin-left: 30rpx;width: 55%;display: flex;justify-content: flex-start;flex-direction: column;">
											<view class="text1">{{item.title}}</view>
											<view class="text2">{{item.type}}</view>
											<view class="text2">{{item.grade}} · {{item.time}}</view>
										</view>
										<view style="font-size: 16px;margin-right: 5px;width: 50px;margin-top: -70px;" @click="opencourse(item.id)">· · ·</view>
									</view>
								</view>
							</scroll-view>
						</swiper-item>
					</swiper>	
				</view>
	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inform:{},
				attention:0,
				fans:0,
				praised:0,
				share:[],
				isauthor:false,
				tabList: [{ name: '动态' }, { name: '课程' }],
				TabCur: 0,
				courses:[],
				deleteid:'',
				deletecourseid:''
			}
		},
		onLoad(e){
			console.log(e)
			let userid=e.id
			if(userid===undefined){
				this.inform=uni.getStorageSync('xm-user')
				userid=this.inform.id
				this.isauthor=true
			}
			this.$request.get(`/user/selectById/${userid}`).then(res => {
				this.inform=res.data
				this.attention=JSON.parse(res.data.attention).length;
				this.fans=JSON.parse(res.data.fans).length;
				this.praised=JSON.parse(res.data.praised).length;
			})
			
			this.$request.get(`/share/selectById/${userid}`).then(res => {
				if(res.data!=null){
					let share=res.data;
					share.forEach(e =>{
						let givenTime = new Date(e.sharetime);
						e.sharetime=this.formatTimeDifference(givenTime);
					})
					this.share=share;
				}
				
			})
			
			this.$request.get(`/course/selectAll?uploader=${this.inform.username}`).then(res => {
				console.log(res.data);
				this.courses=res.data
			})
			
		},
		methods: {
			open(index){
				this.$refs.popup.open('bottom')
				this.deleteid=index
			},
			opencourse(index){
				this.$refs.popup3.open('bottom')
				this.deletecourseid=index
			},
			openfabu(){
				this.$refs.popup2.open('bottom')
			},
			switchput(){
				uni.navigateTo({
					url: '/pages/upshare/upshare'
				});
			},
			switchupcourse(){
				uni.navigateTo({
					url: '/pages/upcourse/upcourse'
				});
			},
			switchFans(){
				if(this.isauthor){
					uni.navigateTo({
						url: '/pages/attention/attention'
					});
				}
				
			},
			switchCourse(id){
				uni.navigateTo({
					url: '/pages/coursedetail/coursedetail?id='+id
				});
			},
			tabChange(index) {
			    this.TabCur = index;
			},
			swiperChange(e) {
			    let { current } = e.target;
			    this.TabCur = current;
			},
			deleteshare(){
				let that=this
				let id=this.deleteid
				uni.showModal({
						content: '确认要删除该项吗？',
						success: function(res) {
						if (res.confirm) {
							console.log('点击了确认')
							that.$request.del(`/share/delete/${id}`).then(res => {
								console.log(res)
								that.$refs.popup.close()
								that.onLoad();
							})
						} else {
							console.log('点击了取消')
							that.$refs.popup.close()
						}
					}
				})
			},
			deletecourse(){
				let that=this
				let id=this.deletecourseid
				uni.showModal({
						content: '确认要删除该项吗？',
						success: function(res) {
						if (res.confirm) {
							console.log('点击了确认')
							that.$request.del(`/course/delete/${id}`).then(res => {
								console.log(res)
								that.$refs.popup3.close()
								that.onLoad();
							})
						} else {
							console.log('点击了取消')
							that.$refs.popup3.close()
						}
					}
				})
			},
			formatTimeDifference(givenTime) {
			    // 获取当前时间
			    const currentTime = new Date();
			    
			    // 给定时间的年、月、日、时、分、秒
			    const givenYear = givenTime.getFullYear();
			    const givenMonth = givenTime.getMonth();
			    const givenDate = givenTime.getDate();
			    const givenHours = givenTime.getHours();
			    const givenMinutes = givenTime.getMinutes();
			    
			    // 当前时间的年、月、日、时、分、秒
			    const currentYear = currentTime.getFullYear();
			    const currentMonth = currentTime.getMonth();
			    const currentDate = currentTime.getDate();
			    const currentHours = currentTime.getHours();
			    const currentMinutes = currentTime.getMinutes();
			    
			    // 计算时间差
			    const timeDifference = currentTime - givenTime;
			    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
			    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
			    
			    if (minutesDifference < 1) {
			            return "刚刚";
			    }else if (givenYear === currentYear && givenMonth === currentMonth && givenDate === currentDate) {
			        if (hoursDifference < 1) {
			            return `${minutesDifference}分钟前`;
			        } else {
			            return `${hoursDifference}小时前`;
			        }
			    } else {
			        return `${givenYear}-${givenMonth}-${givenDate} ${givenHours}:${givenMinutes}`;
			    }
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
	.box{
		width: 100%;
		margin-top: 20px;
		background-color: white;
	}
	.content{
		width: 90%;
		margin: 20px 5%;
	}
	.fabubox{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.text-black{
	  color:#333333;
	}
	.bg-white{
	    background-color: #ffffff;
	}
	.text-center {
	    text-align: center;
	}
	.padding {
		padding: 30upx;
	}
	.swiper {
		width: 100%;
	    height: 100%;
		position: absolute;
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
		text-align: left;
		font-size: 18px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.text2{
		padding-top: 10rpx;
		color: gray;
		text-align: left;
	}
</style>
