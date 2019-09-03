<template>
	<view v-if="user.id">
		<view v-if="flag">
			<cmd-cell-item title="头像" arrow @click="fnClickimg" slot-right>
				<view>
					<image :src="user.faceImage" mode="" class="userimg"></image>
				</view>
			</cmd-cell-item>
			<cmd-cell-item title="昵称" arrow @click="fnClicknickname" :addon="user.nickname" />
			<cmd-cell-item title="生日" arrow @click="fnClick" slot-right>
				<view>
					<picker mode="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{user.birthday}}</view>
					</picker>
				</view>
			</cmd-cell-item>
			<cmd-cell-item title="性别" arrow @click="fnClicksex" :addon="user.sex" />
			<button type="primary" class="btn1">清空缓存</button>
			<button type="primary" class="btn1" @click="toclear">退出登录</button>
		</view>
		<view v-else @click="back" class="biguserimg"><image :src="user.faceImage" mode="" @longpress="long"></image></view>
	</view>
</template>
<script>
	import cmdCellItem from '../../components/cmd-cell-item/cmd-cell-item.vue'
	export default {
		components: {
			cmdCellItem
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				flag: true,
				user: {},
				date: currentDate,
				userBO: {}
			}
		},
		onLoad() {

		},
		onShow() {
			this.user = this.$store.state.user
			if (this.user.sex === 1) {
				this.user.sex = "男"
			} else if (this.user.sex === 0) {
				this.user.sex = "女"
			}
			console.log(this.user);
		},
		methods: {
			back(){
				this.flag = true
			},
			//查看头像
			fnClickimg() {
				let that = this
				uni.showActionSheet({
					itemList: ['查看我的头像', '选择相册照片'],
					success: function(res) {
						console.log(res);
						if(res.tapIndex === 0){
							that.flag = false
						}else if(res.tapIndex === 1){
							uni.navigateTo({
								url:"../setimg/setimg"
							})
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			long() {
				let that = this
				uni.showActionSheet({
					itemList: ['保存到本地'],
					success: function(res) {
						if (res.tapIndex === 0) {
							uni.downloadFile({
								url: that.user.faceImage, //仅为示例，并非真实的资源
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
			},
			// 退出登录
			toclear() {
				uni.request({
					url: `${this.$url}/user/logout?qq=122212489&userId=${this.user.id}`,
					method: 'POST',
					data: {},
					header: {
						"headerUserId": this.user.id,
						"headerUserToken": this.user.userUniqueToken
					},
					success: res => {
						console.log(res.data);
						this.$store.state.user = {}
						uni.navigateBack(-1)
					},
					fail: (e) => {
						console.log(e);
					},
					complete: () => {}
				});
			},
			// 修改昵称
			fnClicknickname() {
				uni.navigateTo({
					url: "../setnickname/setnickname"
				})
			},
			// 修改时间
			bindDateChange: function(e) {
				this.date = e.target.value
				this.user.birthday = e.target.value
				uni.request({
					url: `${this.$url}/user/modifyUserinfo?qq=122212489`,
					method: 'POST',
					data: {
						userId: this.user.id,
						birthday: this.date
					},
					header: {
						"headerUserId": this.user.id,
						"headerUserToken": this.user.userUniqueToken
					},
					success: res => {
						console.log(res.data);
					},
					fail: (e) => {
						console.log(e);
					},
					complete: () => {}
				});
			},
			fnClick() {

			},
			fnClicksex() {
				// 修改性别
				let that = this
				uni.showActionSheet({
					itemList: ['女', '男'],
					success: function(res) {
						let itemList = ['女', '男']
						that.user.sex = itemList[res.tapIndex]
						// 线上修改
						uni.request({
							url: `${that.$url}/user/modifyUserinfo?qq=122212489`,
							method: 'POST',
							data: {
								userId: that.user.id,
								sex: res.tapIndex
							},
							header: {
								"headerUserId": that.user.id,
								"headerUserToken": that.user.userUniqueToken
							},
							success: res => {
								console.log(res.data);
							},
							fail: (e) => {
								console.log(e);
							},
							complete: () => {}
						});
					},
					fail: function(res) {
						console.log(res.errMsg);
					}
				});
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		}
	}
</script>

<style>
	.biguserimg {
		background: #000000;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		text-align: center;
	}
	.biguserimg image{
		margin-top: 30%;
	}
	.userimg {
		width: 60rpx;
		height: 60rpx;
	}

	.btn1 {
		margin: 20rpx;
		background: #4CD964;
	}
</style>
