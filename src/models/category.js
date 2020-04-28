const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

categorySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

categorySchema.plugin(uniqueValidator);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
