## TCARE口腔医疗AI助手部署指引

### 1、 前置要求

- 操作系统要求Linux Kernal 3.10 以上，推荐使用ubuntu 22.04/debian bullsys
- 安装docker,docker compose插件,安装bzip2解压
- 请下载整个安装包: [https://zhama-public.oss-cn-heyuan.aliyuncs.com/conductor-dist.tar.bz2](https://zhama-public.oss-cn-heyuan.aliyuncs.com/conductor-dist.tar.gz.bz2)
- 执行以下脚本解压
  
```bash
bzip2 -d conductor-dist.tar.bz2
tar xf conductor-dist.tar
```

解压后有以下文件all-images.tar，docker-compose.yml，offline-docker-24.0.9.tar.gz



### 2、安装docker(如果机器未完装，请执行)

```
tar xf offline-docker-24.0.9.tar.gz
cd offline-docker-24.0.9
bash install.sh
```


### 3、加载镜像

```
docker load -i all-images.tar
```

### 4、配置服务器

docker-compose.yml

- 需要配置的环境变量如下：

1. conductor-mcp-server:

    - TCARE_SERVER: TCARE系统URL，如: http://192.168.0.1:8080

2. conductor-server:
    - TCARE_SERVER: TCARE系统URL，如: http://192.168.0.1:8080
    - LLM_SERVER: 大模型服务BaseURL（含有/v1）
    - LLM_KEY: 大模型APIKEY
    - LLM_MODEL: 模型名称
    - AUDIO_FILE_DOMAIN: 服务器domain，如: http://192.168.0.1:8080

3. conductor-web:
    - DASHSCOPE_API_KEY: 阿里云百炼apikey(如果VOICE_PROVIDER为aliyun，则必须填。否则可以为空)
    - VOICE_PROVIDER: 语音识别方式:native或者aliyun
      
### 5、数据库初始化

下载文件，wget https://zhama-public.oss-cn-heyuan.aliyuncs.com/volumes.tar.gz
在docker-compose.yml目录下解压，然后docker compose up -d 启动服务
默认web端口为40000
http://192.168.0.1:40000/dashboard?front_token=1111


