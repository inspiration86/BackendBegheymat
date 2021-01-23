const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GiftSchema = new Schema({
    giftTitle: { type: String},
    giftSvg: { type: String},
    linkUrl: { type: String},
});
module.exports = mongoose.model('Gift', GiftSchema);