<template>
	<view class="topbac">
		<view class="land" @click="toland" v-if="!user.id">登陆/注册</view>
		<view  v-else class="usermsg">
		<view><image :src="user.faceImage" mode="" class="userimg1"></image></view>
		<view>{{user.id}}</view>
		<view><image src="../../static/image/settings.png" mode="" class="userimg2" @click="toseatting"></image></view>
		</view>
	</view>
</template>

<script>
	import cmdCellItem from '@/components/cmd-cell-item/cmd-cell-item.vue'
	export default {
		 components: {cmdCellItem},
		data() {
			return {
				user: {}
			}
		},
		onLoad() {
			
		},
		onShow() {
			if (this.$store.state.user) {
				this.user = this.$store.state.user
			}
		},
		methods: {
			toseatting(){
				uni.navigateTo({
					url:"../seatting/seatting"
				})
			},
			toland() {
				uni.navigateTo({
					url: "../land/land"
				})
			}
		}
	}
</script>

<style>
	.usermsg {
		display: flex;
		vertical-align: middle;
		align-items: center;
		height: 300rpx;
		justify-content: space-around;
	}
	.topbac {
		background: #87CEEB;
		width: 100%;
		height: 300rpx;
		text-align: center;
	}

	.land {
		padding-top: 10%;
		position: absolute;
		margin-top: 50rpx;
		width: 100%;
	}
	.userimg1 {
		width: 100rpx;
		height: 100rpx;
	}
	.userimg2 {
		width: 40rpx;
		height: 40rpx;
	}
</style>
