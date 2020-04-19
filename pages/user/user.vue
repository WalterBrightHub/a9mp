<template>
	<view class="wb-container">
		<view class="wb-card">
			<view class="wb-card-item card-title">我的</view>
			<view class="wb-card-item" @tap="copyOpenid">
				<view class="item-header">
					<view class="card-item-title">用户ID</view>
					<view class="item-right item-operation-text">复制</view>
				</view>
				<view class="item-body">
					<view class="wb-p">{{ openid ? openid : ' ' }}</view>
					<view class="wb-help">这是你在本小程序中的用户标识。</view>
				</view>
			</view>
			<view class="wb-card-item" @tap="jumpToDashboard" v-if="isMpManager">
				<view class="item-header">
					<view class="card-item-title">后台</view>
					<image class="item-right item-operation-icon" src="../../static/right-arrow.png"></image>
				</view>
			</view>
		</view>
		<view class="wb-card">
			<view class="wb-card-item card-title">关于小程序</view>
			<view class="wb-card-item" @tap="copyOpenid">
				<view class="item-header">
					<view class="card-item-title">小程序版本</view>
					<view class="item-right item-right-text">{{ a9mp_version }}</view>
				</view>
			</view>

			<view class="wb-card-item" @tap="copyQQGroup">
				<view class="item-header">
					<view class="card-item-title">QQ交流群</view>
					<view class="item-right item-right-text">{{ a9mp_QQGroup }}</view>
				</view>
				<view class="wb-help">点击复制群号</view>
			</view>

			<view class="wb-card-item">
				<view class="item-header"><view class="card-item-title">开发组</view></view>
				<view class="item-text">水明@收藏家</view>
				<view class="item-text">Doogle@萌星</view>
			</view>

			<view class="wb-card-item">
				<view class="item-header"><view class="card-item-title">致谢</view></view>
				<view class="wb-p">车辆数据由 硫化镉@收藏家 提供。</view>
			</view>
		</view>
	</view>
</template>

<script>
const db = wx.cloud.database();

/* 返回一条记录说明是管理员，返回空记录说明是普通用户*/
const getMpManager = () =>
	db
		.collection('mpManager')
		.where({
			openid: '{openid}'
		})
		.get();

export default {
	components: {},
	data() {
		return {
			openid: null,
			openidStatus: 'pending',
			a9mp_version: '1.3.0',
			isMpManager: false,
			a9mp_QQGroup: '1041602955'
		};
	},
	onLoad() {
		db.collection('mpManager')
			.where({
				openid: '{openid}'
			})
			.get()
			.then(res => {
				console.log(res.data);
			});
		uni
			.getStorage({
				key: 'openid'
			})
			.then(([error, res]) => {
				// const =data
				if (!error) {
					const openid = res.data;
					// if (res.data) {
					console.log('get local:' + openid);
					this.openid = openid;
					// }
				} else {
					wx.cloud
						.callFunction({
							name: 'login',
							data: {}
						})
						.then(res => {
							const { openid } = res.result;
							this.openid = openid;
							uni.setStorage({
								key: 'openid',
								data: openid
							});
							console.log('get cloud openid' + openid);
						})
						.catch(res => {
							console.log('get cloud fail:' + res);
						});
				}
			});
	},
	methods: {
		copyOpenid(e) {
			if (this.openid) {
				uni.setClipboardData({
					data: this.openid
				});
			} else {
				uni.showToast({
					title: '还没有获取'
				});
			}
		},

		copyQQGroup(e) {
			uni.setClipboardData({
				data: this.a9mp_QQGroup
			});
		},

		jumpToDashboard: async function(e) {
			uni.navigateTo({
						url: '../dashboard/dashboard'
					});
			// const { result } = await wx.cloud
			// 	.callFunction({
			// 		name: 'getRole'
			// 	})
			// 	.catch(e => {
			// 		console.log(e);
			// 		return;
			// 	});
			// console.log(result);
			// if (result.role.length) {
			// 	const role = result.role[0];
			// 	console.log(role);
			// 	if (role.root) {
			// 		uni.navigateTo({
			// 			url: '../dashboard/dashboard'
			// 		});
			// 	} else {
			// 		wx.showToast({
			// 			icon: 'none',
			// 			title: '你暂时没有权限~'
			// 		});
			// 	}
			// } else {
			// 	wx.showToast({
			// 		icon: 'none',
			// 		title: '你还不是管理员~'
			// 	});
			// }
		}
	},
	onPullDownRefresh() {
		getMpManager()
			.then(res => {
				console.log(res.data);
				this.isMpManager = res.data.length > 0;
			})
			.finally(() => {
				uni.stopPullDownRefresh();
			});
	}
};
</script>

<style lang="scss">
	@import '../../style/theme.scss';
// .container {
// 	width: 100%;
// 	box-sizing: border-box;
// 	display: flex;
// 	flex-direction: column;
// 	max-width: 768px;
// 	padding: 10px;
// }

.card-title{
	color: $text-title-color;
	font-size: 20px;
	font-weight: bold;
}

.card-item-title{
	color: $text-title-color;
	font-size: 18px;
}


.item-header {
	display: flex;
	align-items: center;
	margin-bottom: 4px;
}

.item-text,
.item-tip {
	font-size: 16px;
	margin-bottom: 4px;
}



.item-text,
.item-right-text {
	word-break: break-word;
}





.item-right {
	margin-left: auto;
}

.item-operation-text {
	flex: 0 0 auto;
	padding: 0 5px 0 10px;
	color: $theme-color;
}

.item-operation-icon {
	width: 20px;
	height: 20px;
	// 黑色图标转正文灰
	filter: invert(40%);
}

.item-body {
	display: flex;
	flex-direction: column;
}
</style>
