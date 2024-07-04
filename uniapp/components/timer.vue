<template>
  <view class="countdown-container" v-if="countdownVisible">
    <view class="countdown">{{ countdown }}</view>
  </view>
</template>

<script>
export default {
	name: 'timer',
  data() {
    return {
      countdownVisible: true,
      countdown: 3,
    };
  },
  mounted() {
    this.startCountdown();
  },
  methods: {
    startCountdown() {
      const countdownInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(countdownInterval);
          this.animateDisappear();
        }
      }, 1000);
    },
    animateDisappear() {
		this.countdownVisible = false;
    }
  }
};
</script>

<style>
.countdown-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #7e6af8;
  color: white;
}

.countdown {
  font-size: 10em;
}

@keyframes countdown-animation {
  0% {
    transform: scale(3);
    opacity: 0;
  }
  33% {
    transform: scale(2.5);
    opacity: 1;
  }
  66% {
    transform: scale(2);
  }
  100% {
    transform: scale(1.5);
  }
}
</style>
