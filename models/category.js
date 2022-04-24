const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  parent: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;