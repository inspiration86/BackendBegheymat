const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CommentController extends Controller {

answerProductAdvice(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.ProductAdvice.findByIdAndUpdate(req.params.id, {
        answer:req.body.answer
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
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.ProductAdvice.find({sellerID:req.params.id})
    .populate({path:'User Product'}).exec((err, ProductAdvice) => {
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

 countProductAdvice(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductAdvice.count({sellerID:req.params.id}).exec((err, ProductAdvice) => {
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
   
}
