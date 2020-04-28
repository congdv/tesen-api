const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const communitySchema = new mongoose.Schema({
  pictureCover: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  isCloseCommunity: {
    type: Boolean,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  category: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
  ],
});

communitySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

communitySchema.plugin(uniqueValidator);
const Community = mongoose.model("Community", communitySchema);
module.exports = Community;
