<template>
	<view>  
		<searchinput :hotWords="hotWords"></searchinput>
		<view class="container">
		  <!-- 左侧分类栏 -->
		  <scroll-view class="category-list" scroll-y="true">
		    <view v-for="(category, index) in categories" :key="index" class="category-item" :class="{ 'selected': selectedCategoryIndex === index }" @tap="selectCategory(index)">
		      <view class="category-name">{{ category.name }}</view>
		      <view v-if="selectedCategoryIndex === index" class="selected-indicator"></view>
		    </view>
		  </scroll-view> 
		  <!-- 右侧商品列表 -->
		  <view style="height: 50px;width: 65%;left: 33%;position: absolute;">
			  <view class="dropdown-group">
			    <!-- 难度选择按钮 -->
			    <view class="dropdown-button" :class="{ 'selected': currentDropdownType === 'difficulty' && showDropdown===true }" @tap="toggleDropdown('difficulty')" ref="difficultyButton">
			      {{ difficultySelection.length === 0 ? '难度' : formatSelection(difficultySelection) }}
			    </view>
			    <!-- 部位选择按钮 -->
			    <view class="dropdown-button" :class="{ 'selected': currentDropdownType === 'part' && showDropdown===true }" @tap="toggleDropdown('part')" ref="partButton">
			      {{ partSelection.length === 0 ? '部位' : formatSelection(partSelection) }}
			    </view>
			    <!-- 时长选择按钮 -->
			    <view class="dropdown-button" :class="{ 'selected': currentDropdownType === 'duration' && showDropdown===true }" @tap="toggleDropdown('duration')" ref="durationButton">
			      {{ durationSelection.length === 0 ? '时长' : formatSelection(durationSelection) }}
			    </view>
			  
			    <!-- 下拉选择框 -->
			  	<view v-show="showDropdown" class="dropdown-menu" style="top: 120%; height: 250px;">
			  	  <view class="dropdown-content">
			  		<!-- 根据当前打开的选择按钮显示对应的选择项 -->
			  		<view class="dropdown-item" v-for="(item, index) in getCurrentOptions" :key="index" @tap="toggleSelection(currentDropdownType, item)">
			  		  <view class="option-circle" :class="{ 'selected': isSelected(currentDropdownType, item) }">{{ item }}</view>
			  		</view>
			  	  </view>
			  	  <view class="dropdown-footer">
			  		<view class="dropdown-action" @tap="resetSelection">重置</view>
			  		<view class="dropdown-action confirm" @tap="confirmSelection">确认</view>
			  	  </view>
			  	</view>
			  </view>
		  </view>
		  <scroll-view class="product-list" scroll-y="true">
		    <view v-for="(product, index) in selectedCategoryProducts" :key="index" class="product-item" @click="switchTo(product.id)">
				<view class="bgimg" :style="'background-image: url(' + product.bgimg + ')'">
					<view style="display: flex;flex-direction: row;align-items: center;padding: 30rpx 0;">
					<image :src="product.uploaderavatar" style="height: 20px;width: 20px;border-radius: 50%;margin-right: 10rpx;"></image>
					<view style="font-size: 14px;">{{product.uploader}}</view>
					</view>
					<view style="width: 80%;font-size: 18px; text-align: left; margin-bottom: 12rpx; overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{product.title}}</view>
					<view style="display: flex;flex-direction: row;font-size: 14px;color: white;">
						<view>{{product.grade}}<text style="margin: 0 10rpx;">·</text></view>
						<view>{{product.time}}<text style="margin: 0 10rpx;">·</text></view>
						<view>{{product.part}}</view>
					</view>
				</view>
				
		    </view>
		  </scroll-view>
		</view>
	</view> 
</template>

<script>
	import searchinput from 'components/searchinput.vue';
	import { cloneDeep } from 'lodash';
