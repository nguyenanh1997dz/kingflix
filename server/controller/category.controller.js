const {HandleError} = require('../middleware/error')
const asyncHandler = require("express-async-handler");
const Category = require('../model/category.model');

const createCategory = asyncHandler(async(req,res) => {
   console.log(req.body);
     try {
        const newCategory = await Category.create(req.body)
        return  res.status(201).json(newCategory);
     } catch (error) {
        throw new HandleError(error.message)
     }
})
const getCategories = asyncHandler(async(req,res) => {
    try {
       const categories = await Category.find()
       return  res.status(200).json(categories);
    } catch (error) {
       throw new HandleError(error.message)
    }
})
const getCategoryById = asyncHandler(async(req,res) => {
    const {id} = req.params
    try {
       const category = await Category.findById(id)
       return  res.status(200).json(category);
    } catch (error) {
       throw new HandleError(error.message)
    }
})
const deleteCategory = asyncHandler(async(req,res) => {
    const {id} = req.params
    try {
       await Category.findByIdAndDelete(id)
       return  res.status(200).json({message: "Delete category successfully"});
    } catch (error) {
       throw new HandleError(error.message)
    }
})
const updateCategory = asyncHandler(async(req,res) => {

   const {name} = req.body
   const {id} = req.params
   try {
      await Category.findByIdAndUpdate(id, { $set: { name: name}})
      return  res.status(200).json({message: "Update category successfully"});
   } catch (error) {
      throw new HandleError(error.message)
   }
});
module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    deleteCategory,
    updateCategory
}