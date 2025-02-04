const mongoose = require('mongoose');
const orderSchema = mongoose.Schema(
    {
        hitList: {
            type: [mongoose.Schema.Types.Mixed],
            required: true
        },
        clientFirstName: {
            type: String,
            required: true
        },
        clientLastName: {
            type: String,
            required: true
        },
        clientPhoneNumber: {
            type: String,
            required: true
        },
        clientEmail: {
            type: String,
            required: true
        }
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;

