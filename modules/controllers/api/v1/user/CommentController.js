const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CommentController extends Controller {
    addComment(req, res) {
        req.checkBody('productID', 'وارد کردن فیلد کد محصول الزامیست').notEmpty();
        req.checkBody('userID', 'وارد کردن فیلد کد کاربر الزامیست').notEmpty();
        req.checkBody('commentText', 'وارد کردن فیلد متن دیدگاه الزامیست').notEmpty();

        if (this.showValidationErrors(req, res))
            return;
        this.model.Comment({
            userID: req.body.userID,
            productID:req.body.productID,
            commentText:req.body.commentText,
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

allCommentForProduct(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Comment.find({productID:req.params.id}).populate({path:'User'}).exec((err, Comment) => {
        if (err) throw err;
        if (Comment) {
            return res.json({
                data: Comment,
                success: true
            });
        }
        res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
    });
}

    countComment(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Comment.count({productID:req.params.id}).exec((err, Comment) => {
            if (err) throw err;
            if (Comment) {
                return res.json({
                    data: Comment,
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
