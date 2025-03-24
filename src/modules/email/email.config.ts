import * as dotenv from 'dotenv';

dotenv.config(); // 加载.env 文件中的环境变量

export default {
  host: process.env.EMAIL_HOST,  // 你的 SMTP 服务器地址，如 QQ 邮箱、Gmail 等
  port: process.env.EMAIL_PORT,  // SMTP 端口，常见端口：465（SSL）、587（TLS）
  auth: {
    user: process.env.EMAIL_USER,  // 你的邮箱
    pass: process.env.EMAIL_PASSWORD, // 你的 SMTP 授权码（不是邮箱密码）
  },
};
