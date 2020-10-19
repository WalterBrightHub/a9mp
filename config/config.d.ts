type UniCloud={
	provider:string,
	spaceId:string,
	clientSecret:string
}

type EnvConfig={
  cloud_env:string,
  mp_version:string
	provider:string,
	spaceId:string,
	clientSecret:string
}

type Config={
  development:EnvConfig,
  production:EnvConfig
}