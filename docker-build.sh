#!/bin/sh
# 用法: ./docker-push.sh 1.2.3
# 传入版本号作为第一个参数

if [ -z "$1" ]; then
  VERSION=latest
  echo "未指定版本号，使用默认 tag: latest"
else
  VERSION=$1
fi
IMAGE=wangzhidong/games-nestjs

echo "==> 构建镜像: $IMAGE:$VERSION"
docker build -t $IMAGE:$VERSION . || exit 1

echo "==> 完成"