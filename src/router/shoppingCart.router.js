const { Router } = require('express');
const shoppingCartController = require('../controller/shoppingCart.controller');

const shoppingCartRouter = Router();

shoppingCartRouter.get(
    '/:id/products',
    shoppingCartController.getProductsByShoppingCartId
);

shoppingCartRouter.post('/', shoppingCartController.createShoppingCart);

shoppingCartRouter.post(
    '/:id/products/:productId',
    shoppingCartController.addProductToShoppingCart
);

shoppingCartRouter.delete(
    '/:id',
    shoppingCartController.deleteShoppingCartById
);

shoppingCartRouter.delete(
    '/:id/products/:product_id',
    shoppingCartController.deleteProductByIdFromShoppingCartId
);

module.exports = shoppingCartRouter;
