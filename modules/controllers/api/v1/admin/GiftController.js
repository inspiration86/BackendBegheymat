const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class GiftController extends Controller {

 
    registerProductGift(req, res) {
        req.checkBody('productID', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('giftID', 'وارد کردن فیلد تصویر الزامیست').notEmpty();

        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductGift({
            productID: req.body.productID,
            giftID: req.body.giftID,
    
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

    register(req, res) {
        req.checkBody('giftTitle', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('giftSvg', 'وارد کردن فیلد تصویر الزامیست').notEmpty();

        if (this.showValidationErrors(req, res))
            return;
        this.model.Gift({
            giftTitle: req.body.giftTitle,
            giftSvg: req.body.giftSvg,
            linkUrl:req.body.linkUrl,
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

    index(req, res) {
        this.model.Gift.find().exec((err, Gift) => {
            if (err) throw err;
            if (Gift) {
                return res.json({
                    data: Gift,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
}

updateProduct(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Gift.findByIdAndUpdate(req.params.id, {
        giftTitle: req.body.giftTitle,
        giftSvg: req.body.giftSvg,
        linkUrl:req.body.linkUrl,


    }, (err, Gift) => {
        if (err) throw err;
        if (Gift) {
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

    delete(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Gift.findByIdAndRemove(req.params.id, (err, Gift) => {
        if (err) throw err;
        if (Gift) {
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



}
