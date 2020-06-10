
<script>
	import config from './config/index'
	export default {
		onLaunch: function() {
			console.log(process.env.NODE_ENV)
			// const uniCloudConfig=config[process.env.NODE_ENV].uniCloud
			// console.log(uniCloudConfig)
			// uniCloud.init(uniCloudConfig)
			if (!wx.cloud) {
			      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
			    } else {
			      wx.cloud.init({
			        // env 参数说明：
			        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
			        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
			        //   如不填则使用默认环境（第一个创建的环境）
			        // env: 'dev-okxhf',
			        env:config[process.env.NODE_ENV].cloud_env,
			        traceUser: true,
			      })
			    }
			// console.log('App Launch')
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
page{
	background-color: $page-bg-color;
	
	display: flex;
	flex-direction: column;
	
	font-size: 14px;
	color: $text-p-color;
  
	
  @media (prefers-color-scheme: dark){
    background-color: $page-bg-color-dark;
    color: $text-p-color-dark;
  }
	
	
	

}
</style>
