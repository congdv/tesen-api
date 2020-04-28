const mongoose = require("mongoose");
const user = require("./user");
const uniqueValidator = require("mongoose-unique-validator");

const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  community: {
    type: mongoose.Schema.ObjectId,
    ref: "Community",
    required: true,
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

commentSchema.plugin(uniqueValidator);
const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
