const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductAdviceSchema = new Schema({
    userID: { type:mongoose.Schema.ObjectId,require, ref:'User'},
    productID:{ type:Schema.Types.ObjectId,require, ref:'Product'},
    sellerID:{ type:mongoose.Schema.ObjectId,require, ref:'Seller'},
    question: { type: String},
    answer:{ type: String,default:null},
    active:{type:Boolean,default:false}
},{toJSON:{virtuals:true}});
ProductAdviceSchema.virtual('Seller',{
    ref:'Seller',
    localField:'sellerID',
    foreignField:'_id',
});
ProductAdviceSchema.virtual('User',{
    ref:'User',
    localField:'userID',
    foreignField:'_id',
});
ProductAdviceSchema.virtual('Product',{
    ref:'Product',
    localField:'productID',
    foreignField:'_id',
});

module.exports = mongoose.model('ProductAdvice', ProductAdviceSchema);
