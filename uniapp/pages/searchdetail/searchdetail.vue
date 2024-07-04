<template>
  <view>
	<view style="position: fixed;z-index: 999;">
		<searchinput :hotWords="hotWords" style="position: fixed;"></searchinput>
		<wuc-tab style="position: absolute;top: 120rpx;left: 40rpx;"
		:tab-list="tabList" :tabCur="TabCur" @change="tabChange" 
		tab-class="text-center text-black bg-white" 
		select-class="text-x2"></wuc-tab>
	</view>
    <view style="top: 120px; height: 100vh; width: 100%;position: fixed;">
		<swiper :current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
			<swiper-item>
				<scroll-view scroll-y=true style="height: 80vh;" class="bg-white padding text-center text-black">
					<view style="display: flex;flex-wrap: wrap;flex-direction: row; justify-content: space-between;">
						<view v-if="courses.length===0" style="color: gray;margin: 40rpx auto;">
							没有找到相关内容
						</view>
						<view v-else v-for="(item,index) in courses" :key="index" class="content-box" @click="switchCourse(item.id)">
							<image :src="item.bgimg" style="height: 80%;border-radius: 5rpx;margin-left: 20rpx;"></image>
							<view style="margin-left: 30rpx;width: 55%;display: flex;justify-content: flex-start;flex-direction: column;">
								<view class="text1">{{item.title}}</view>
								<view class="text2">{{item.type}}</view>
								<view class="text2">{{item.grade}} · {{item.time}}</view>
							</view>
						</view>
						
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y=true style="height: 80vh;" class="bg-white padding text-center text-black">
					<view style="display: flex;flex-wrap: wrap;flex-direction: row; justify-content: space-between;">
						<view v-if="shares.length===0" style="color: gray;margin: 40rpx auto;">
							没有找到相关内容
						</view>
						<view v-else v-for="(item,index) in shares" :key="index" class="item" @click="switchShare(item.id)">
							<view style="width: 100%;height: 80%;">
								<image :src="item.bgimg" style="width: 100%;height: 100%;border-radius: 5px;"></image>
							</view>
							<view style="width: 100%;height: 14%;text-align: left;margin-top: 10rpx;">
								{{item.title}}
							</view>
							<view style="width: 100%;height: 8%;display: flex;
							flex-direction: row;align-items: center; justify-content: space-between;">
								<view style="display: flex;flex-direction: row;align-items: center;">
									<image :src="item.avatar" style="height: 20px;width: 20px;border-radius: 50%;margin-right: 5rpx;"></image>
									<view style="font-size: 12px;">{{item.name}}</view>
								</view>
								<view style="display: flex;flex-direction: row;align-items: center;margin-right: 24rpx;">
									<image src="../../static/icons/点赞.png" style="height: 20px;width: 20px;margin-right: 5rpx;"></image>
									<view style="font-size: 12px;color: gray;">{{item.likes}}</view>
								</view>
								
							</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view scroll-y=true style="height: 80vh;" class="bg-white padding text-center text-black">
					<view style="display: flex;flex-wrap: wrap;flex-direction: row; justify-content: space-between;">
						<view v-if="users.length===0" style="color: gray;margin: 40rpx auto;">
							没有找到相关内容
						</view>
						<view v-else v-for="(item,index) in users" :key="index" class="users">
							<view style="display: flex;align-items: center;" @click="switchSelf(item.id)">
								<img :src="item.avatar" style="width: 60rpx;height: 60rpx;border-radius: 50%;margin-right: 20rpx;"/>
								<text>{{item.username}}</text>
							</view>
							<view :class="item.isattention?'yes':'no'" @click="isfans(index)">{{item.text}}</view>
						</view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
	  
  </view>
</template>

