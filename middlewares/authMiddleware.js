// authMiddleware.js

const jwt = require("jsonwebtoken");
const jwtSecret = "your_jwt_secret"; // 设置一个安全的随机字符串作为密钥

// 生成 JWT
const generateToken = (user) => {
  const token = jwt.sign({ user }, jwtSecret, { expiresIn: "1h" }); // token 有效期为 1 小时
  return token;
};

// 验证 JWT
const verifyToken = async (ctx, next) => {
  try {
    const token = ctx.header.authorization.split(" ")[1]; // 从 Authorization 头部获取 JWT
    console.log("token", token);
    const decoded = jwt.verify(token, jwtSecret);
    ctx.state.user = decoded.user; // 将解码后的用户信息存储在 state 中，供后续中间件或路由使用
    await next();
  } catch (err) {
    ctx.status = 401;
    ctx.body = { error: "Unauthorized" };
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
