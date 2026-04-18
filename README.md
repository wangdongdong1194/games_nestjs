# Docker 启动

构建镜像（假设版本为 1.0.0）：

```sh
./docker-build.sh 1.0.0
```

启动容器并映射端口：

```sh
docker run -p 3000:3000 wangzhidong/games-nestjs:1.0.0
```

这样即可通过主机的 3000 端口访问服务。

