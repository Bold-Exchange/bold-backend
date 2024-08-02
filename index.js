// index.js
const router = require("./router");
const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const app = new Koa();

// 使用 bodyParser 中间件来解析请求体
app.use(bodyParser());
// 使用路由
app.use(router.routes());
app.use(router.allowedMethods());

// 启动服务
const port = process.env.PORT || 3200;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
