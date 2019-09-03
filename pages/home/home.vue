<template>
	<view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,index) in banner" :key="index">
				<image :src="item.image" mode="" class="banner"></image>
			</swiper-item>
		</swiper>
		<view class="tabimgdv">
			<image src="../../static/image/火.png" mode="" class="tabimg"></image>热门超英
		</view>
		<scroll-view scroll-x="true" :show-scrollbar="false">
			<view class="tabimg1">
				<view v-for="(item,index) in movie" :key="index" @click="todetails(item)">
					<view>
						<image :src="item.cover" mode=""></image>
						<view class="tabtext">{{item.name}}</view>
						<view class="tabscore">
							<uni-rate :value="item.score/2" size="16" :disabled="disabled"></uni-rate>
							{{item.score}}
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="tabimgdv">
			<image src="../../static/image/预告.png" mode="" class="tabimg"></image>热门预告
		</view>
		<Notice></Notice>
		<guessyoulike :like="like"></guessyoulike>
	</view>


</template>

<script>
	import guessyoulike from "../../components/guessyoulike/guessyoulike.vue"
	import uniRate from "@/components/uni-ui/uni-rate/uni-rate.vue"
	import Notice from "../../components/Notice/Notice.vue"
	export default {
		components: {
			uniRate,
			Notice,
			guessyoulike
		},
		data() {
			return {
				banner: [], //轮播图
				indicatorDots: true,
				disabled:true,
				autoplay: true,
				movie: [], //热门英超
				interval: 2000,
				duration: 500,
				like: []
			}
		},
		onPullDownRefresh: function() {
			// 猜你喜欢
			uni.request({
				url: `${this.$url}/index/guessULike?qq=122212489`,
				method: 'POST',
				data: {},
				success: res => {
					console.log(res.data.data);
					this.like = res.data.data
					uni.stopPullDownRefresh()
				},
				fail: (e) => {
					console.log(e);
				},
				complete: () => {}
			});
		},
		onLoad() {
			// 头部轮播图
			uni.request({
				url: `${this.$url}/index/carousel/list?qq=122212489`,
				method: 'POST',
				data: {},
				success: res => {
					// console.log(res.data);
					this.banner = res.data.data
					console.log(this.banner);
				},
				fail: (e) => {
					console.log(e);
				},
				complete: () => {}
			});
			// 热门英超
			uni.request({
				url: `${this.$url}/index/movie/hot?qq=122212489&type=superhero`,
				method: 'POST',
				data: {},
				success: res => {
					this.movie = res.data.data
					console.log(this.movie);
				},
				fail: (e) => {
					console.log(e);
				},
				complete: () => {}
			});
			// 猜你喜欢
			uni.request({
				url: `${this.$url}/index/guessULike?qq=122212489`,
				method: 'POST',
				data: {},
				success: res => {
					console.log(res.data.data);
					this.like = res.data.data
				},
				fail: (e) => {
					console.log(e);
				},
				complete: () => {}
			});
		},
		methods: {
			todetails(item) {
				console.log(item);
				let obj = JSON.stringify(item)
				uni.navigateTo({
					url: `../details/details?item=${obj}`
				})
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			}
		}
	}
</script>

<style>
	.banner {
		width: 100%;
		height: 500rpx;
	}

	.swiper {
		height: 500rpx;
	}

	.tabimg {
		width: 40rpx;
		height: 40rpx;
		vertical-align: middle;
	}

	.tabimgdv {
		font-weight: bold;
		font-size: 27rpx;
		padding: 20rpx;
	}

	.tabimg1 {
		display: flex;
	}

	.tabimg1 image {
		width: 200rpx;
		height: 200rpx;
		padding: 10rpx;
	}

	.tabtext {
		text-align: center;
		font-size: 24rpx;
		padding: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 200rpx;
	}

	.tabscore {
		padding: 10rpx;
		display: flex;
		font-size: 24rpx;
	}
</style>
