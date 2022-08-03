const Product =  require('../clases/Product');
const product = new Product('./src/data/productos.txt');

const getAllProducts = async(req, res) => {
    try {
        if (isNaN(+req.params.id)) {
            res.json({
                products: await product.getAll()
            });
            
        }else {
            getProductById(req, res)
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const getProductById = async(req, res) => {
    try {
        const productFound = await product.getById(+req.params.id);

        if(!productFound){
            return res.json({
                error: 'Product not found'
            })
        }

        return res.json({
            product: productFound
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const createProduct = async(req, res) => {
    try {
        const productCreated = await product.save(req.body);
        res.json({
            message: 'Product created successfully',
            product:productCreated
        })
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const updateProduct = async(req, res) => {
    try {
        const message = await product.updateById(+req.params.id, req.body);
        if(!message){
            return res.json({
                error: `Product with ID: ${+req.params.id} not found`
            })
        }
        return res.json({
            message
        });
    } catch (error) {
        res.status(500).json({
            error: 'Something went wrong'
        })
    }
}

const deletePoduct = async(req, res) => {
    try {
        let message = await product.deleteById(+req.params.id)
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
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deletePoduct
}