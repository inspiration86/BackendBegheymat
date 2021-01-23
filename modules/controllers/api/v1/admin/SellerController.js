const Controller = require(`${config.path.controller}/Controller`);
const bcrypt = require('bcrypt');
module.exports = new class SellerController extends Controller {
   
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
    

    updateSeller(req, res) {
        let listFields={};
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
            if(req.body.firstName){ listFields.firstName=req.body.firstName}
            if(req.body.lastName){ listFields.lastName=req.body.lastName}
            if(req.body.phone){ listFields.phone=req.body.phone}
            if(req.body.state){ listFields.state=req.body.state}
            if(req.body.city){ listFields.city=req.body.city}
            if(req.body.address){ listFields.address=req.body.address}
            if(req.body.postalCode){ listFields.postalCode=req.body.postalCode}
            if(req.body.logo){ listFields.logo=req.body.logo}
            if(req.body.birthDay){ listFields.birthDay=req.body.birthDay}
            if(req.body.nationalCode){ listFields.nationalCode=req.body.nationalCode}
            if(req.body.idNumber){ listFields.idNumber=req.body.idNumber}
            if(req.body.shopName){ listFields.shopName=req.body.shopName}
            if(req.body.category){ listFields.category=req.body.category}
            if(req.body.gender){ listFields.gender=req.body.gender}
            if(req.body.companyName){ listFields.companyName=req.body.companyName}
            if(req.body.regNumCompany){ listFields.regNumCompany=req.body.regNumCompany}
            if(req.body.economicCompany){ listFields.economicCompany=req.body.economicCompany}
            if(req.body.shabaNumber){ listFields.shabaNumber=req.body.shabaNumber}
            if(req.body.typeCompany){ listFields.typeCompany=req.body.typeCompany}
            if(req.body.signCompany){ listFields.signCompany=req.body.signCompany}
            if(req.body.imageSeller){ listFields.imageSeller=req.body.imageSeller}
            if(req.body.imageNationalcard){ listFields.imageNationalcard=req.body.imageNationalcard}
            if(req.body.imageCertificate){ listFields.imageCertificate=req.body.imageCertificate}
            if(req.body.imageCompany){ listFields.imageCompany=req.body.imageCompany}
            if(req.body.resume){ listFields.resume=req.body.resume}
        this.model.Seller.findByIdAndUpdate(req.params.id,listFields, (err, User) => {
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

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.findByIdAndRemove(req.params.id, (err, Seller) => {
            if (err) throw err;
            if (Seller) {
                return res.json({
                    data: 'سلر با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
    
    activeSeller(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.findByIdAndUpdate(req.params.id, {
                active:true,
        }, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: ' فروشنده با موفقیت فعال شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین فروشنده ای وجود ندارد',
                success: false
            });

        });
    }

    deactiveSeller(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Seller.findByIdAndUpdate(req.params.id, {
                active:false,
        }, (err, User) => {
            if (err) throw err;
            if (User) {
                return res.json({
                    data: ' فروشنده با موفقیت غیرفعال شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین فروشنده ای وجود ندارد',
                success: false
            });

        });
    }
}
