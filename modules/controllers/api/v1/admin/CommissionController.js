const Controller = require(`${config.path.controller}/Controller`);
const randomstring  = require('randomstring');

module.exports = new class CommissionController extends Controller {

registerCommission(req, res) {
    req.checkBody('categoryID', 'وارد کردن فیلد کد گروه الزامیست').notEmpty();
    req.checkBody('percent', 'وارد کردن فیلد درصد کمیسیون الزامیست').notEmpty();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Commission({
        categoryID: req.body.categoryID,
        percent: req.body.percent
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

allCommission(req, res) {
    this.model.Commission.find()
    .populate({path: 'Category  SubCategory SubSubCategory'}).exec((err, Commission) => {
        if (err) throw err;
        if (Commission) {
            return res.json({
                data: Commission,
                success: true
            });
        }
        res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
    });
}

updateCommission(req, res) {
req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
if (this.showValidationErrors(req, res))
    return;
this.model.Commission.findByIdAndUpdate(req.params.id, {
    categoryID: req.body.categoryID,
    percent: req.body.percent
}, (err, Commission) => {
    if (err) throw err;
    if (Commission) {
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

deleteCommission(req, res) {
req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
if (this.showValidationErrors(req, res))
    return;
this.model.Commission.findByIdAndRemove(req.params.id, (err, Commission) => {
    if (err) throw err;
    if (Commission) {
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

singleCommission(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Commission.find({_id:req.params.id }).populate({path: 'Category  SubCategory SubSubCategory'})
    .exec((err, Commission) => {
        if (err) res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
        if (Commission) {
            return res.json({
                data: Commission,
                success: true
            });
        }
        res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
    });
}

searchCommission(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Commission.find({categoryID:req.params.id}).populate({path: 'Category  SubCategory SubSubCategory'})
    .exec((err, Commission) => {
        if (err) res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
        if (Commission) {
            return res.json({
                data: Commission,
                success: true
            });
        }
        res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
    });
}
}