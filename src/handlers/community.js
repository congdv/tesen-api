const Community = require("../models/community");
const Category = require("../models/category");

const { validationResult } = require("express-validator");

const getCommunity = async (req, res, next) => {
  try {
    const communityId = req.params.id;
    const community = await Community.findById(communityId).populate(
      "category"
    );
    if (!community) {
      throw new {
        status: 404,
        message: "The community is not found",
      }();
    }

    res.status(200).json(community);
  } catch (error) {
    next(error);
  }
};

const getAllCommunities = async (req, res, next) => {
  try {
    const allCommunities = await Community.find({}).populate("category");
    res.status(200).json(allCommunities);
  } catch (error) {
    next(error);
  }
};

const addCommunity = async (req, res, next) => {
  try {
    const communityToAdd = new Community({
      ...req.body,
    });

    const savedCommunity = await communityToAdd.save();

    res.status(201).json(savedCommunity);
  } catch (error) {
    next(error);
  }
};

const updateCommunity = async (req, res, next) => {
  try {
    const communityId = req.params.id;

    const updatedCommunity = await Community.findByIdAndUpdate(communityId, {
      ...req.body,
      updatedAt: Date.now(),
    });

    res.status(200).json(updatedCommunity);
  } catch (error) {
    next(error);
  }
};

const deleteCommunity = async (req, res, next) => {
  try {
    const communityId = req.params.id;

    await Community.findByIdAndDelete(communityId);

    res
      .status(204)
      .json({ status: 204, message: "Successfully deleted community" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCommunities,
  getCommunity,
  addCommunity,
  updateCommunity,
  deleteCommunity,
};