export default {
	components: {
	    searchinput
	},
	data() {
		return {
			hotWords:[],
			categories: [],
			initialCategories:[],
			selectedCategoryIndex: 0,
			showDropdown: false,
			currentDropdownType: '', 
			difficultyOptions: ['K1零基础', 'K2初学', 'K3进阶','K4强化','K5挑战'],
			partOptions: ['全身', '胸部', '腹部', '背部', '手臂', '腿部','腰部','肩部','臀部','颈部','脸部'],
			durationOptions: ['≤5min', '6-10min', '11-15min','16-20min','21-30min','≥31min'],
			difficultySelection: [],
			partSelection: [],
			durationSelection: []
		};
	},
	computed: {
	  selectedCategoryProducts() {
	    return this.categories[this.selectedCategoryIndex].products;
	  },
	  getCurrentOptions() {
	    switch (this.currentDropdownType) {
	      case 'difficulty':
	        return this.difficultyOptions;
	      case 'part':
	        return this.partOptions;
	      case 'duration':
	        return this.durationOptions;
	      default:
	        return [];
	    }
	  }
	},
	onLoad() {
		let that=this;
		let type=[];
		let courses=[];
		this.$request.get('/hotsearch/selectAll').then(res => {
			this.hotWords = this.hotWords.concat(res.data.slice(0, 3));
		})
		this.$request.get('/course/selectAllType').then(res => {
			console.log(res);
			type=res.data;
			this.$request.get('/course/selectAll').then(res => {
				console.log(res);
				courses=res.data;
				const categories = type.map(typeItem => {
				    const products = courses
				        .filter(course => course.type === typeItem.name)
				        .map(({ id,title, uploader,uploaderavatar,bgimg,grade,time,part }) => ({id, title, uploader,uploaderavatar,bgimg,grade,time,part }));
				    return { name: typeItem.name, products };
				}); 
				that.categories=categories;
				this.showCategories();
			})
		})
		
		
	},
	methods: {
		showCategories(){
			let allProducts = [];
			this.categories.forEach(category => {
				allProducts = allProducts.concat(category.products);
			});
			this.categories[0].products=allProducts;
			this.initialCategories=this.categories;
		},
		selectCategory(index) {
			if(index===0){
				let allProducts = [];
				this.categories[0].products=[];
				this.categories.forEach(category => {
				  allProducts = allProducts.concat(category.products);
				});
				this.categories[0].products=allProducts;
			}
			this.selectedCategoryIndex = index;
		},
		 searchFinish(result) {
			console.log(result)
		},
		toggleDropdown(type) {
		  // 如果当前已打开下拉选择框并且当前选择的下拉菜单类型与点击的类型相同，则关闭下拉选择框
		  if (this.showDropdown && this.currentDropdownType === type) {
		    this.showDropdown = false;
		    return;
		  }
		  this.currentDropdownType = type;
		  this.showDropdown = true;
		},
		toggleSelection(type, item) {
		  const index = this[type + 'Selection'].indexOf(item);
		  if (index === -1) {
		    this[type + 'Selection'].push(item);
		  } else {
		    this[type + 'Selection'].splice(index, 1);
		  }
		},
		isSelected(type, item) {
		  return this[type + 'Selection'].includes(item);
		},
		formatSelection(selection) {
		  if (selection.length === 0) return '';
		  const maxDisplayLength = 2; // 最大显示长度
		  const formatted = selection.join(', ');
		  return formatted.length > maxDisplayLength ? formatted.substring(0, maxDisplayLength) + '...' : formatted;
		},
		resetSelection() {
		  this[this.currentDropdownType + 'Selection'] = [];
		},
		confirmSelection() {
		  this.showDropdown = false;
		  this.filterCategories();
		},
		filterCategories() {
			let that=this;
			const difficulty = this.difficultySelection;
			const bodypart = this.partSelection;
			const duration = this.durationSelection;
			let cat = cloneDeep(this.initialCategories);
			if(difficulty.length === 0&&bodypart.length === 0&&duration.length === 0){
				this.categories=this.initialCategories;
			}
			else{
				cat.forEach(cat => {
					cat.products = cat.products.filter(product => {
					    const matchDifficulty = difficulty.length === 0 || difficulty.includes(product.grade);
						const matchBodypart = bodypart.length === 0 || bodypart.includes(product.part);
						const matchDuration = duration.length === 0 || duration.includes(that.getTimeRange(product.time));
						
						return matchDifficulty && matchBodypart && matchDuration;
					});
				  });
				this.categories = cat;
			}
			  
		},
		getTimeRange(time) {
		  // 解析具体时间字符串中的分钟数
		  const minutes = parseInt(time.match(/\d+/)[0]);
		  // 根据分钟数确定时间范围
		  if (minutes <= 5) {
		    return '≤5min';
		  } else if (minutes <= 10) {
		    return '6-10min';
		  } else if (minutes <= 15) {
		    return '11-15min';
		  } else if (minutes <= 20) {
		    return '16-20min';
		  } else if (minutes <= 30) {
		    return '21-30min';
		  } else {
		    return '≥31min';
		  }
		},
		switchTo(id){
			uni.navigateTo({
				url: '/pages/coursedetail/coursedetail?id='+id
			});
		}
	},
};
</script>

