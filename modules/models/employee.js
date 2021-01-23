const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const EmployeeSchema = new Schema({
    mobile: { type: String,require:true },
    password: { type: String },
    lawyerCode: { type: String },//کد وکالت
    nationalCode: { type: String},
    idNum: { type: String},// شماره شناسنامه
    acountNum: { type: String},
    firstName: { type: String },
    lastName: { type: String },
    fatherName: { type: String },
    gender: { type: String},
    image: { type: String},
    address: { type: String},
    degree:{ type: String},
    workExperience:{ type: String},//سابقه کار
    email:{ type: String},
    dateLawyerLicense:{ type: String},//تاریخ اعتبار پروانه وکالت
    lawyerNotebook:{ type: String},//دفترچه وکالت
    lawyerLicense:{ type: String},//پروانه وکالت
    resume:{ type: String},//رزومه
    phoneNumber:{ type: String},
    typeEmployee:{ type: String},
});
EmployeeSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})
module.exports = mongoose.model('Employee', EmployeeSchema);