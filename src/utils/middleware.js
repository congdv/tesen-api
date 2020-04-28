const authToken = require("./authToken");
const User = require("../models/user");

const requestLogger = (request, response, next) => {
  console.log("Method: ", request.method);
  console.log("Path: ", request.path);
  console.log("Body: ", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (_request, response) => {
  response.status(404).send({
    error: {
      status: 404,
      message: "unknown endpoint",
    },
  });
};

const errorHandler = (error, _request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError" && error.kind === "ObjectId") {
    return response
      .status(400)
      .send({ error: { status: 400, message: "malformated id" } });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error: {
        status: 400,
        message: error.message,
      },
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(400).send({
      error: {
        status: 400,
        message: "token is not valid",
      },
    });
  } else {
    if (error.status) {
      return response.status(error.status).json(error);
    }
    return response.status(401).json({ error: error.message });
  }
  next(error);
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
};

const tokenExtractor = (request, _response, next) => {
  const token = getTokenFrom(request);
  request.token = token;
  next();
};

const authenticationUser = async (request, response, next) => {
  const token = request.token;
  if (!token) {
    return response
      .status(401)
      .send({ message: "Authentication token not found" });
  }
  try {
    const userId = authToken.verifyToken(request.token).id;
    if (!userId) {
      return response
        .status(401)
        .send({ message: "Authentication token is invalid" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return response
        .status(401)
        .send({ message: "Authentication token is invalid: User not found" });
    }
    request.currentUser = user;
  } catch (error) {
    return response.status(401).send({ message: error.message });
  }

  next();
};
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  authenticationUser,
};
