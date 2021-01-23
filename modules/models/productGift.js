const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductGiftSchema = new Schema({
    productID: { type:Schema.Types.ObjectId,require, ref:'Product'},
    giftID: { type:Schema.Types.ObjectId,require, ref:'gift'},
});
module.exports = mongoose.model('ProductGift', ProductGiftSchema);