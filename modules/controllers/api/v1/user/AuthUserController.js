const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');
const randomstring  = require('randomstring');
module.exports = new class AuthUserController extends Controller {

    SmsNewsletter(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SmsNewsletter.findOne({mobile: req.body.mobile}, (err, User) => {
            if (err)  return res.json({
                data: err,
                success: false
            });
            if (User == null) {
                this.model.SmsNewsletter({
                    mobile: req.body.mobile,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'شماره با موفقیت ثبت  شد',
                        success: true
                    });
                })
            }
            else
                return res.json({
                    data: ' این شماره همراه قبلاً ثبت  شده است',
                    success: false
                });
    })
    }

    EmailNewsletter(req, res) {
        req.checkBody('email', 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.EmailNewsletter.findOne({email: req.body.email}, (err, User) => {
            if (err)  return res.json({
                data: err,
                success: false
            });
            if (User == null) {
                this.model.EmailNewsletter({
                    email: req.body.email,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'ایمیل با موفقیت ثبت  شد',
                        success: true
                    });
                })
            }
            else
                return res.json({
                    data: ' این ایمیل  قبلاً ثبت  شده است',
                    success: false
                });
    })
    }



       singleUser(req, res) {

        this.model.User.findOne({mobile:req.body.mobile}).exec((err, User) => {
			
            if (User) {
                return res.json({
                    data: User,
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
        this.model.User.findByIdAndUpdate(req.params.id, {
            password: hash,
        }, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'رمز عبور با موفقیت تغییر یافت',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین کاربری وجود ندارد',
                success: false
            });
        });
    }


    UpdateUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findByIdAndUpdate(req.params.id, {
                    // mobile: req.body.mobile,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    nationalCode:req.body.nationalCode,
                    phone: req.body.phone,
                    state: req.body.state,
                    city: req.body.city,
                    address: req.body.address,
                    postalCode: req.body.postalCode,
                    plaque: req.body.plaque,
                    accountNumber:req.body.accountNumber,
                    cardNumber:req.body.cardNumber,
                    image:req.body.image
        }, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'اطلاعات کاربر با موفقیت بروز رسانی شد',
                    success: true
                });
            }

            res.status(404).json({
                data: 'چنین کاربری وجود ندارد',
                success: false
            });

        });
    }


    register(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findOne({mobile: req.body.mobile}, (err, User) => {
            if (err)  return res.json({
                data: err,
                success: false
            });
            if (User == null) {
                this.model.User({
                    mobile: req.body.mobile,
                    password: req.body.password,
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'کاربر با موفقیت ثبت  شد',
                        success: true
                    });
                })
            }
            else
                return res.json({
                    data: 'کاربری با این شماره همراه قبلاً ثبت نام شده است',
                    success: false
                });
    })
    }


    login(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findOne({mobile: req.body.mobile}, (err, User) => {
            if (err) throw err;
            if (User == null)
                return res.json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });
            bcrypt.compare(req.body.password, User.password, (err, status) => {
                if (!status)
                    return res.json({
                        success: false,
                        data: 'پسورد وارد شده صحیح نمی باشد'
                    })
                return res.json({
                    data: new UserTransform().transform(User, true),
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
        this.model.User.findOneAndUpdate({mobile: req.body.mobile}, {password: hash}, (err, User) => {
            if (err) throw err;
            if (User) {
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
}
