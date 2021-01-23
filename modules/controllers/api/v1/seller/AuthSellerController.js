const Controller = require(`${config.path.controller}/Controller`);
const SellerTransform = require(`${config.path.transform}/v1/SellerTransform`);
const bcrypt = require('bcrypt');
const randomstring  = require('randomstring');
module.exports = new class AuthSellerController extends Controller {
   
    showSeller(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.find({_id:req.params.id}, (err, Seller) => {
            if (Seller) {
                return res.json({
                    data:Seller,
                    success: true
                })
            }
            res.json({
                data: 'فروشنده یافت نشد',
                success: false
            })
        })
    }


 allseller(req, res) {

        this.model.Seller.find({} ,(err, Seller) => {
            if (Seller) {
                return res.json({
                    data: Seller,
                    success: true
                })
            }
            res.json({
                data: 'کاربر یافت نشد',
                success: false
            })
        })
    }
    changePassword(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let hash = bcrypt.hashSync(req.body.password, 10);
        this.model.Seller.findByIdAndUpdate(req.params.id, {
            password: hash,
        }, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'ارمز عبور با موفقیت تغییر یافت',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کاربری وجود ندارد',
                success: false
            });
        });
    }

    updateSeller(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.findByIdAndUpdate(req.params.id, {
           // mobile: req.body.mobile,
            // password:  bcrypt.hashSync(req.body.password, 10),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            state: req.body.state,
            city: req.body.city,
            address: req.body.address,
            postalCode: req.body.postalCode,
            logo: req.body.logo,
            birthDay:req.body.birthDay,
            nationalCode:req.body.nationalCode,
            idNumber:req.body.idNumber,
            shopName:req.body.shopName,
            category:req.body.category,
            gender:req.body.gender,
            companyName:req.body.companyName,
            regNumCompany:req.body.regNumCompany,
            economicCompany:req.body.economicCompany,
            shabaNumber:req.body.shabaNumber,
            typeCompany:req.body.typeCompany,
            signCompany:req.body.signCompany,
            imageSeller:req.body.imageSeller,
            imageNationalcard:req.body.imageNationalcard,
            imageCertificate:req.body.imageCertificate,
            imageCompany:req.body.imageCompany,
            resume:req.body.resume,
        }, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'اطلاعات فروشنده با موفقیت بروز رسانی شد',
                    success: true
                });
            }

            res.status(404).json({
                data: 'چنین فروشنده ای وجود ندارد',
                success: false
            });

        });
    }

    register(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.findOne({mobile: req.body.mobile}, (err, Seller) => {
            if (err)  return res.json({
                data: err,
                success: false
            });
            if (Seller == null) {
                this.model.Seller({
                    mobile: req.body.mobile,
                    password: req.body.password,


                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'فروشنده با موفقیت ثبت  شد',
                        success: true
                    });
                })
            }
            else
                return res.json({
                    data: 'فروشنده ای با این شماره همراه قبلاً ثبت نام شده است',
                    success: false
                });
    })
    }

    login(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.findOne({mobile: req.body.mobile}, (err, Seller) => {
            if (err) throw err;
            if (Seller == null)
                return res.json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });
            bcrypt.compare(req.body.password, Seller.password, (err, status) => {
                if (!status)
                    return res.json({
                        success: false,
                        data: 'پسورد وارد شده صحیح نمی باشد'
                    })
                return res.json({
                    data: new SellerTransform().transform(Seller, true),
                    success: true
                });
            })
        })
    }

    resetPassword(req, res) {
        let newpassword = randomstring.generate({charset: '123456789', length: 8});
        let hash = bcrypt.hashSync(newpassword, 10);
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.findOneAndUpdate({mobile: req.body.mobile}, {password: hash}, (err, Seller) => {
            if (err) throw err;
            if (Seller) {
                return res.json({
                    data: 'اطلاعات با موفقیت آپدیت شد',
                    newpass: newpassword,
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    sendSms(req, res) {
        let code = randomstring.generate({charset: '123456789', length: 5});
        let text = " فروشگاه به قیمت" +
            "\n" +
            "شما می توانید با استفاده از کد فعال سازی زیر وارد فروشگاه شوید." +
            "\n" +
            "کد فعال سازی:" +
            code;
     // const html=(res.send('http://www.0098sms.com/sendsmslink.aspx?' + 'FROM=3000164545&TO=' + req.body.TO +
     //        '&Text=' + text + '&USERNAME=zsms7691&PASSWORD=3333114811&DOMAIN=0098'));
        var root = HTMLParser.parse(res.redirect('http://www.0098sms.com/sendsmslink.aspx?' + 'FROM=3000164545&TO=' + req.body.TO +
            '&Text=' + text + '&USERNAME=zsms7691&PASSWORD=3333114811&DOMAIN=0098'));

        console.log(root)
    }
    singleSeller(req, res) {

        this.model.Seller.findOne({mobile:req.body.mobile}).exec((err, Seller) => {
			
            if (Seller) {
                return res.json({
                    data: Seller,
                    success: true
                })
            }
            res.json({
                data: 'فروشنده یافت نشد',
                success: false
            })
        })
    }
}
