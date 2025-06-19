# 用 Node.js 官方的轻量镜像作为基础
FROM node:18

# 设置容器中的工作目录为 /app
WORKDIR /app

# 复制 package.json 和 lock 文件，安装依赖
COPY package.json package-lock.json* ./
RUN npm install

# 把你项目的全部源代码复制进去
COPY . .

# 构建生产文件（如果你是生产环境）
RUN npm run build

# 设置容器启动时执行的命令（开发环境可以是 dev）
CMD ["npm", "run", "dev"]
