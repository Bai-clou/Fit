<template>
  <view class="search-bar">
	  <view style="height: 60rpx;width: 80%;" @click="handleFocus">
		  <view class="hot-words-container">
		    <view v-for="(word, index) in hotWords" :key="index" class="hot-word" :class="{ 'hot-word-active': currentWordIndex === index }">
		      {{ word.content }}
		    </view>
		  </view>
	  </view>
    <image @click="search" src="/static/icons/search.png" class="search-icon"/>
  </view>
</template>

<script>
export default {
	name: 'searchinput',
	props:{
		hotWords:{
			type: Array,
			default: []
		}
	},
  data() {
	return {
	  currentWordIndex: 0,
	  isFocus: true
	};
  },
  computed: {
    currentHotWord() {
      return this.hotWords[this.currentWordIndex];
    }
  },
  mounted() {
    this.startScrollingHotWords();
  },
  methods: {
		startScrollingHotWords() {
		  setInterval(() => {
			this.currentWordIndex = (this.currentWordIndex + 1) % this.hotWords.length;
		  }, 3000); // 每3秒更换一次词条
		},
		handleFocus(){
			uni.navigateTo({
			  url: '/pages/search/search'
			});

		},
		search(){
			let hotword=this.hotWords[this.currentWordIndex];
			uni.navigateTo({
			  url: `/pages/search/search?searchword=${hotword}`
			});
		}
	}
};
</script>

<style>
.search-bar {
  position: fixed;
  width: 90%;
  height: 60rpx;
  background-color: #eaeaea;
  border-radius: 40px;
  color: #b0b0b0;
  top: 35rpx;
  left: 5%;
  
}
.hot-words-container {
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
}
.hot-word {
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 60rpx;
  text-align: center;
  transition: transform 1s, opacity 1s;
  transform: translateY(100%);
  opacity: 0;
}
.hot-word-active {
  animation: hotWordScroll 3s infinite;
}
@keyframes hotWordScroll {
  0%, 100% {
    transform: translateY(50%);
    opacity: 0;
  }
  25%, 50% {
    transform: translateY(0);
    opacity: 1;
  }
  75% {
    transform: translateY(-50%);
    opacity: 0;
  }
}
.search-input {
  width: calc(100% - 40px);
  height: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  border: none;
  position: relative;
  background-color: transparent;
}
.search-icon {
  position: absolute;
  right: 20rpx;
  top: 50%;
  transform: translateY(-50%);
  width: 40rpx;
  height: 40rpx;
}
</style>
