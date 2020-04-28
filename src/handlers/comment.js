const Comment = require("../models/comment");

const getAllComments = async (req, res, next) => {
  try {
    const communityId = req.params.id;
    const allComments = await Comment.find({ community: communityId }).populate(
      "user"
    );
    res.status(200).json(allComments);
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const currentUser = req.currentUser;
    const communityId = req.params.id;
    const toAddComment = new Comment({
      ...req.body,
      community: communityId,
      user: currentUser._id,
    });
    const savedComment = await toAddComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllComments,
  addComment,
};
