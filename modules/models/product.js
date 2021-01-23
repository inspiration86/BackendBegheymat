const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
// var mongoosePaginate = require('mongoose-paginate');

const ProductSchema = new Schema({
	sellerID:{ type:mongoose.Schema.ObjectId,require, ref:'Seller'},
    categoryID:{ type:mongoose.Schema.ObjectId,require, ref:'Category'},
    subCategory: { type:mongoose.Schema.ObjectId,require, ref:'subCategory'},
    subSubCategory: {type:mongoose.Schema.ObjectId,require, ref:'SubSubCategory'},
    title: { type: String,},
    count: { type: String },
    price: { type: Number },
    viewCount: { type: String },
    detail: { type: String },
    image: { type: String },
    offer:{type:Boolean, default:false},
    offerPercent:{type:Number,default: 0},
    offerText:{type:String},
    countSell:{type:Number,default: 0},
	topText: { type: String },
    help: { type: String },
    date: { type: String },
    time:{type: String,default:'00:00:00'},
    specifications: { type: String },
    briefFeature: { type: String },
    gallery:{type:Array},
    giftType:{type:String},
    weight:{type:Number},
    freeSend:{type:Boolean,default:false},
    colors:{type:Array}
},{timestamps:true,toJSON:{virtuals:true}});
ProductSchema.virtual('Comment',{
    ref:'Comment',
    localField:'_id',
    foreignField:'productID',
});
ProductSchema.virtual('ProductGift',{
    ref:'ProductGift',
    localField:'_id',
    foreignField:'productID',
});
ProductSchema.virtual('ProductFeature',{
    ref:'ProductFeature',
    localField:'_id',
    foreignField:'productID',
});
ProductSchema.virtual('Category',{
    ref:'Category',
    localField:'categoryID',
    foreignField:'_id',
});
ProductSchema.virtual('SubCategory',{
    ref:'SubCategory',
    localField:'subCategory',
    foreignField:'_id',
});
ProductSchema.virtual('SubSubCategory',{
    ref:'SubSubCategory',
    localField:'subSubCategory',
    foreignField:'_id',
});
ProductSchema.virtual('Seller',{
    ref:'Seller',
    localField:'sellerID',
    foreignField:'_id',
});
ProductSchema.virtual('Inventory',{
    ref:'Inventory',
    localField:'_id',
    foreignField:'productID',
});
module.exports = mongoose.model('Product', ProductSchema);
