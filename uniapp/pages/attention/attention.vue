<template>
	<view>
		<wuc-tab :tab-list="tabList" :tabCur.sync="TabCur" textFlex @change="tabChange" tab-class="text-center text-black bg-white" select-class="text-x2"></wuc-tab>
		<view style="height: 100vh; width: 100%;position: fixed;">
			<swiper :current="TabCur" class="swiper" duration="300" :circular="true" indicator-color="rgba(255,255,255,0)" indicator-active-color="rgba(255,255,255,0)" @change="swiperChange">
			  <swiper-item>
				<scroll-view scroll-y=true style="height: 100vh;" class="bg-white padding text-center text-black">
					<view v-if="attentions.length===0">
						<view style="position: absolute;left: 30%;top: 25%;">
							<img src="../../static/icons/无关注.png" style="height: 200rpx;width: 300rpx;"/>
							<view style="color: gray;margin-right: 40rpx;">还没有关注哦</view>
						</view>
					</view>
					<view v-else v-for="(item,index) in attentions" :key="index" class="item">
						<view style="display: flex;align-items: center;">
							<img :src="item.avatar" style="width: 60rpx;height: 60rpx;border-radius: 50%;margin-right: 20rpx;"/>
							<text>{{item.username}}</text>
						</view>
						<view :class="item.isattention?'yes':'no'" @click="attention(index)">{{item.text}}</view>
					</view>
				</scroll-view>
			  </swiper-item>
			  <swiper-item>
				<scroll-view scroll-y=true style="height: 100vh;" class="bg-white padding text-center text-black">
					<view v-if="fans.length===0">
						<view style="position: absolute;left: 35%;top: 25%;">
							<img src="../../static/icons/无粉丝.png" style="height: 200rpx;width: 200rpx;"/>
							<view style="color: gray;">还没有粉丝哦</view>
						</view>
					</view>
					<view v-else v-for="(item,index) in fans" :key="index" class="item">
						<view style="display: flex;align-items: center;" @click="switchSelf(item.id)">
							<img :src="item.avatar" style="width: 60rpx;height: 60rpx;border-radius: 50%;margin-right: 20rpx;"/>
							<text>{{item.username}}</text>
						</view>
						<view :class="item.isattention?'yes':'no'" @click="isfans(index)">{{item.text}}</view>
					</view>
				</scroll-view>
			  </swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [{ name: '我的关注' }, { name: '我的粉丝' }],
				TabCur: 0,
				attentions:[],
				fans: [],
				
			}
		},
		onLoad(){
			let that=this
			this.$request.get(`/user/selectById/${uni.getStorageSync('xm-user').id}`).then(res => {
				let att=JSON.parse(res.data.attention)
				let fans=JSON.parse(res.data.fans)
				att.forEach(item => {
					this.$request.get(`/user/selectById/${item}`).then(res =>{
						res.data.isattention=true
						res.data.text='已关注'
						that.attentions.push(res.data)
					})
				})
				fans.forEach(item2 => {
					this.$request.get(`/user/selectById/${item2}`).then(res =>{
						if(att.includes(item2)){
							res.data.isattention=true
							res.data.text='已关注'
						}
						else{
							res.data.isattention=false
							res.data.text='关注'
						}
						that.fans.push(res.data)
					})
				})
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
			attention(id){
				this.attentions[id].isattention=!this.attentions[id].isattention
				this.attentions[id].text=this.attentions[id].isattention?'已关注':'关注'
			},
			isfans(id){
				this.fans[id].isattention=!this.fans[id].isattention
				this.fans[id].text=this.fans[id].isattention?'已关注':'关注'
			},
			switchSelf(id){
				uni.navigateTo({
					url: '/pages/selfindex/selfindex?id='+id
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: white;
	}
	.swiper {
		width: 100%;
	    height: 100%;
		position: absolute;
	}
	.item{
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
	.text-black{
	  color:#333333;
	}
	.bg-white{
	    background-color: #ffffff;
	}
	
	.padding {
		padding: 30upx;
	}
	.text-center {
	    text-align: center;
	}
</style>
