const jwt = require("jsonwebtoken");
const isPlainObject = require("lodash/isPlainObject");

const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, process.env.SECRET);
    if (isPlainObject(payload)) {
      return payload;
    }
    throw { message: "Token is not valid" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  verifyToken,
};
