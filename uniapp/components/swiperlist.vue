<template>
  <view class="container">
    <!-- 左侧分类栏 -->
    <scroll-view class="category-list" scroll-y="true">
      <view v-for="(category, index) in categories" :key="index" class="category-item" :class="{ 'selected': selectedCategoryIndex === index }" @tap="selectCategory(index)">
        <view class="category-name">{{ category.name }}</view>
        <view v-if="selectedCategoryIndex === index" class="selected-indicator"></view>
      </view>
    </scroll-view> 
    <!-- 右侧商品列表 -->
    <scroll-view class="product-list" scroll-y="true">
      <view v-for="(product, index) in selectedCategoryProducts" :key="index" class="product-item">
        {{ product.name }} - {{ product.price }}
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		categories: [
		{ name: '全部类别', products: [] }, // 添加全部类别
		{ name: '分类1', products: [{ name: '商品1', price: '100' }, { name: '商品2', price: '150' }] },
		{ name: '分类2', products: [{ name: '商品3', price: '80' }, { name: '商品4', price: '120' }] }
	  ],
	  selectedCategoryIndex: 0,
    };
  },
  computed: {
    selectedCategoryProducts() {
      return this.categories[this.selectedCategoryIndex].products;
    }
  },
  
  methods: {
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
	}
  }
};
</script>

<style scoped>
.container {
  position: fixed;
  display: flex;
  margin-top: 100rpx;
  height: 100vh;
  width: 100%;
}

.category-list {
  width: 30%; /* 左侧分类栏宽度 */
  background-color: #f0f0f0; /* 浅灰色背景 */
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
  background-color: #ffffff; /* 白色背景 */
  margin-left: 20px; /* 增大与类别栏之间的间隙 */
  overflow: hidden; /* 隐藏右侧商品列表的横向滚动条 */
  width: 70%;
}

.product-item {
  padding: 20px;
  border-bottom: 1px solid #ccc;
}
</style>
