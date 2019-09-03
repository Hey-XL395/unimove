<template>
	<view>
		<view class="topimgdv">
			<image src="../../static/image/default-face.png" mode=""></image>
		</view>
		<view class="inp">账号：<input type="text" value="" placeholder="请输入用户名" v-model="username" /></view>
		<view class="inp">密码：<input type="password" value="" placeholder="请输入密码" v-model="password" /></view>
		<button type="primary" class="btn" @click="toland">登陆/注册</button>
		<!-- #ifndef H5 -->
		<view class="userland">第三方账号登陆</view>
		<view class="disline">
			<!-- #ifndef MP-WEIXIN -->
			<view class="userlandimg">
				<image src="../../static/image/weixin.png" mode="" @click="wxland" data-type="weixin"></image>
			</view>
			<!-- #endif -->
			<!-- #ifndef MP-QQ -->
			<view class="userlandimg">
				<image src="../../static/image/QQ.png" mode="" @click="wxland" data-type="qq"></image>
			</view>
			<!-- #endif -->
			<view class="userlandimg">
				<image src="../../static/image/weibo.png" mode="" @click="wxland" data-type="sinaweibo"></image>
			</view>
		</view>
		<!-- #endif -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password: "",
				userBO: {},
				loginRes: {},
				infoRes: {},
				val:""
			}
		},
		onLoad() {

		},
		methods: {
			wxland(e) {
				console.log(e.target.dataset.type);
				this.val = e.target.dataset.type
				uni.login({
					provider: this.val,
					success: ((loginRes) => {
						console.log(loginRes.authResult);
						this.loginRes = loginRes
						// 获取用户信息
						uni.getUserInfo({
							provider: this.val,
							success: ((infoRes) => {
								console.log(infoRes.userInfo);
								this.infoRes = infoRes.userInfo
							})
						});
					})
				});
				if (this.val === "sinaweibo") {
					this.infoRes.openId = this.infoRes.id
				}
				uni.request({
					url: `${this.$url}/appUnionLogin/${this.val}?qq=122212489`,
					method: 'POST',
					data: {
						infoRes: {},
						face: this.infoRes.avatarUrl,
						nickname: this.infoRes.nickName,
						openIdOrUid: this.infoRes.openId
					},
					success: res => {
						console.log(res.data);
						if (res.data.status === 200) {
							uni.navigateBack(-1)
							this.$store.state.user = res.data.data
						} else {
							uni.showToast({
								title: "登陆失败"
							})
						}
					},
					fail: (e) => {
						console.log(e);
					},
					complete: () => {}
				});
			},
			toland() {
				console.log(this.username);
				console.log(this.password);
				uni.request({
					url: `${this.$url}/user/registOrLogin?qq=122212489`,
					method: 'POST',
					data: {
						userBO: this.userBO,
						password: this.password,
						username: this.username
					},
					success: res => {
						console.log(res.data);
						if (res.data.status === 500) {
							uni.showToast({
								title: res.data.msg
							});
						} else {
							this.$store.state.user = res.data.data
							uni.switchTab({
								url: "../mymessage/mymessage"
							})
						}
					},
					fail: (e) => {
						console.log(e);
					},
					complete: () => {}
				});
			}
		},
		watch: {}
	}
</script>

<style>
	.userland {
		text-align: center;
		width: 100%;
		font-size: 26rpx;
		color: #C0C0C0;
		margin: 20rpx;
	}

	.userlandimg {
		text-align: center;
	}

	.userlandimg image {
		width: 100rpx;
		height: 100rpx;
	}

	.disline {
		display: flex;
		width: 100%;
		justify-content: space-around;
		margin: 0 auto;
	}

	.disline image {
		margin: 10rpx;
	}

	.topimgdv {
		width: 100%;
		height: 150rpx;
		text-align: center;
		margin-top: 20%;
	}

	.topimgdv image {
		width: 150rpx;
		height: 150rpx;
	}

	.inp {
		display: flex;
		margin: 10rpx auto;
		width: 80%;
		padding: 20rpx;
	}

	.btn {
		width: 80%;
		background: #4CD964;
	}
</style>
