<template>
	<view>
		<!-- <timer></timer>
		<view v-if="showmap"> -->
			<sportmap ref="mapRef" @update-distance="updatedistance" :sporticon="sporticon" :sporttitle="sporttitle"></sportmap>
			<uppage @pause-map="pauseMap" @start-map="startMap" @end-map="endMap" :alltime="form.alltime" :disnum="form.disnum" :typenum="form.typenum"
					:typetext="typetext" :stepnum="form.stepnum" :consumption="form.consumption" :steptext="steptext"></uppage>
		<!-- </view> -->
		
	</view>
</template>

<script>
	import timer from 'components/timer.vue';
	import sportmap from 'components/sportmap.vue';
	import uppage from 'components/uppage.vue';
	export default {
		components: {
		    timer,
			sportmap,
			uppage
		},
		data() {
			return {
				showmap:false,
				isTimerRunning: false,	
				type: 1,
				timerId: null,
				time: 0,
				typetext: '步频',
				steptext: '步数',
				sporttitle: '',
				sporticon: '',
				form:{
					alltime: '00:00',
					disnum: '0.00',
					typenum: '0',
					stepnum: 0,
					consumption: 0,
					stepfre:0,
					date:'',
				},
				sportdata:[],
				totalTimeInMinutes:0,
				speeds:[],
				timerCount:0
				
			}
		},
		mounted() {
			setTimeout(() => {
			  this.showmap = true;
			}, 3000);
		},
		onLoad(e){
			this.type=e.type
			if(e.type==='0'){
				this.sporttitle='户外行走'
				this.typetext='步频'
				this.sporticon='../static/icons/walk.png'
			}
			else if(e.type==='1'){
				this.sporttitle='户外跑步'
				this.typetext='配速'
				this.sporticon='../static/icons/run.png'
			}
			else{
				this.steptext='高度'
				this.sporttitle='户外骑行'
				this.typetext='时速'
				this.sporticon='../static/icons/bike.png'
			}
		},
		computed: {
		    formattedTime() {
		        const minutes = Math.floor(this.time / 60).toString().padStart(2, '0');
		        const seconds = (this.time % 60).toString().padStart(2, '0');
		        this.form.alltime = `${minutes}:${seconds}`;
				let s=this.time/60;
				this.totalTimeInMinutes=s;
		    }
		},
		methods: {
			startMap(){
				if (!this.isTimerRunning) {
					this.timerId = setInterval(() => {
					  this.time++;
					}, 1000);
					this.isTimerRunning = true;
				} 
				this.$refs.mapRef.startDrawingPath();
			},
			pauseMap(){
				clearInterval(this.timerId);
				this.isTimerRunning = false;
				this.$refs.mapRef.stopDrawingPath();
			},
			endMap(){
				clearInterval(this.timerId);
				this.sportdata=this.$refs.mapRef.endSport();
				let upform=this.form;
				
				let currentDate = new Date();
				let timestamp=currentDate.getTime();
				let year = currentDate.getFullYear();
				let month = String(currentDate.getMonth() + 1).padStart(2, '0');
				let day = String(currentDate.getDate()).padStart(2, '0');
				let hours = String(currentDate.getHours()).padStart(2, '0');
				let minutes = String(currentDate.getMinutes()).padStart(2, '0');
				let formattedDate= `${year}/${month}/${day}-${hours}:${minutes}`;
				this.form.date=formattedDate;
				
				if(this.type==='1'){
					let sum = this.speeds.reduce((acc, curr) => acc + parseFloat(curr), 0);
					let temp = sum / this.speeds.length;
					let paceMinutes = Math.floor(temp);
					let paceSeconds = Math.round((temp - paceMinutes) * 60);
					let averagePace = `${paceMinutes}\'${paceSeconds}\"`;
					upform.typenum=averagePace;
				}
				if(this.type==='2'){
					let sum = this.speeds.reduce((acc, curr) => acc + parseFloat(curr), 0);
					let averagePace = sum / this.speeds.length;
					upform.typenum=averagePace.toFixed(2);
				}
				
				
				let s1=JSON.stringify(this.sportdata[0]);
				let s2=JSON.stringify(this.sportdata[1]);
				upform.markers=s1;
				upform.polyline=s2;
				upform.userid=uni.getStorageSync('xm-user').id;
				upform.type=this.type;
				
				let sportdate=JSON.parse(uni.getStorageSync('userdata').sportdate) 
				sportdate.push(timestamp);
				let allconsum=uni.getStorageSync('userdata').allconsum;
				let all=allconsum+upform.consumption;
				this.$request.put('/user/updateUserData', {
					allconsum:all,
					sportdate:JSON.stringify(sportdate)
				}).then(e => {
					console.log(e);
				})
				this.$request.post('/sport/add', upform).then(res => {
					console.log(res)
					let form=JSON.stringify(this.form)
					console.log(this.form)
					uni.redirectTo({
						url: '/pages/completesport/completesport?form='+form+'&type='+this.type
					});
				})
				
			},
			updatedistance(data){
				this.form.disnum=(data.distance).toFixed(2).toString();
				if (this.timerCount % 10 === 0 && this.timerCount!=0) {
					let steps = (data.distance*1000).toFixed(2) / 0.75;//步数
					let averageCadence = (steps / this.totalTimeInMinutes).toFixed(0);//步频
					let calories = (uni.getStorageSync('userdata').weight * (data.distance).toFixed(2) * 65/1000).toFixed(0);
					this.form.consumption=calories.toFixed(0);
					this.form.stepfre=averageCadence.toFixed(0);
					this.form.stepnum=steps.toFixed(0);
					if(this.type==='0'){
						this.form.typenum=averageCadence.toFixed(0);
					}
					
					if(this.type==='1'){//速度
						let pace = this.totalTimeInMinutes / data.distance;
						this.speeds.push(pace.toFixed(2));
						let paceMinutes = Math.floor(pace);
						let paceSeconds = Math.round((pace - paceMinutes) * 60);
						let paceString = `${paceMinutes}'${paceSeconds}"`;
						this.form.typenum=paceString;  
					}
					
					if(this.type==='2'){
						let pace = data.distance/(this.totalTimeInMinutes/60);
						this.form.typenum = pace.toFixed(2);
						this.speeds.push(pace.toFixed(2));
						this.form.stepnum = data.altitude;
					}
				     
				}
				this.timerCount++;
			},
			beforeDestroy() {
			    clearInterval(this.timerId);
			}
		}
	}
</script>

<style>

</style>
