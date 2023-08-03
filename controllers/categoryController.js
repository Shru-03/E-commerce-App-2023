import CategoryModel from "../modles/CategoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    // validations
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    // Checking existing category
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        status: true,
        message: "Category already exists",
      });
    }

    // creating new category
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error in category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(201).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error while updating category",
      error,
    });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await CategoryModel.find({});
    res.status(201).send({
      success: true,
      message: "All categories listed",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    res.status(201).send({
      success: true,
      message: "Single category listed",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await CategoryModel.findByIdAndDelete(id);
    res.status(201).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Something Went Wrong",
      error,
    });
  }
};
