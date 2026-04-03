# Docker 部署指南

## 快速部署

### 1. 构建并启动服务

```bash
docker-compose up -d --build
```

### 2. 查看日志

```bash
# 查看所有服务日志
docker-compose logs -f

# 只查看应用日志
docker-compose logs -f app

# 只查看数据库日志
docker-compose logs -f mysql
```

### 3. 停止服务

```bash
docker-compose down
```

### 4. 完全清理（包括数据库数据）

```bash
docker-compose down -v
```

## 服务访问

- **应用**: http://localhost:3000
- **MySQL**: localhost:3307 (外部访问端口)

## 架构说明

```
┌─────────────────┐
│   Next.js App   │  Port: 3000
│   (Container)   │
└────────┬────────┘
         │
         │ 内部网络
         │
┌────────▼────────┐
│   MySQL 8.0     │  Port: 3306 (内部)
│   (Container)   │        3307 (外部)
└─────────────────┘
```

## 环境变量

生产环境的环境变量在 `.env.production` 文件中配置。

## 数据库初始化

数据库会在首次启动时自动执行 `sql/` 目录下的所有 `.sql` 文件。

## 故障排查

### 应用无法连接数据库

检查MySQL是否已经启动并健康：
```bash
docker-compose ps
```

### 查看详细错误

```bash
docker-compose logs app
```

### 重新构建

```bash
docker-compose up -d --build --force-recreate
```
