<template>
	<view>
		<input type="text" class="inp" v-model="nickname"/>
		<button type="primary" class="yes" @click="yes">保存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: [],
				nickname:""
			}
		},
		onLoad() {
			this.user = this.$store.state.user
			this.nickname = this.$store.state.user.nickname
		},
		methods: {
			yes() {
				
				uni.request({
					url: `${this.$url}/user/modifyUserinfo?qq=122212489`,
					method: 'POST',
					data: {
						userId: this.user.id,
						nickname: this.nickname
					},
					header: {
						"headerUserId": this.user.id,
						"headerUserToken": this.user.userUniqueToken
					},
					success: res => {
						console.log(res.data);
						uni.navigateBack(-1)
						this.$store.state.user.nickname = this.nickname
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
	.inp {
		margin: 20rpx;
		border: #4CD964 1rpx solid;
		padding: 20rpx;
	}

	.yes {
		margin: 30rpx;
	}
</style>
