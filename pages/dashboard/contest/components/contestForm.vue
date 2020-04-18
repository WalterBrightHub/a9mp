<template>
	<view class="form">
		<radio-group class="form-item radios" name="radio" @change="changeGameServer">
			<view class="form-item-label">游戏服务器</view>
			<view class="form-item-block">
				<label class="label form-item-block-item">
					<radio value="al" checked="true" />
					<view>国服</view>
				</label>
				<label class="label form-item-block-item">
					<radio value="gl" />
					<view>国际服</view>
				</label>
			</view>
		</radio-group>
		<view class="form-item">
			<view class="form-item-label">赛事标题</view>
			<view class="form-item-block"><input class="form-item-block-item" v-model="contestName" placeholder="寻车赛事:三菱" /></view>
		</view>
		<view class="form-item">
			<view class="form-item-label">地图名</view>
			<view class="form-item-block"><input class="form-item-block-item" v-model="mapName" placeholder="云霄飞车" /></view>
		</view>
		<!-- <view @tap="openCalendar">{{ startDay }}→{{ endDay }}</view> -->
		<view class="form-item">
			<view class="form-item-label">开始时间</view>
			<view class="form-item-block">
				<picker class="form-item-block-item" mode="date" :value="startDay" @change="changeStartDay">{{ startDay }}</picker>
				<picker class="form-item-block-item" mode="time" :value="startTime" @change="changeStartTime">{{ startTime }}</picker>
			</view>
		</view>

		<view class="form-item">
			<view class="form-item-label">结束时间</view>
			<view class="form-item-block">
				<picker class="form-item-block-item" mode="date" :value="endDay" @change="changeEndDay">{{ endDay }}</picker>
				<picker class="form-item-block-item" mode="time" :value="endTime" @change="changeEndTime">{{ endTime }}</picker>
			</view>
		</view>

		<!-- <uni-calendar :insert="false" ref="calendar" :range="true" @confirm="confirmStartDayAndEndDay"></uni-calendar> -->
		<view class="form-item">
			<view class="form-item-label">奖励</view>
			<view class="form-item-block" v-for="(reword, index) in rewords" :key="reword.createTime">
				<input class="form-item-block-item" v-model="reword.rewordName" placeholder="三菱" />
				<picker class="form-item-block-item" mode="selector" :range="rewordTypeRange" @change="changeRewordType($event, index)">{{ rewordTypeRange[reword.rewordType] }}</picker>
				<view class="form-item-block-item adjust-panel">
					<view class="adjust-item adjust-up" @tap="upRewordOf(index)">↑</view>
					<view class="adjust-item adjust-down" @tap="downRewordOf(index)">↓</view>
					<view class="adjust-item adjust-delete" @tap="deleteRewordOf(index)">-</view>
					<view class="adjust-item adjust-add" @tap="addRewordOf(index)">+</view>
				</view>
			</view>
			<view class="form-item-block">
				<view class="form-item-block-item adjust-panel"><view class="adjust-item adjust-add" @tap="addRewordOf(rewords.length - 1)">+</view></view>
			</view>
		</view>

		<button class="submit-button" type="primary" @tap="tapSubmit">提交</button>
	</view>
</template>

<script>
import moment from 'moment';
import rewordTypeText from '../rewordTypeText.js';

const rewordTypeRange = Object.keys(rewordTypeText).map(key => ({ value: key, text: rewordTypeText[key] }));
console.log(rewordTypeRange);

import { uniCalendar } from '@dcloudio/uni-ui';

const launchTime = moment();

