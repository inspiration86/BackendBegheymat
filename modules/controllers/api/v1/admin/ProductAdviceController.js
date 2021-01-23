const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CommentController extends Controller {

activeProductAdvice(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.ProductAdvice.findByIdAndUpdate(req.params.id, {
        active:true
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

allProductAdvice(req, res) {
    this.model.ProductAdvice.find().populate({path:'User Product Seller'}).exec((err, ProductAdvice) => {
        if (err) throw err;
        if (ProductAdvice) {
            return res.json({
                data: ProductAdvice,
                success: true
            });
        }
        res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
    });
}

deleteProductAdvice(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.ProductAdvice.findByIdAndRemove(req.params.id, (err, ProductAdvice) => {
        if (err) throw err;
        if (ProductAdvice) {
            return res.json({
                data: ' با موفقیت حذف شد',
                success: true
            });
        }
        res.status(404).json({
            data: 'چنین اطلاعاتی وجود ندارد',
            success: false
        });
    });
}

   
}
