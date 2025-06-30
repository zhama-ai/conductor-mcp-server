#!/usr/bin/env bash

export CONDUCTOR_VER=v1.0.0

set -e

export basedir=$(cd $(dirname $0); pwd)

export CONDUCTOR_COMPOSE=https://static.finogeeks.club/deploy/finclip-ce/finclip-community-${CONDUCTOR_VER}.tar.gz
export CONDUCTOR_IMAGES=https://static.finogeeks.club/deploy/finclip-ce/images-${CONDUCTOR_VER}.tgz


export DOCKER_PKG=offline-docker-24.0.9
export OFFLINE_DOCKER=https://temp-1251849568.cos.ap-guangzhou.myqcloud.com/${DOCKER_PKG}.tar.gz

platform=$(uname -ms)
# Reset
Color_Off=''

# Regular Colors
Red=''
Green=''
Dim='' # White

# Bold
Bold_White=''
Bold_Green=''

if test -t 1; then
    # Reset
    Color_Off='\033[0m' # Text Reset

    # Regular Colors
    Red='\033[0;31m'   # Red
    Green='\033[0;32m' # Green
    Dim='\033[0;2m'    # White

    # Bold
    Bold_Green='\033[1;32m' # Bold Green
    Bold_White='\033[1m'    # Bold White
fi


error() {
    echo -e "${Red}error${Color_Off}:" "$@" >&2
    exit 1
}

info() {
    echo -e "${Dim}$@ ${Color_Off}"
}

info_bold() {
    echo -e "${Bold_White}$@ ${Color_Off}"
}

success() {
    echo -e "${Green}$@ ${Color_Off}"
}

command -v docker >/dev/null || {
    info 'docker is required to install finclip'
    read -p "Do you want to install Docker? (y/n): " docker_answer

    case $docker_answer in
        [Yy]* )
            echo "You have chosen to install Docker."
            wget $OFFLINE_DOCKER
            tar xvf ${DOCKER_PKG}.tar.gz

            cd ${DOCKER_PKG}

            bash install.bash || exit 1
            ;;
        [Nn]* )
            echo "You have chosen not to install Docker."
            # Add commands or messages for the case where Docker will not be installed
            exit 0
            ;;
        * )
            echo "Invalid input, Docker installation aborted."
            exit 1
            ;;
    esac
#    info '--> https://mirrors.huaweicloud.com/mirrorDetail/5ea14d84b58d16ef329c5c13?mirrorName=docker-ce&catalog=docker'
#    exit 1
}

export CPS=docker-compose
docker compose version  > /dev/null && export CPS="docker compose"

$CPS > /dev/null || {
    echo "docker-compose is required to install finclip"
    exit 1
}


case $platform in
'Darwin x86_64')
    target=darwin-x64
    ;;
'Darwin arm64')
    target=darwin-aarch64
    ;;
'Linux aarch64' | 'Linux arm64')
    target=linux-aarch64
    ;;
'MINGW64'*)
    target=windows-x64
    ;;
'Linux x86_64' | *)
    target=linux-x64
    ;;
esac


read -p "Conductor 安装目录( 更改目录或按<Enter> $basedir ): " CONDUCTOR_HOME

export CONDUCTOR_HOME=${CONDUCTOR_HOME:-$basedir}
mkdir -p $CONDUCTOR_HOME

check_user() {
  user="$(id -un 2>/dev/null || true)"

  if [ "$user" != 'root' ]; then
    echo "错误：安装程序需要 root 权限" >&2
    exit 1

  fi
}

download() {
  local d=$1
  local s=$2

  if [ -z "$d" ] || [ -z "$s" ]; then
    return 1
  fi

  test -e $d && mv $d "$d"-`date +%Y-%m-%d`
  curl -sSL $s -o $d
}

f_install(){
  
    cd $CONDUCTOR_HOME
    echo "下载文件..."
    download conductor-compose-${CONDUCTOR_VER}.tar.gz  $CONDUCTOR_COMPOSE
    download images-${CONDUCTOR_VER}.tgz              $CONDUCTOR_IMAGES

    tar xf conductor-compose-${CONDUCTOR_VER}.tar.gz -C ./
    docker load -i images-${CONDUCTOR_VER}.tgz

    echo "设置 FinClip 访问端口，<Ctrl+退格键> 来删除错误键入"
    read -p "按 <回车键> 来使用默认端口 (8000), 或手动输入: " port
    port=${port:-8000}

}


check_user
f_install

echo "Conductor 安装完成 🎉🎉 "




