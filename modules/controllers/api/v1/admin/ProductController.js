const Controller = require(`${config.path.controller}/Controller`);
const AdminTransform = require(`${config.path.transform}/v1/AdminTransform`);
module.exports = new class AuthController extends Controller {
    advanceSearchProduct(req, res) {
        let query = {};
        let sort='';
        if (req.body.categoryID) {
            query.categoryID = req.body.categoryID;
        }
        if (req.body.subCategory) {
            query.subCategory = req.body.subCategory;
        }
        if (req.body.subSubCategory) {
            query.subSubCategory = req.body.subSubCategory;
        }
        if (req.body.count) {
            query.count = {$gte:req.body.count};
        }
        if (req.body.offer) {
            query.offer = req.body.offer;
        }
        if (req.body.freeSend) {
            query.freeSend = req.body.freeSend;
        }
        if (req.body.title) {
            query.title = req.body.title;
        }
        if (req.body.priceMin && req.body.priceMax) {
            query.price = {$gte:req.body.priceMin, $lte: req.body.priceMax};
        }
       
    if (req.body.updatedAt) {
        sort={updatedAt:req.body.updatedAt};
    }
    if (req.body.price) {
        sort={price:req.body.price};
    }
    if (req.body.countSell) {
        sort ={countSell:req.body.countSell};
    }
       if (this.showValidationErrors(req, res))
           return;
        this.model.Product.find(query).sort(sort).populate({
            path: 'Category SubCategory SubSubCategory Seller Inventory ProductFeature',
            populate: [{
                path: 'FeaturesValue', 
                model: 'FeaturesValue',
            },
              {  
                    path: 'Feature',
                    model: 'Features'
              
            }],
           
        }).exec((err, Product) => {
            console.log(Product)
            if (err)
                res.json({
                    data: err,
                    success: false
                })
            if (Product) {
                return res.json({
                    data: Product,
                    success: true
                });
            }
           // else if(Product==null){
              //   res.json({
              //  data: 'اطلاعاتی وجود ندارد',
               // success: false
           // })
            //}
           
        });

    }
    register(req, res) {
      
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newProduct = new this.model.Product({

            sellerID: req.body.sellerID,
            categoryID: req.body.categoryID,
            subCategory: req.body.subCategory,
            subSubCategory: req.body.subSubCategory,
            title: req.body.title,
            count: req.body.count,
            price: req.body.price,
            detail: req.body.detail,
            offer: req.body.offer,
            offerPercent: req.body.offerPercent,
            offerText: req.body.offerText,
            countSell: req.body.countSell,
            topText: req.body.topText,
            date: req.body.date,
            time: req.body.time,
            features: req.body.features,
            specifications: req.body.specifications,
            image: req.body.image,
            help:req.body.help,
            gallery: req.body.gallery,
            briefFeature:req.body.briefFeature,
            giftType:req.body.giftType,
            weight:req.body.weight,
            freeSend:req.body.freeSend,
            color:req.body.color


        })
        newProduct.save(err => {
            if (err) {
                throw err;
            }

            this.model.Inventory({
                productID: newProduct._id,
                count: req.body.count,
                // date: req.body.date,
                // time: req.body.time,
            }).save(err => {
                if (err) {
                    throw err;
                }
                return res.json({
                    data: 'محصول با موفقیت ثبت  شد',
                    result: newProduct,
                    success: true
                });
            });

        })

    }

    index(req, res) {
        // .populate('Category Seller Inventory ProductFeature ')
        this.model.Product.find().populate({
            path: 'Category SubCategory SubSubCategory Seller Inventory ProductFeature',
            populate: [{
                path: 'FeaturesValue', 
                model: 'FeaturesValue',
            },
              {  
                    path: 'Feature',
                    model: 'Features'
              
            }],
           
        })
       .exec((err, Product) => {
            if (err) throw err;
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
    hottest(req, res) {
        this.model.Product.find({ offer: true }).sort({updatedAt:-1}).populate({
            path: 'Category SubCategory SubSubCategory Seller Inventory ProductFeature',
            populate: [{
                path: 'FeaturesValue', 
                model: 'FeaturesValue',
            },
              {  
                    path: 'Feature',
                    model: 'Features'
              
            }],
           
        })
        .sort({ offerPercent: -1 }).exec((err, Product) => {
            if (err) throw err;
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
    Bestselling(req, res) {

        this.model.Product.find().sort({updatedAt:-1}).populate({
            path: 'Category SubCategory SubSubCategory Seller Inventory ProductFeature',
            populate: [{
                path: 'FeaturesValue', 
                model: 'FeaturesValue',
            },
              {  
                    path: 'Feature',
                    model: 'Features'
              
            }],
           
        }).sort({ countSell: -1 }).exec((err, Product) => {
            if (err) throw err;
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
    //Related products
    relatedProducts(req, res) {
        this.model.Product.find({ subSubCategory: req.params.id }).populate({
            path: 'Category SubCategory SubSubCategory Seller Inventory ProductFeature',
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
    allProduct(req, res) {
        this.model.Product.find().sort({updatedAt:-1}).populate({
            path: 'Category SubCategory SubSubCategory Seller Inventory ProductFeature',
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
    findProductByID(req, res) {
        this.model.Product.find({ _id: req.body._id }).populate({
            path: 'Comment Category SubCategory SubSubCategory Seller Inventory ProductFeature',
            populate: [{
                path: 'FeaturesValue', 
                model: 'FeaturesValue',
            },
              {  
                    path: 'Feature',
                    model: 'Features'
              
            }],
           
        }).exec((err, Product) => {
            if (err) res.json({
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

    giftProducts(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Product.find({giftID:req.params.id}).populate({
            path: 'Category SubCategory SubSubCategory Seller Inventory ProductFeature ProductGift',
            populate: [{
                path: 'FeaturesValue', 
                model: 'FeaturesValue',
            },
              {  
                    path: 'Feature',
                    model: 'Features'
              
            }],
           
        }).exec((err, Gift) => {
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
        this.model.Product.findByIdAndUpdate(req.params.id, {
            sellerID: req.body.sellerID,
            categoryID: req.body.categoryID,
            subCategory: req.body.subCategory,
            subsubCategory: req.body.subsubCategory,
            title: req.body.title,
            count: req.body.count,
            price: req.body.price,
            detail: req.body.detail,
            offer: req.body.offer,
            offerPercent: req.body.offerPercent,
            offerText: req.body.offerText,
            countSell: req.body.countSell,
            topText: req.body.topText,
            date: req.body.date,
            time: req.body.time,
            features: req.body.features,
            specifications: req.body.specifications,
            image: req.body.image,
            help:req.body.help,
            gallery: req.body.gallery,
            briefFeature:req.body.briefFeature,
            giftType:req.body.giftType,
            weight:req.body.weight,
            freeSend:req.body.freeSend,
            color:req.body.color



        }, (err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: ' محصول با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین محصولی وجود ندارد',
                success: false
            });
        });
    }

        deleteProduct(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
          //  fs.unlinkSync('C:\\BackEndBeghyemat\\'+req.body.path.replace('/',/\\/));
        this.model.Product.findByIdAndRemove(req.params.id, (err, slider) => {
            if (err) throw err;
            if (slider) {
                return res.json({
                    data: 'محصول با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین محصولی وجود ندارد',
                success: false
            });
        });
    }



    allProductBySearch(req, res) {
        this.model.Product.find({title:{$regex:req.body.title}}).populate({
            path: 'Category SubCategory SubSubCategory Seller Inventory ProductFeature',
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


    allProductByCategoryID(req, res) {
        this.model.Product.find({categoryID:req.params.id}).populate({
            path: 'Category SubCategory SubSubCategory Seller Inventory ProductFeature',
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

    allProductBySubCategoryID(req, res) {
        this.model.Product.find({subCategory:req.params.id}).populate({
            path: 'Category SubCategory SubSubCategory Seller Inventory ProductFeature',
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

    allProductBySubSubCategoryID(req, res) {
        this.model.Product.find({subSubCategory:req.params.id}).populate({
            path: 'Category SubCategory SubSubCategory Seller Inventory ProductFeature',
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
