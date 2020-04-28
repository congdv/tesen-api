require("dotenv").config();

let PORT = process.env.PORT;
let MONGODB_URL = process.env.MONGODB_URL;
let MONGODB_DBNAME = process.env.MONGODB_DBNAME;
let MONGODB_URI = `${MONGODB_URL}/${MONGODB_DBNAME}`;

module.exports = { PORT, MONGODB_URI };
