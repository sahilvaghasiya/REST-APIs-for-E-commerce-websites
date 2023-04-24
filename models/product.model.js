const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    subCategory:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    color:{
        type: String,
        enum: {
            values: ['black', 'golden', 'white', 'blue', 'pink'],
            message:"enter right color"
              },
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    material:{
        type: String,
        required: true
    },
    origin:{
        type: String,
        required: true
    }
}, {timestamps:true}
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;