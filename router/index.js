const Router = require("koa-router");

const pool = require("../db/db");
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserData,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const router = new Router();

// 注册用户
router.post("/api/register", registerUser);

// 登录用户
router.post("/api/login", loginUser);

// 查询用户（需要授权）
router.get("/api/data", verifyToken, getUserData);

// 更新用户（需要授权）
router.put("/api/user/:id", verifyToken, updateUser);

// 删除用户（需要授权）
router.delete("/api/user/:id", verifyToken, deleteUser);

module.exports = router;
