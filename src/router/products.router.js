const { Router } = require('express');
const productsController = require('../controller/product.controller');
const isAdmin = require('../middlewares/isAdmin')

const productRouter = Router()

productRouter.get('/:id?', productsController.getAllProducts)
productRouter.post('/', isAdmin,productsController.createProduct)
productRouter.put('/:id', isAdmin, productsController.updateProduct)
productRouter.delete('/:id', isAdmin, productsController.deletePoduct)

module.exports = productRouter
