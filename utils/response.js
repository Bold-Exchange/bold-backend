// utils/response.js

function createResponse(code, message, data = null) {
  return {
    code,
    message,
    data,
  };
}

module.exports = { createResponse };
