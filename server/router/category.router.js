const express = require('express')
const { authMiddleware } = require('../middleware/auth')
const { createCategory, getCategories, getCategoryById ,deleteCategory,updateCategory} = require('../controller/category.controller')

const router = express.Router()
router.get('/',getCategories)
router.get('/:id',getCategoryById)
router.post('/',createCategory)
router.delete('/:id',deleteCategory)
router.put('/:id',updateCategory)
module.exports = router