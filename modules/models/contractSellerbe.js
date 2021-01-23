const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ContractSellerbeSchema = new Schema({
    sellerID: { type:mongoose.Schema.ObjectId, ref:'Seller'},
    ContractText:{ type: String},
    ContractCode:{ type: String},
    startDate: { type: String},
    endDate:{type:String},
    active:{type:Boolean}
},{toJSON:{virtuals:true}});
ContractSellerbeSchema.virtual('Seller',{
    ref:'Seller',
    localField:'sellerID',
    foreignField:'_id',
});
module.exports = mongoose.model('ContractSellerbe', ContractSellerbeSchema);