const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const wishlistSchema = new Schema({
    productID: { type:Schema.Types.ObjectId,require, ref:'Product' },
    userID: { type: String, required: true },
})
module.exports = mongoose.model('wishlist', wishlistSchema);