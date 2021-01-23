const Controller = require(`${config.path.controller}/Controller`);
const randomstring  = require('randomstring');

module.exports = new class ContractController extends Controller {

registerContractSellerbe(req, res) {
    req.checkBody('sellerID', 'وارد کردن فیلد کد سلر الزامیست').notEmpty();
    req.checkBody('ContractText', 'وارد کردن فیلد متن قرارداد الزامیست').notEmpty();
    req.checkBody('startDate', 'وارد کردن فیلد تاریخ پایان الزامیست').notEmpty();
    req.checkBody('endDate', 'وارد کردن فیلد تاریخ شروع الزامیست').notEmpty();
    if (this.showValidationErrors(req, res))
        return;
    this.model.ContractSellerbe({
        sellerID: req.body.sellerID,
        ContractText: req.body.ContractText,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        ContractCode:randomstring.generate({charset: 'begheymat', length: 2})+'/'+(req.body.startDate)+'/'+randomstring.generate({charset: '12345678', length: 3}),
        active:true
    }).save(err => {
        if (err) {
            throw err;
        }
        return res.json({
            data: ' با موفقیت ثبت  شد',
            success: true
        });
    });



}

allContractSellerbe(req, res) {
    this.model.ContractSellerbe.find().sort({ContractText:-1}).populate({path: 'Seller'}).exec((err, ContractSellerbe) => {
        if (err) throw err;
        if (ContractSellerbe) {
            return res.json({
                data: ContractSellerbe,
                success: true
            });
        }
        res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
    });
}

updateContractSellerbe(req, res) {
req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
if (this.showValidationErrors(req, res))
    return;
this.model.ContractSellerbe.findByIdAndUpdate(req.params.id, {
   // sellerID: req.body.sellerID,
    ContractText: req.body.ContractText,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
}, (err, ContractSellerbe) => {
    if (err) throw err;
    if (ContractSellerbe) {
        return res.json({
            data: '  با موفقیت آپدیت شد',
            success: true
        });
    }
    res.status(404).json({
        data: '  وجود ندارد',
        success: false
    });
});
}

deleteContractSellerbe(req, res) {
req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
if (this.showValidationErrors(req, res))
    return;
this.model.ContractSellerbe.findByIdAndRemove(req.params.id, (err, ContractSellerbe) => {
    if (err) throw err;
    if (ContractSellerbe) {
        return res.json({
            data: ' با موفقیت حذف شد',
            success: true
        });
    }
    res.status(404).json({
        data: ' وجود ندارد',
        success: false
    });
});
}

singleContractSellerbe(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.ContractSellerbe.find({_id:req.params.id }).populate({path: 'Seller'})
    .exec((err, ContractSellerbe) => {
        if (err) res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
        if (ContractSellerbe) {
            return res.json({
                data: ContractSellerbe,
                success: true
            });
        }
        res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
    });
}

deactiveContractSellerbe(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.ContractSellerbe.findByIdAndUpdate(req.params.id, {
       active:false
    }, (err, ContractSellerbe) => {
        if (err) throw err;
        if (ContractSellerbe) {
            return res.json({
                data: '  با موفقیت آپدیت شد',
                success: true
            });
        }
        res.status(404).json({
            data: '  وجود ندارد',
            success: false
        });
    });
    }

activeContractSellerbe(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ContractSellerbe.findByIdAndUpdate(req.params.id, {
           active:true
        }, (err, ContractSellerbe) => {
            if (err) throw err;
            if (ContractSellerbe) {
                return res.json({
                    data: '  با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: '  وجود ندارد',
                success: false
            });
        });
        }
}
