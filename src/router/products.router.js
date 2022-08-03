const { Router } = require('express');
const productsController = require('../controller/product.controller');
const isAdmin = require('../middlewares/isAdmin')

const routerProducts = Router()

routerProducts.get('/:id?', productsController.getAllProducts)
routerProducts.post('/', isAdmin,productsController.createProduct)
routerProducts.put('/:id', isAdmin, productsController.updateProduct)
routerProducts.delete('/:id', isAdmin, productsController.deletePoduct)

module.exports = routerProducts
