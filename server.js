const express = require('express');
const productRouter = require('./src/router/products.router');
const shoppingCartRouter = require('./src/router/shoppingCart.router')

const app = express();
const PORT = process.env.PORT || 8080;

app.set('views', './public/views')
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use( express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index')
})
app.use('/api/products', productRouter);
app.use('/api/shopping-cart', shoppingCartRouter);

const server = app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
server.on('error', (error) => console.error(error));
