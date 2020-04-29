const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const config = require("../utils/config");

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Tesen API",
      description: "Tensen community API Information",
      contact: {
        name: "congdaovan94@gmail.com",
      },
      servers: [`http://localhost:${config.PORT}`],
    },
  },
  apis: ["./src/controllers/*.js"],
  // apis: ["./src//app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
