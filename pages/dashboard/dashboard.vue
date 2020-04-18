<template>
	<view class="container">
		<view class="content">
			<view class="title">赛事</view>
			<navigator class="item" url="contest/insert/insert">
				<view class="item-header">
					<view class="item-title">新建赛事</view>
					<image class="item-right item-operation-icon" src="../../static/right-arrow.png"></image>
				</view>
			</navigator>
			<view class="item">
				<view class="item-header">
					<view class="item-title">管理赛事</view>
					<image class="item-right item-operation-icon" src="../../static/right-arrow.png"></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			role:null
		};
	},
	methods:{
		addContestAl:function(e){
			
		}
	}
};
</script>

<style lang="scss">
@import '../../style/settings.scss';
</style>
