<template>
	<view v-if="flag === true">
		<view><video :src="movie.trailer" controls :poster="movie.poster" class="topplay"></video></view>
		<view class="middle">
			<view>
				<image :src="movie.cover" mode="" @click="Preservation"></image>
			</view>
			<view class="rightdv">
				<view class="title">{{movie.name}}</view>
				<view>{{movie.basicInfo}}</view>
				<view>{{movie.originalName}}</view>
				<view>{{movie.releaseDate}}</view>
				<view class="comprehensive">
					<view>
						综合评分：
						<view>{{movie.score}}</view>
					</view>
					<view>
						<uni-rate :value="movie.score/2" size="16" :disabled="disabled"></uni-rate>
						{{movie.prisedCounts}}人点赞
					</view>
				</view>
			</view>
		</view>
		<view class="plotDesc1">剧情介绍：</view>
		<view class="plotDesc">{{movie.plotDesc}}</view>
		<view class="plotDesc1">演职人员：</view>
		<scroll-view scroll-x="true">
			<view class="director">
				<view v-for="(item,index) in director">
					<image :src="item.photo" mode=""></image>
					<view class="name">{{item.name}}</view>
					<view class="name">{{item.actName}}</view>
				</view>
				<view v-for="(item,index) in performer" :key="index">
					<image :src="item.photo" mode=""></image>
					<view class="name">{{item.name}}</view>
					<view class="name">饰演：{{item.actName}}</view>
				</view>
			</view>
		</scroll-view>
		<view class="plotDesc1">剧照：</view>
		<view class="plotPics1">
			<view v-for="(item,index) in movie.plotPics" class="plotPics" :key="index">
				<image :src="item" mode=""></image>
			</view>
		</view>
	</view>
	<view v-else @click="Preservation" class="downloadpic">
		<image :src="movie.poster" mode="" @longpress="long(item)"></image>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-ui/uni-rate/uni-rate.vue"
	export default {
		components: {
			uniRate
		},
		data() {
			return {
				movie: [],
				flag: true,
				disabled: true,
				performer: [],
				director: [],
			}
		},
		onLoad(options) {
			// 详情页数据
			console.log(JSON.parse(options.item));
			this.movie = JSON.parse(options.item)
			this.movie.plotPics = JSON.parse(this.movie.plotPics)
			// 请求详情导演
			uni.request({
				url: `${this.$url}/search/staff/${this.movie.id}/1?qq=122212489`,
				method: 'POST',
				data: {},
				success: res => {
					this.director = res.data.data
					console.log(res.data);
				},
				fail: (e) => {
					console.log(e);
				},
				complete: () => {}
			});
			// 请求详情演员
			uni.request({
				url: `${this.$url}/search/staff/${this.movie.id}/2?qq=122212489`,
				method: 'POST',
				data: {},
				success: res => {
					this.performer = res.data.data
					console.log(res.data);
				},
				fail: (e) => {
					console.log(e);
				},
				complete: () => {}
			});
		},
		onShareAppMessage() {
			return {
				title: this.movie.name,
				success: (res) => {
					console.log("转发成功", res);
				},
				fail: (res) => {
					console.log("转发失败", res);
				},
				}
			},
			methods: {
				Preservation() {
					this.flag = !this.flag
				},
				long() {
					let that = this
					uni.showActionSheet({
						itemList: ['保存到本地'],
						success: function(res) {
							if (res.tapIndex === 0) {
								uni.downloadFile({
									url: that.movie.poster, //仅为示例，并非真实的资源
									success(res) {
										console.log(res)
										// 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
										if (res.statusCode === 200) {
											uni.saveImageToPhotosAlbum({
												filePath: res.tempFilePath,
												success: function() {
													uni.showToast({
														title: "保存成功"
													})
												}
											});
										}
									}
								})
							}
						},
						fail: function(res) {
							console.log(res.errMsg);
						}
					});
				}
			},
		}
</script>

<style>
	.topplay {
		width: 100%;
	}

	.middle {
		display: flex;
		margin: 20rpx;
		align-items: center;
		font-size: 24rpx;
	}

	.middle image {
		width: 300rpx;
		height: 300rpx;
	}

	.rightdv  {
		margin: 10rpx;
	}

	.comprehensive {
		width: 400rpx;
		height: 100rpx;
		display: flex;
		text-align: center;
		vertical-align: middle;
		align-items: center;
		justify-content: space-around;
		background: skyblue;
	}

	.title {
		font-size: 30rpx;
		font-weight: bold;
	}

	.plotDesc {
		font-size: 26rpx;
		margin: 20rpx;
		font-weight: 500;
	}

	.plotDesc1 {
		margin: 20rpx;
	}

	.director {
		font-size: 26rpx;
		display: flex;
	}

	.director image {
		width: 180rpx;
		height: 200rpx;
		margin: 10rpx;
	}

	.plotPics image {
		width: 320rpx;
		height: 270rpx;
		padding: 20rpx;
	}

	.downloadpic {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: #000000;
	}

	.downloadpic image {
		width: 100%;
		margin-top: 40%;
	}

	.plotPics1 {
		display: flex;
		flex-wrap: wrap;
	}

	.name {
		text-align: center;
		font-size: 30rpx;
		/* 只显示一行 */
		width: 150rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
</style>
