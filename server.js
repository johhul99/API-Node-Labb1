require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

const Order = require('./Models/orderModel');
app.use(express.json());

app.post('/api/order', async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(200).json(order);
    } catch (error) {
        res.send(error.message);
        res.status(500);
    }
})

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find({});
        res.status(200).json(orders);
    } catch (error) {
        res.send(error.message);
        res.status(404);
    }
});

app.get('api/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        res.status(200).json(order);
    } catch (error) {
        res.send(error.message);
        res.status(404);
    }
});

app.put('/api/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndUpdate(id, req.body);

        if(!order) {
            return res.status(404).json({ message: "Order does not exist." });
        }

        const newOrder = await Order.findById(id);
        res.status(200).json(newOrder);
    } catch (error) {
        res.send(error.message);
    }
});

app.delete('/api/order/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByIdAndDelete(id);

        if(!order){
            return res.status(404).json({ message: "Order does not exist."});
        }
        res.status(200).json({ order, message:"Deleted."});
    } catch (error) {
        res.send(error.message);
    }
});



mongoose.
    connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to Mongo DB');
        app.listen(PORT, () =>{
            console.log("Server is running!");
        });
    });
    