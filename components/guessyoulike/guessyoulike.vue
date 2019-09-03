<template>
	<view>
		<view v-for="(item,index) in like" class="like" @click="todetails(item)">
			<view>
				<image :src="item.cover" mode="" class="leftimg"></image>
			</view>
			<view class="rightdv">
				<view class="title">
					{{item.name}}
					<uni-rate :value="item.score/2" size="16" :disabled="disabled"></uni-rate>
				</view>
				<view>{{item.basicInfo}}</view>
				<view>{{(item.releaseDate).slice(0,15)}}</view>
			</view>
			<view class="Fabulous" @click.stop="Fabulous">
				<image src="../../static/image/praise.png" mode=""></image>
				<view>赞一下</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-ui/uni-rate/uni-rate.vue"
	export default {
		components: {
			uniRate
		},
		props: {
			like: {
				type: Array
			}
		},
		data() {
			return {
				disabled: true
			}
		},
		mounted() {},
		methods: {
			todetails(item) {
				let obj = JSON.stringify(item)
				uni.navigateTo({
					url: `../details/details?item=${obj}`
				})
			},
			Fabulous() {
				uni.showToast({
					title: "点赞成功"
				})
			}
		}
	}
</script>

<style>
	.leftimg {
		width: 200rpx;
		margin: 20rpx;
		height: 250rpx;
		border-radius: 30rpx;
	}

	.rightdv {
		margin: 20rpx;
		font-size: 27rpx;
	}

	.like {
		display: flex;
		vertical-align: middle;
		align-items: center;
	}

	.title {
		font-size: 30rpx;
		font-weight: bold;
	}

	.Fabulous {
		font-size: 30rpx;
		padding: 10rpx;
		color: skyblue;
		text-align: center;
		border-left: #007AFF dashed 1rpx;
	}

	.Fabulous image {
		width: 60rpx;
		height: 60rpx;
		text-align: center;
	}
</style>
