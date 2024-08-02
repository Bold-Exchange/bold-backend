const pool = require("../db/db");
const { createResponse } = require("../utils/response");
const { generateToken } = require("../middlewares/authMiddleware");

const bcrypt = require("bcrypt");

// 注册用户
const registerUser = async (ctx) => {
  const { username, password, email } = ctx.request.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 10 是盐值轮数
    const [result] = await pool.query(
      "INSERT INTO users (username, password, email) VALUES (?, ?, ?)",
      [username, hashedPassword, email]
    );
    ctx.body = createResponse(200, "User registered successfully", {
      id: result.insertId,
    });
  } catch (err) {
    ctx.status = 500;
    ctx.body = createResponse(500, "Internal Server Error", err.message);
  }
};

// 登录用户
const loginUser = async (ctx) => {
  const { username, password } = ctx.request.body;
  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (rows.length > 0) {
      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = generateToken({ username });
        ctx.body = createResponse(200, "Login successful", { token });
      } else {
        ctx.status = 401;
        ctx.body = createResponse(401, "Unauthorized");
      }
    } else {
      ctx.status = 401;
      ctx.body = createResponse(401, "Unauthorized");
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = createResponse(500, "Internal Server Error", err.message);
  }
};

// 查询用户
const getUserData = async (ctx) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    ctx.body = createResponse(200, "Data retrieved successfully", rows);
    console.log(ctx.state.user, 123);
  } catch (err) {
    ctx.status = 500;
    ctx.body = createResponse(500, "Internal Server Error", err.message);
  }
};

// 更新用户
const updateUser = async (ctx) => {
  const { id } = ctx.params;
  const { username, email } = ctx.request.body;
  try {
    await pool.query("UPDATE users SET username = ?, email = ? WHERE id = ?", [
      username,
      email,
      id,
    ]);
    ctx.body = createResponse(200, "User updated successfully");
  } catch (err) {
    ctx.status = 500;
    ctx.body = createResponse(500, "Internal Server Error", err.message);
  }
};

// 删除用户
const deleteUser = async (ctx) => {
  const { id } = ctx.params;
  try {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);
    ctx.body = createResponse(200, "User deleted successfully");
  } catch (err) {
    ctx.status = 500;
    ctx.body = createResponse(500, "Internal Server Error", err.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserData,
  updateUser,
  deleteUser,
};
