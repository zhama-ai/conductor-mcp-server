## TCARE口腔医疗AI助手部署指引

### 1、 系统要求

- 操作系统要求Linux Kernal 3.10 以上，推荐使用ubuntu 22.04/debian bullsys
- 安装docker,docker compose插件

### 2、服务部署

- 执行setup.sh脚本加载及安装

### 3、配置服务器

docker-compose.yml

- 需要配置的环境变量如下：

1. conductor-mcp-server:

    - TCARE_SERVER: TCARE系统URL，如: http://192.168.0.1:8080

2. conductor-server:
    - TCARE_SERVER: TCARE系统URL，如: http://192.168.0.1:8080
    - LLM_SERVER: 大模型服务BaseURL（含有/v1）
    - LLM_KEY: 大模型APIKEY
    - LLM_MODEL: 模型名称

3. conductor-web:
    - DASHSCOPE_API_KEY: 阿里云百炼apikey
    - NEXT_PUBLIC_VOICE_PROVIDER: 语音识别方式:native或者aliyun

