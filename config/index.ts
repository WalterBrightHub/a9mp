const config:Config={
  development:{
    cloud_env:'dev-okxhf',
    mp_version:'1.3.0',
		uniCloud:{
			provider:'aliyun',
			spaceId:'5bc4ffa9-0a4a-44de-889a-f9811518e720',
			clientSecret:'5xMCIP5m8tKaj9wXFN0uEQ=='
		}
  },
  production:{
    cloud_env:'a9cn-wifx6',
    mp_version:'1.3.0',
		uniCloud:{
			provider:'aliyun',
			spaceId:'387dda42-7df7-43c7-ab80-535cd9986d16',
			clientSecret:'hlVdGbm4STFGWi6X+G1xtA=='
		}
  }
}
export default config