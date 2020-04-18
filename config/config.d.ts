type UniCloud={
	provider:string,
	spaceId:string,
	clientSecret:string
}

type EnvConfig={
  cloud_env:string,
  mp_version:string
	uniCloud:UniCloud
}

type Config={
  development:EnvConfig,
  production:EnvConfig
}