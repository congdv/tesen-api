const config = require("./utils/config");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

//Swaggers
const swaggers = require("./swagger");

// Import middleware
const middleware = require("./utils/middleware");

// Import Router handle
const router = require("./controllers");

// Initialize App
const app = express();

// MongoDB connection
console.log(`Connecting to ${config.MONGODB_URI}`);
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connection to MongoDB: ", error.message);
  });

app.use(
  "/api-docs",
  swaggers.swaggerUi.serve,
  swaggers.swaggerUi.setup(swaggers.swaggerDocs)
);
app.use(cors());
app.use(bodyParser.json());

// Use middleware to handle request first
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

/**
 * @swagger
 * /api/community:
 *  get:
 *    description: Use to request all communities
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api", router);

//Static folder
app.use("/assets", express.static("public"));

// Use middleware to handle response
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