<style lang="scss" scoped>
	.container {
	  position: fixed;
	  display: flex;
	  margin-top: 120rpx;
	  height: 100vh;
	  width: 100%;
	}
	
	.category-list {
	  width: 30%; /* 左侧分类栏宽度 */
	  background-color: #f5f5f5; /* 浅灰色背景 */
	  overflow: hidden; /* 隐藏左侧分类栏的横向滚动条 */
	}
	
	.category-item {
	  padding: 15px 20px;
	  font-size: 18px;
	  text-align: center;
	  position: relative;
	}
	
	.selected {
	  background-color: #ffffff; /* 选中时背景颜色 */
	}
	
	.category-name {
	  font-size: 18px; /* 放大字体 */
	}
	
	.selected-indicator {
	  position: absolute;
	  left: 0;
	  top: 50%;
	  transform: translateY(-50%);
	  width: 6px;
	  height: 30px;
	  background-color: #00ff00; /* 小绿条颜色 */
	}
	
	.product-list {
		margin-top: 40px;
	  background-color: #ffffff; /* 白色背景 */
	  overflow: hidden; /* 隐藏右侧商品列表的横向滚动条 */
	  width: 70%;
	}
	
	.product-item {
	  padding: 5px 20px;
	  height: 200rpx;
	  width: 90%;
	  border-radius: 10rpx;
	  color: white;
	  // border: 1px solid black;
	}
	.bgimg{
		position: relative;
		height: 100%;
		width: 90%;
		padding-left: 20px;
		border-radius: 5px;
		background-size: cover;
		background-position: center;
	}
	.dropdown-group {
	  display: flex;
	  position: relative;
	  justify-content: space-around;
	  width: 100%;
	}
	
	.dropdown-button {
	  text-align: center;
	  padding: 10px;
	  border: 1px solid #ccc;
	  height: 12px; /* 固定按钮高度 */
	  width: 50px;
	  line-height: 12px; /* 垂直居中 */
	  overflow: hidden; /* 文字溢出隐藏 */
	  white-space: nowrap; /* 防止文字换行 */
	  text-overflow: ellipsis; /* 文字溢出以省略号表示 */
	  border-radius: 20px;
	}
	
	.dropdown-button.selected {
	  background-color: #444;
	  color: #fff;
	}
	
	.dropdown-menu {
	  position: absolute;
	  z-index: 999;
	  width: 100%;
	  background-color: #fff;
	}
	
	
	.dropdown-content {
	  display: flex;
	  flex-wrap: wrap;
	  padding: 10px;
	  overflow-y: auto; /* 垂直滚动 */
	}
	
	.dropdown-item {
	  width: 33.33%;
	  box-sizing: border-box;
	}
	
	.option-circle {
	  width: 70px;
	  height: 25px;
	  border-radius: 25rpx;
	  border: 1px solid #ccc;
	  text-align: center;
	  line-height: 25px;
	  margin: 5px auto;
	}
	
	.option-circle.selected {
	  background-color: #444;
	  color: #fff;
	}
	
	.dropdown-footer {
	  display: flex;
	  position: absolute;
	  bottom: 40rpx;
	  left: 4%;	
	  
	}
	
	.dropdown-action {
	  padding: 5px 10px;
	  border: 1px solid #ccc;
	  margin: 0 40rpx;
	  width: 70px;
	  height: 20px;
	  line-height: 20px;
	  text-align: center;
	  border-radius: 20px;
	}
	
	.dropdown-action.confirm {
	  background-color: #18bd79;
	  color: #fff;
	}
</style>
