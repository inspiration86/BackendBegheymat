const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const UserSchema = new Schema({
    firstName: { type: String ,default:'کاربر به قیمت'},//نام
	lastName: { type: String},//فامیلی
	nationalCode: { type: String},//فامیلی
    mobile: { type: String, required: true },//شماره همراه
    phone: { type: String, },//تلفن ثابت
    password: { type: String, required: true },//رمز
    state: { type: String},//استان
    city: { type: String},//شهر
    address: { type: String },//آدرس
    postalCode: { type: String },//کد پستی
    Plaque: { type: String},//پلاک
    accountNumber:{type:String},
    cardNumber:{type:String},
    image:{type:String},
    type:{type:String,default:'user'},
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
module.exports = mongoose.model('User', UserSchema);
