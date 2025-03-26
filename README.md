# 🚀 个人博客服务端

这是一个基于NestJS框架开发的个人博客后端服务，提供用户认证、注册、登录等功能。

## 🛠️ 技术栈

- **NestJS**: 🔥 基于Node.js的服务端框架
- **TypeORM**: 🗃️ ORM框架，用于数据库操作
- **MySQL**: 💾 数据库
- **Redis**: ⚡ 用于缓存和存储临时数据（如验证码）
- **JWT**: 🔐 用于用户认证和授权
- **Nodemailer**: 📧 用于发送邮件（验证码）

## ✨ 功能特性

- 👤 用户注册与登录
- 📩 邮箱验证码发送
- 🔒 JWT认证
- 👥 用户管理（增删改查）

## 📦 安装与运行

### 📋 前置条件

- Node.js (v20+)
- MySQL
- Redis

### 📥 安装依赖

```bash
npm install
# 或
yarn
```

### ⚙️ 环境变量配置

在项目根目录创建`.env`文件，配置以下环境变量：

```
# 服务器配置
PORT=7878

# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=personal_blog

# Redis配置
REDIS_HOST=localhost
REDIS_PORT=6380
REDIS_PASSWORD=your_redis_password
REDIS_DB=0

# JWT配置
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

### 🚀 运行项目

#### 🔧 开发环境

```bash
npm run dev
# 或
yarn dev
```

#### 🏭 生产环境

```bash
npm run build
npm run start:prod
# 或
yarn build
yarn start:prod
```

## 📁 项目结构

```
src/
├── app.controller.ts      # 应用控制器
├── app.module.ts          # 应用模块（根模块）
├── app.service.ts         # 应用服务
├── main.ts                # 应用入口文件
├── modules/               # 功能模块
│   ├── auth/              # 认证模块
│   ├── email/             # 邮件模块
│   ├── redis/             # Redis模块
│   └── user/              # 用户模块
└── untils/                # 工具函数
```

## 📚 API文档

### 🔐 认证相关

- `POST /auth/login`: 用户登录

### 👤 用户相关

- `GET /user/getUser/:id`: 获取指定用户信息
- `GET /user/getUser`: 获取所有用户信息
- `POST /user/addUser`: 添加用户
- `DELETE /user/deleteUser/:id`: 删除用户
- `POST /user/getEmail`: 发送验证码邮件
- `POST /user/register`: 用户注册

## 🧪 测试

### 🔍 单元测试

```bash
npm run test
# 或
yarn test
```

### 🔬 E2E测试

```bash
npm run test:e2e
# 或
yarn test:e2e
```

## 📄 许可证

[MIT](LICENSE)