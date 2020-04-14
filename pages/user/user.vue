<template>
	<view class="container">
		<view class="content">
			<view class="title">我的</view>
			<view class="item" @tap="copyOpenid">
				<view class="item-header">
					<view class="item-title">用户ID</view>
					<view class="item-operation-text">复制</view>
				</view>
				<view class="item-body">
					<view class="item-text">{{ openid ? openid : ' ' }}</view>
					<view class="item-tip">这是你在本小程序中的用户标识。</view>
				</view>
			</view>
			<view class="item" @tap="jumpToDashboard">
				<view class="item-header">
					<view class="item-title">后台</view>
					<image class="item-operation-icon" src="../../static/right-arrow.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	components: {},
	data() {
		return {
			openid: null,
			openidStatus: 'pending'
		};
	},
	onLoad() {
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
		
		jumpToDashboard:async function (e){
			const {result}=await wx.cloud.callFunction({
				name:'getRole'
			}).catch(e=>{
				console.log(e)
				return
			})
			console.log(result)
			if(result.role.length){
				
			const role=result.role[0]
			console.log(role)
			if(role.root || role.al || role.gl){
				uni.navigateTo({
					url:'../dashboard/dashboard'
				})
			}
			else{
				wx.showToast({
					icon:'none',
					title:'你暂时没有权限~'
				})
			}
			}
			else{
				wx.showToast({
					icon:'none',
					title:'你还不是管理员~'
					
				})
			}
		}
	}
};
</script>

<style lang="scss">
.container {
	width: 100%;
	display: flex;
	flex-direction: column;
	max-width: 768px;
}

.content {
	margin: 10px;
	border-radius: 5px;
	background-color: $card-bg-color;
	display: flex;
	flex-direction: column;
}



.title {
	font-size: 18px;
	color: $text-title-color;
	font-weight: bold;
}

.title,
.item {
	padding: 10px;
}

.item {
	font-size: 14px;
	// margin: 10px 0;
	display: flex;
	flex-direction: column;
	// align-items: center;
}

.item + .item {
	border-top: 1px solid $divider-color;
}

.item-header {
	display: flex;
	align-items: center;
	margin-bottom: 4px;
}

.item-text,
.item-tip {
	margin-bottom: 4px;
}

.item-title {
	font-size: 16px;
	color: $text-title-color;
}

.item-text,
.item-right-text {
	word-break: break-word;
}

.item-tip {
	font-size: 12px;
	color: $text-help-color;
}

.item-right-text {
	font-size: 14px;
	color: $text-p-color;
}

.item-title + .item-operation-text,
.item-title + .item-right-text,

.item-title + .item-operation-icon{
	margin-left: auto;
}

.item-operation-text {
	font-size: 16px;
	flex: 0 0 auto;
	padding: 0 5px 0 10px;
	color: $theme-color;
}

.item-operation-icon{
	width: 20px;
	height: 20px;
}

@media (min-width: 400px) {
	.foo {
		color: white;
	}
}

@media (min-width: 400px) {
	.bar {
		color: green;
	}
}
</style>
