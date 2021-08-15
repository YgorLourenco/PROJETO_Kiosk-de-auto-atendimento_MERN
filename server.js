const express = require('express')
const mongoose = require('mongoose')
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

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`O servidor esta na URL http://localhost:${port}`)
})