export default {
	components: {
		uniCalendar
	},
	props: {
		initPayload: Object
	},
	data() {
		return {
			contestName: '',
			gameServer: 'al',
			mapName: '',
			rewords: [],
			rewordTypeRange: rewordTypeRange.map(item => item.text),
			startDay: launchTime.format('YYYY-MM-DD'),
			startTime: '00:00',
			endDay: launchTime.add(1, 'd').format('YYYY-MM-DD'),
			endTime: '23:59'
		};
	},
	methods: {
		openCalendar() {
			this.$refs.calendar.open();
		},
		changeGameServer(e) {
			this.gameServer = e.detail.value;
		},
		changeStartDay(e) {
			let startDay = e.detail.value;
			this.startDay = startDay;
			if (startDay > this.endDay) {
				this.endDay = startDay;
			}
		},
		changeEndDay(e) {
			let endDay = e.detail.value;
			this.endDay = endDay;
			if (this.startDay > endDay) {
				this.startDay = endDay;
			}
		},
		changeStartTime(e) {
			let startTime = e.detail.value;
			this.startTime = startTime;
			if (this.startDay === this.endDay && startTime > this.endTime) {
				this.endTime = startTime;
			}
		},
		changeEndTime(e) {
			let endTime = e.detail.value;
			this.endTime = endTime;
			if (this.startDay === this.endDay && this.startTime > endTime) {
				this.startTime = endTime;
			}
		},
		confirmStartDayAndEndDay(e) {
			// const { before, after } = e.range;
			// if (before <= after) {
			// 	this.startDay = before;
			// 	this.endDay = after;
			// } else {
			// 	this.startDay = after;
			// 	this.endDay = before;
			// }
		},
		changeRewordType(e, index) {
			// let {rewords}=this
			this.rewords[index].rewordType = e.target.value;
			// this.rewords=rewords
		},
		addRewordOf(index) {
			let { rewords } = this;
			let emptyReword = {
				rewordName: '',
				createTime: new Date().getTime(),
				rewordType: 0
			};
			this.rewords = [...rewords.slice(0, index + 1), emptyReword, ...rewords.slice(index + 1)];
		},
		deleteRewordOf(index) {
			uni
				.showModal({
					title: '确定删除奖励？'
				})
				.then(([err, res]) => {
					console.log(res);
					if (res.confirm) {
						let { rewords } = this;
						this.rewords = [...rewords.slice(0, index), ...rewords.slice(index + 1)];
					}
				});
		},
		upRewordOf(index) {
			let { rewords } = this;
			if (index) {
				this.rewords = [...rewords.slice(0, index - 1), rewords[index], rewords[index - 1], ...rewords.slice(index + 1)];
			}
		},
		downRewordOf(index) {
			let { rewords } = this;
			if (index < rewords.length - 1) {
				this.rewords = [...rewords.slice(0, index), rewords[index + 1], rewords[index], ...rewords.slice(index + 2)];
			}
		},
		tapSubmit(e) {
			const { contestName, gameServer, mapName, rewords, startDay, startTime, endDay, endTime } = this;
			const payload = {
				contestName,
				gameServer,
				mapName,
				rewords,
				startISOString: moment(`${startDay} ${startTime}`)
					.seconds(0)
					.toISOString(),
				endISOString: moment(`${endDay} ${endTime}`)
					.seconds(59)
					.toISOString()
			};
			console.log(this.initPayload);
			// this.submitForm(payload)
			this.$emit('submitForm', payload);
		}
	}
};
</script>

<style lang="scss">
.form {
	font-size: 16px;
	// background-color: #f5f5f5;
}

.form-item-label {
	font-size: 14px;
	color: $text-title-color;
	margin-bottom: 10px;
}

.form-item + .form-item {
	margin-top: 16px;
}

.radios {
	display: flex;
	flex-direction: column;
}

.form-item-block {
	padding: 0 10px;
	border-radius: 5px;
	background-color: $card-bg-color;
}

.form-item-block + .form-item-block {
	margin-top: 10px;
}

.form-item-block-item {
	padding: 12px 0;
	border-top: 1px solid $divider-color;
}

.label {
	display: flex;
}

.label {
	align-items: center;
}

.adjust-panel {
	display: flex;
	justify-content: space-around;
}
.adjust-item{
	flex:1;
	text-align: center;
	font-weight: bold;
}

.submit-button {
	margin: 48px 0;
}

.add-new-reword-button {
	// text-align: center;
	// display: inline-block;
	margin: 0 auto;
	border: 2px solid $text-title-color;
	border-radius: 64px;
	font-size: 18px;
}
</style>
