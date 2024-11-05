const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },  
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  color: { type: String, required: true },
  image: { type: String, required: true },
  user_id: { 
    type: Schema.Types.ObjectId,  
    ref: 'user',                 
               
  }
});

module.exports = mongoose.model('cart', CartSchema);
