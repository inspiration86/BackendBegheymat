const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PaymentSchema = new Schema({
    userID: { type:mongoose.Schema.ObjectId, ref:'user payment'},
    sellerID: { type:mongoose.Schema.ObjectId, ref:'Seller'},
    resNumber:{ type: String,  },//شناسه پرداخت
    price:{ type: Number },//پول شارژ
    pricePost:{ type: Number },//پول شارژ
    statusPayment:{type: String, default: 'ناموفق'},//وضعیت تراکنش
    date: { type: String,  },//تاریخ
    time: { type: String, },//ساعت
    nationalCode:{type: String, },
    mobile:{type: String, },
	refID:{type: String},//شماره تراکنش
});
module.exports = mongoose.model(' Payment', PaymentSchema);
