const ShoppingCart =  require('../clases/ShoppingCart');
const shoppingCart = new ShoppingCart('./src/data/shoppingCarts.txt');


const createShoppingCart = async(req, res) => {
    try {
        const shoppingCartCreated = await shoppingCart.save();
        res.json({
            message: 'Shopping Cart created successfully',
            shoppingCartId:shoppingCartCreated.id
        })
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const getProductsByShoppingCartId = async(req, res) => {
    try {
        const productsFound = await shoppingCart.getProducts(+req.params.id);

        if(!productsFound){
            return res.status(404).json({
                error: 'Shopping Cart is empty or not found'
            })
        }

        return res.json({
            products: productsFound
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const addProductToShoppingCart = async(req, res) => {
    try {
        const message = await shoppingCart.addProductToShoppingCart(+req.params.id, +req.params.productId);

        res.json({
            message
        })
        
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const deleteProductByIdFromShoppingCartId = async(req, res) => {
    try {

        
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const deleteShoppingCartById = async(req, res) => {
    try {
        let message = await shoppingCart.deleteById(+req.params.id)
        return res.json({
            message
        })
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

module.exports = {
    getProductsByShoppingCartId,
    createShoppingCart,
    deleteShoppingCartById,
    deleteProductByIdFromShoppingCartId,
    addProductToShoppingCart
}