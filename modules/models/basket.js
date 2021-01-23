const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const BasketSchema = new Schema({
	 sellerID: {type:mongoose.Schema.ObjectId,},
    userID: { type:mongoose.Schema.ObjectId},
    categoryID:{ type:mongoose.Schema.ObjectId},
    productID: { type:mongoose.Schema.ObjectId, ref:'product'},
    refID:{ type: String },
    count: { type: String },
    price: { type: String },
    offerPercent: { type: String },
    priceAll: { type: String },
    pricePost:{type:String},
    date: { type: String, default:'0000/00/00'},
    success:{type: String,default:'ناموفق'},
    time:{type: String,default:'00:00:00'},
},{toJSON:{virtuals:true}});
BasketSchema.virtual('product',{
    ref:'Product',
    localField:'productID',
    foreignField:'_id',

});
BasketSchema.virtual('user',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',

});
BasketSchema.virtual('payment',{
    ref:'Payment',
    localField:'userID',
    foreignField:'userID',

});
module.exports = mongoose.model('Basket', BasketSchema);
