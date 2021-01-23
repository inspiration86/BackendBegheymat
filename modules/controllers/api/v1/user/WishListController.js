const Controller = require(`${config.path.controller}/Controller`);
const AdminTransform = require(`${config.path.transform}/v1/AdminTransform`);
const bcrypt = require('bcrypt');
module.exports = new class WishListController extends Controller {
    addWishList(req, res) {
        req.checkBody('productID', 'وارد کردن فیلد کد محصول الزامیست').notEmpty();
        req.checkBody('userID', 'وارد کردن فیلد کد کاربر الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
            this.model.Wishlist.findOne({productID: req.body.productID,userID:req.body.userID}, (err, Wishlist) => {
                if (err)  return res.json({
                    data: err,
                    success: false
                });
                if (Wishlist == null) {
        this.model.Wishlist({
            productID: req.body.productID,
            userID: req.body.userID,
    
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
    else
    return res.json({
        data: ' این محصول قبلاً در لیست علاقه مندی شما ثبت  شده است',
        success: false
    });
    });

} 

        deleteWishList(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Wishlist.findByIdAndRemove(req.params.id, (err, Wishlist) => {
            if (err) throw err;
            if (Wishlist) {
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

    allWishlist(req, res) {
        this.model.Wishlist.find({userID:req.body.userID}).exec((err, WishList) => {
            if (err) throw err;
            if (WishList) {
                return res.json({
                    data: WishList,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
}

countWishlist(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.Wishlist.count({userID:req.params.id}).exec((err, WishList) => {
        if (err) throw err;
        if (WishList) {
            return res.json({
                data: WishList,
                success: true
            });
        }
        res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
    });
}

    allWishlistByUserID(req, res) {
        this.model.Product.find({}).populate({
            path: 'Category Seller Inventory ProductFeature wishlist',
            populate: [{
                path: 'FeaturesValue', 
                model: 'FeaturesValue',
            },
              {  
                    path: 'Feature',
                    model: 'Features'
              
            }],
           
        }).exec((err, Product) => {
            if (err)
                res.json({
                    data: 'اطلاعاتی وجود ندارد',
                    success: false
                })
            if (Product) {
                return res.json({
                    data: Product,
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