<script>
import searchinput from 'components/searchinput.vue';
import WucTab from 'components/wuc-tab/wuc-tab.vue';
import { obj2style } from 'utils/index';
export default {
	components:{
		searchinput,
		WucTab
	},
    data() {
        return {
			hotWords:[],
            tabList: [{ name: '课程' }, { name: '动态' },{ name: '用户' }],
            TabCur: 0,
			courses:[],
			shares:[],
			users:[],
        };
    },
    computed: {
        CustomBar() {
            let style = {};
            // #ifdef MP-WEIXIN
            const systemInfo = uni.getSystemInfoSync();
            let CustomBar =
              systemInfo.platform === "android"
                ? systemInfo.statusBarHeight + 50
                : systemInfo.statusBarHeight + 45;
            style['top'] = CustomBar + 'px';
            // #endif
            // #ifdef H5
            style['top'] = 0 + 'px';
            // #endif
            return obj2style(style);
        }
    },
	onLoad(e){
		console.log(e)
		this.$request.get('/hotsearch/selectAll').then(res => {
			this.hotWords = this.hotWords.concat(res.data.slice(0, 3));
		})
		this.$request.get(`/share/selectAll?title=${e.value}`).then(res => {
			console.log(res.data);
			this.shares=res.data
		})
		this.$request.get(`/user/selectAll?username=${e.value}`).then(res => {
			console.log(res.data)
			if(res.data!=null){
				res.data.forEach(item => {
				item.isattention=false
				item.text='关注'
				})
			}
			this.users=res.data
		})
		this.$request.get(`/course/selectAll?title=${e.value}`).then(res => {
			console.log(res.data);
			this.courses=res.data
		})
	},
    methods: {
        tabChange(index) {
            this.TabCur = index;
        },
        swiperChange(e) {
            let { current } = e.target;
            this.TabCur = current;
        },
		switchShare(id){
			let share = JSON.stringify(this.shares.find(item => item.id === id))
			uni.redirectTo({
				url: '/pages/sharedetail/sharedetail?share='+share
			});
		},
		switchCourse(id){
			uni.navigateTo({
				url: '/pages/coursedetail/coursedetail?id='+id
			});
		}
    },
    onReady() {}
};
</script>
<style>
swiper {
	box-sizing: border-box;
}
.swiper {
	width: 100%;
    height: 100%;
	position: absolute;
}

.cu-bar {
	display: flex;
	position: relative;
	align-items: center;
	min-height: 100upx;
	justify-content: space-between;
}

.cu-bar .action {
	display: flex;
	align-items: center;
	height: 100%;
	justify-content: center;
	max-width: 100%;
  background-color: #ffffff;
}

.cu-bar .action:first-child {
	margin-left: 30upx;
	font-size: 30upx;
}

.solid,
.solid-bottom {
	position: relative;
}

.solid::after,
.solid-bottom::after{
	content: " ";
	width: 200%;
	height: 200%;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: inherit;
	transform: scale(0.5);
	transform-origin: 0 0;
	pointer-events: none;
	box-sizing: border-box;
}

.solid::after {
	border: 1upx solid rgba(0, 0, 0, 0.1);
}

.solid-bottom::after {
	border-bottom: 1upx solid rgba(0, 0, 0, 0.1);
}

.text-orange{
  color:#f37b1d
}
.text-black{
  color:#333333;
}
.bg-white{
    background-color: #ffffff;
}

.padding {
	padding: 30upx;
}

.margin {
	margin: 30upx;
}

.margin-top {
	margin-top: 30upx;
}
.text-center {
    text-align: center;
}
.item{
	/* border: 1px solid black; */
	width: 49%;
	height: 525rpx;
	margin-top: 20rpx;
	border-radius: 5px;
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
	text-align: left;
}
.users{
		width: 90%;
		height: 100rpx;
		margin: 10px 5%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.yes{
		width: 150rpx;
		height: 50rpx;
		border-radius: 50rpx;
		background-color: white;
		border: 1rpx solid #07b46c;
		text-align: center;
		line-height: 50rpx;
	}
	.no{
		width: 150rpx;
		height: 50rpx;
		border-radius: 50rpx;
		background-color: #07b46c;
		color: white;
		text-align: center;
		line-height: 50rpx;
	}
</style>
