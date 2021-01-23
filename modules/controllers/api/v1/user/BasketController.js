const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');
const randomstring  = require('randomstring');
module.exports = new class BasketController extends Controller {


    register(req, res) {
        req.checkBody('userID', 'وارد کردن فیلد کد کاربر الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
                this.model.Basket({
                    userID: req.body.userID,
                    productID: req.body.productID,
                    count:req.body.count,
                    price:req.body.price,
                    offerPercent:req.body.offerPercent,
                    priceAll:req.body.priceAll,
                    pricePost:req.body.pricePost,
                    typePost:req.body.typePost,
                    date:req.body.date,
                    time:req.body.time
                }).save(err => {
                    if (err) {
                        throw err;
                    }
                    return res.json({
                        data: 'محصول در سبد با موفقیت ثبت شد',
                        success: true
                    });
                })

    }

    index(req, res) {
        this.model.Basket.find({userID:req.body.userID}).populate('product user').exec((err, cartcustom) => {
            if (err) throw err;
            if (cartcustom) {
                return res.json({
                    data: cartcustom,
                    success: true
                });
            }
            res.json({
                data: 'هیچ  وجود ندارد',
                success: false
            })
        });
    }



}
