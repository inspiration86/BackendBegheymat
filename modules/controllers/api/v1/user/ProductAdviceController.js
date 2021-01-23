const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CommentController extends Controller {
    addProductAdvice(req, res) {
        req.checkBody('productID', 'وارد کردن فیلد کد محصول الزامیست').notEmpty();
        req.checkBody('userID', 'وارد کردن فیلد کد کاربر الزامیست').notEmpty();
        req.checkBody('sellerID', 'وارد کردن فیلد کد فروشنده الزامیست').notEmpty();
        req.checkBody('question', 'وارد کردن فیلد متن پرسش الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductAdvice({
            userID: req.body.userID,
            productID:req.body.productID,
            sellerID:req.body.sellerID,
            question:req.body.question,
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

allProductAdvice(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.ProductAdvice.find({productID:req.params.id})
    .populate({path:'User Product Seller'}).exec((err, ProductAdvice) => {
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
        this.model.ProductAdvice.count({productID:req.params.id}).exec((err, ProductAdvice) => {
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
