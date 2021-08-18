const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
const data = require('./data')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extend:true}))

dotenv.config()

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})
// Modelo do DB
const Product = mongoose.model(
    'products',
    new mongoose.Schema({
        name: String,
        description: String,
        image: String,
        price: Number,
        calorie: Number,
        category: String,
    })
)
// Vai mostrar todos os produtos
app.get('/api/products/seed', async(req, res) => {
    const products = await Product.insertMany(data.products)
    res.send({products}) // Vai enviar a lista de produtos criadas no DB como objeto JSON
})
// Vai mostrar todos os produtos por categoria
app.get('/api/products', async(req, res) => {
    const { category } = req.query
    const products = await Product.find(category ? { category } : {}) // Se achar a categoria vai aparecer só ela, se não vai aparecer todas
    res.send(products)
})
// Vai adicionar um novo produto a lista
app.post('/api/products', async(req, res) => {
    const newProduct = new Product (req.body)
    const savedProduct = await newProduct.save()
    res.send(savedProduct)
})

app.get('/api/categories', (req, res) => {
    res.send(data.categories)
})
// Modelo de banco de dados do MongoDB para completar o pedido
const Order = mongoose.model('Order', new mongoose.Schema({
    number: {type: Number, default: 0},
    orderType: String,
    paymentType: String,
    isPaid: {type: Boolean, default: false},
    isReady: {type: Boolean, default: false},
    inProgress: {type: Boolean, default: true},
    isCanceled: {type: Boolean, default: false},
    isDelivered: {type: Boolean, default: false},
    itemsPrice: Number,
    taxPrice: Number,
    totalPrice: Number,
    orderItems: [
        {
            name: String,
            price: Number,
            quantity: Number,
        },
    ],
},
{
    timestamps: true,
},
))

app.post('/api/orders', async(req, res) => {
    // Achar o ultimo pedido que estejam com menos de -1 sendo o limite 1
    const lastOrder = await Order.find().sort({number: -1}).limit(1)
    // Achar o ultimo pedido que seja igual a zero ou seja o primeiro pedido
    const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number
    // Vai verificar se esta faltando alguma informação do pedido
    if (
        !req.body.orderType || 
        !req.body.paymentType || 
        !req.body.orderItems || 
        req.body.orderItems.length === 0
    ) {
        return res.send({message: 'Precisa de dados'})
    }
    // Esperar o pedido para ser salvo e depois enviado
    const order = await Order({...req.body, number: lastNumber + 1}).save()
    res.send(order)
})

// Caminho do back-end para o Heroku
app.use(express.static(path.join(__dirname, '/build')))

// Caminho para acessar a versão build do back-end
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/build/index.html'))
})

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`O servidor esta na URL http://localhost:${port}`)
})