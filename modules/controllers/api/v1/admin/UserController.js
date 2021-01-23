const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');
const randomstring  = require('randomstring');
module.exports = new class UserController extends Controller {
    showUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findById(req.params.id, (err, User) => {
            if (User) {
                return res.json({
                    data: User,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }


 allUser(req, res) {

        this.model.User.find({} ,(err, User) => {
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
    
    updateUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findByIdAndUpdate(req.params.id, {
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

    deleteUser(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.User.findByIdAndRemove(req.params.id, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: 'کاربر با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    registerUser(req, res) {
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


}
