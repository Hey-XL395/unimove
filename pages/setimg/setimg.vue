<template>
	<view>
		<view>
			<image :src="img" mode="" class="img"></image>
		</view>
		<view class="btn">
			<button type="primary" @click="choose()">重新选择</button>
			<button type="primary" @click="upimg()">上传照片</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img: "",
				user:{}
			}
		},
		onLoad() {
			this.user = this.$store.state.user
			this.choose()
		},
		methods: {
			upimg() {
				uni.uploadFile({
					url: `${this.$url}/user/uploadFace?qq=122212489&userId=${this.user.id}`,
					filePath: this.img,
					name: 'file',
					formData: {
						'user': 'test'
					},
					header: {
						"headerUserId": this.user.id,
						"headerUserToken": this.user.userUniqueToken
					},
					success: (uploadFileRes) => {
						console.log(JSON.parse(uploadFileRes.data).data.faceImage);
						this.$store.state.user.faceImage = JSON.parse(uploadFileRes.data).data.faceImage
						uni.showToast({
							title:"上传成功"
						})
						uni.navigateBack(-1)
					}
				});
			},
			choose() {
				uni.chooseImage({
					success: (res) => {
						console.log(res);
						this.img = res.tempFilePaths[0]
					}
				});
			}
		}
	}
</script>

<style>
	.btn {
		display: flex;
		justify-content: space-between;
	}

	.img {
		width: 100%;
		height: 1000rpx;
	}

	.btn button {
		width: 400rpx;
		background: #4CD964;
		margin: 40rpx;
	}
</style>
