<template>
	<view class="container">
		<contest-form :init-payload="initPayload" @submitForm="submitForm"></contest-form>
	</view>
</template>

<script>
	import contestForm from '../components/contestForm.vue'
	import moment from 'moment'; 

	
	const launchTime = moment();
	
	const initPayload={
			contestName: '',
			gameServer: 'al',
			mapName: '',
			rewords: [],
			startDay: launchTime.format('YYYY-MM-DD'),
			startTime: '00:00',
			endDay: launchTime.format('YYYY-MM-DD'),
			endTime: '23:59'
		}
	
	export default {
		components:{
			'contest-form':contestForm
		},
		data() {
			return {
				initPayload
			}
		},
		methods: {
			submitForm(payload){
				console.log('insert')
				console.log(payload)
			}
		}
	}
</script>

<style>
.container{
	max-width: 768px;
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
}
</style>
