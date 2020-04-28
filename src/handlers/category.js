const Category = require("../models/category");

const categories = ["Business", "Law", "Marketing", "Offices"];

const getAllCategories = async (req, res, next) => {
  try {
    await initializeSampleDataForCategory();
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const initializeSampleDataForCategory = async () => {
  const savedCategories = await Category.find({});
  if (savedCategories.length === 0) {
    for (let index = 0; index < categories.length; index++) {
      const category = categories[index];
      const toSaveCategory = Category({ name: category });
      await toSaveCategory.save();
    }
  }
};

module.exports = {
  getAllCategories,
};
