const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SellerSchema = new Schema({
    mobile: { type: String, required: true },//شماره همراه
    phone: { type: String, },//تلفن ثابت
    password: { type: String, required: true },//رمز
    type:{type:String,default:'seller'},
    address: { type: String },//آدرس
    firstName:{ type: String, },
    lastName:{ type: String, },
    state: { type: String, },
    city:{ type: String, },
    postalCode: { type: String, },
    logo: { type: String, },
    birthDay:{ type: String, },
    nationalCode:{ type: String, },
    idNumber:{ type: String, },
    shopName:{ type: String, },
    category:{ type: String, },
    gender:{ type: String, },
    companyName:{ type: String, },
    regNumCompany:{ type: String, },
    economicCompany:{ type: String, },
    shabaNumber:{ type: String, },
    typeCompany:{ type: String, },
    signCompany:{ type: String, },
    imageSeller:{ type: String, },
    imageNationalcard:{ type: String, },
    imageCertificate:{ type: String, },
    imageCompany:{ type: String, },
    resume:{ type: String, },
    active:{ type: Boolean,default:false }

});
SellerSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
module.exports = mongoose.model('Seller', SellerSchema);
