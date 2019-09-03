<template>
	<view>
		<view class="topinp"> <input type="text" value="" placeholder="请输入电影信息" @input="inp" />搜索
			<image src="../../static/image/search.png" mode="" class="searchimg"></image>
		</view>
		<view class="searchmove">
			<view v-for="(item,index) in searchmove" class="searchmove1" @click="todetails(item)">
				<view>
					<image :src="item.cover" mode=""></image>
					<view class="movename">{{item.name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords: "",
				searchmove: [],
				num: 12
			}
		},
		onLoad() {
			uni.request({
				url: `${this.$url}/search/list?qq=122212489&keywords=${""}&page=1&pageSize=${this.num}`,
				method: 'POST',
				data: {},
				success: res => {
					this.searchmove = res.data.data.rows
					console.log(res.data.data.rows);
				},
				fail: (e) => {
					console.log(e);
				},
				complete: () => {}
			});
		},
		//上拉触底
		onReachBottom: function() {
			this.num +=12
			console.log(this.num);
			console.log(this.keywords);
			uni.request({
				url: `${this.$url}/search/list?qq=122212489&keywords=${this.keywords}&page=1&pageSize=${this.num}`,
				method: 'POST',
				data: {},
				success: res => {
					this.searchmove = res.data.data.rows
				},
				fail: (e) => {
					console.log(e);
				},
				complete: () => {}
			});
		},
		methods: {
			todetails(item) {
				let obj = JSON.stringify(item)
				uni.navigateTo({
					url: `../details/details?item=${obj}`
				})
			},
			inp(e) {
				this.keywords = e.detail.value
				this.num = 12
				uni.request({
					url: `${this.$url}/search/list?qq=122212489&keywords=${this.keywords}&page=1&pageSize=${this.num}`,
					method: 'POST',
					data: {},
					success: res => {
						this.searchmove = res.data.data.rows
						console.log(res.data.data.rows);
					},
					fail: (e) => {
						console.log(e);
					},
					complete: () => {}
				});
			}
		}
	}
</script>

<style>
	.topinp {
		display: flex;
		justify-content: space-between;
		font-size: 30rpx;
		vertical-align: middle;
		align-items: center;
		margin: 20rpx;
	}

	.topinp input {
		border: 1rpx #3C3E49 solid;
		width: 80%;
		padding: 5rpx;
		padding-left: 60rpx;
		border-radius: 30rpx;
		position: relative;
	}

	.searchimg {
		left: 40rpx;
		width: 40rpx;
		height: 40rpx;
		position: absolute;
	}

	.searchmove {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
	}

	.movename {
		width: 200rpx;
		margin: 20rpx;
		font-size: 26rpx;
		text-align: center;
		font-size: 30rpx;
		/* 只显示一行 */
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;

	}

	.searchmove image {
		width: 210rpx;
		height: 250rpx;
		margin: 20rpx;
	}
</style>
