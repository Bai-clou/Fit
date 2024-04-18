# 仿钉钉日历组件 支持月与周两种模式的左右滑动切换 支持在APP、小程序、H5运行

```javascript
<template>
	<view class="calendar_container">
		<zsyCalendar
			:sundayIndex="6"
			@change="change"
		/>
	</view>
</template>

<script>
	import zsyCalendar from '@/components/zsy-calendar/zsy-calendar'
	export default {
		name: 'Calendar',
		components: {
			zsyCalendar
		},
		methods: {
           // 日历选中日期改变事件回调
			change(e) {
				console.log(e)
			}
		}
	}
</script>
<style>
	.calendar_container {
		min-height: calc(100vh - var(--window-top));
		background-color: #f5f5f5;
		padding: 30rpx;
		box-sizing: border-box;
	}
</style>
// Vue
```
***
##### 通用日历，可标记，支持自定义主题颜色，列高度的自定义

1. 日历展开模式显示的是月历，上月份跟下月份的日期呈灰色显示，点击对应的日期可滑动到相应的月份并且高亮显示；
2. 日历收缩时显示的是周历，可以进行周之间滑动的切换，且点击上月份的日期时自动切换到上月，具体请看效果演示图或自行尝试；
3. 因本人工作项目需求暂没有做日期选择器，但我在里面增加了一个goToDate方法可以切换到某一天，并且加了一个回到今天的功能，如果你们有这个需求可以自行二次开发；
4. 该日历组件使用一个轮播组件，根据不同模式区分数据显示来分别对应月历跟周历，使用三个swiper-item并且显示相邻的数据，即可以达到无限循环的效果又可以节省性能，并且当组件滑动完毕后才进行数据的预生成，避免滑动过程中计算数据造成页面不流畅卡顿；
5. 项目源码注释清晰且不难理解，可自行根据实际需求进行二次开发；
6. 本插件本人还未进行深度测试，可能还有些隐藏BUG暂未发现，若有小伙伴发现可进行评论留言；
7. 项目也已上传到github，麻烦各位大佬们帮忙点点start
***
##### 组件属性说明：
|属性名|类型|默认值|说明|
|:--:|:--:|:--:|:--:|
|duration|Number|300|动画时长|
|cellHeight|Number|75|日历每一列的高度，单位为rpx|
|dateActiveColor|String|#FE6601|日期选中颜色|
|sundayIndex|Number|6|星期天所在位置，范围为0~6|
|mode|String|'open'|日历模式 'open'为月历 'close'为周历|
|changeSetDefault|Boolean|true|月历切换是否默认选中1号|
|defaultSelectedDate|String Null|null|选中日期，默认为当天|
***
##### 方法说明：
|属性名|说明|
|:--:|:--:|
|goToDate|切换到某一天日期 格式 YYYY-MM 或者 YYYY-MM-DD|
***
##### 事件说明：
|属性名|说明|
|:--:|:--:|
|change|日历选中日期改变事件回调|
***
##### 插件实际运行效果预览：
![avatar](https://i.328888.xyz/2023/03/17/LWMfV.gif)
##### 项目实际运行效果预览：
![avatar](https://i.328888.xyz/2023/03/17/LWTFb.gif)
##### 线上预览地址：
[点击访问](https://static-ffcb1110-1b39-410a-b1f6-c2e57fd34cd4.bspapp.com/zsy-calendar)