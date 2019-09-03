<template>
	<view class="videodv1">
		<view v-for="(item,index) in movie" :key="index">
			<video :src="item.trailer" controls :poster="item.cover" class="videodv" @play="play(item)" :id="item.id"></video></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				movie: []
			}
		},
		mounted() {
			// 视频播放
			uni.request({
				url: `${this.$url}/index/movie/hot?qq=122212489&type=trailer`,
				method: 'POST',
				data: {},
				success: res => {
					console.log(res.data.data);
					this.movie = res.data.data
				},
				fail: (e) => {
					console.log(e);
				},
				complete: () => {}
			});
		},
		methods: {
			play(item) {
				this.videoContext = uni.createVideoContext(item.id);
				this.movie.map(item1 => {
					if (item1.id !== item.id) {
						uni.createVideoContext(item1.id).pause();
					}
				})
			}
		},
		onHide: function() {
			this.movie.map(item => {
				uni.createVideoContext(item.id).pause();
			})
		},
	}
</script>

<style>
	.videodv {
		width: 330rpx;
		height: 330rpx;
		margin: 20rpx;
	}

	.videodv1 {
		display: flex;
		flex-wrap: wrap;
	}
</style>
