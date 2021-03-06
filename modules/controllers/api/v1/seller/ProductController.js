const Controller = require(`${config.path.controller}/Controller`);
const AdminTransform = require(`${config.path.transform}/v1/AdminTransform`);
const bcrypt = require('bcrypt');
module.exports = new class ProductController extends Controller {

        registerProduct(req, res) {
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
                date: req.body.date,
                time: req.body.time,
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

        Products(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Product.find({sellerID:req.params.id}).populate({
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

        updateProduct(req, res) {

           let listFields={};
          if(req.body.categoryID){ listFields.categoryID=req.body.categoryID}
          if(req.body.subCategory){ listFields.subCategory=req.body.subCategory}
          if(req.body.subSubCategory){ listFields.subSubCategory=req.body.subSubCategory}
          if(req.body.title){ listFields.title=req.body.title}
          if(req.body.count){ listFields.count=req.body.count}
          if(req.body.detail){ listFields.detail=req.body.detail}
          if(req.body.offer){ listFields.offer=req.body.offer}
          if(req.body.offerPercent){ listFields.offerPercent=req.body.offerPercent}
          if(req.body.offerText){ listFields.offerText=req.body.offerText}
          if(req.body.topText){ listFields.topText=req.body.topText}
          if(req.body.features){ listFields.features=req.body.features}
          if(req.body.specifications){ listFields.specifications=req.body.specifications}
          if(req.body.image){ listFields.image=req.body.image}
          if(req.body.help){ listFields.help=req.body.help}
          if(req.body.gallery){ listFields.gallery=req.body.gallery}
          if(req.body.briefFeature){ listFields.briefFeature=req.body.briefFeature}
          if(req.body.giftType){ listFields.giftType=req.body.giftType}
          if(req.body.weight){ listFields.weight=req.body.weight}
          if(req.body.price){ listFields.price=req.body.price}
          if(req.body.freeSend){ listFields.freeSend=req.body.freeSend}
          console.log(listFields)
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Product.update({_id:req.params.id}, 
            // sellerID: req.body.sellerID,
            {$set: listFields}


        , (err, slider) => {
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


    async storeFeature(req, res) {
        req.checkBody('titleFarsi', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newFeature = new this.model.Features({ ...req.body });
        await newFeature.save();

        if (newFeature) {
            return res.json({
                data: 'ویژگی با موفقيت ثبت شد',
                success: true
            })
        }
        else {
            return res.json({
                data: 'خطا دارد',
                success: true
            })
        }
    }
    async storeFeatureValue(req, res) {
        console.log(req.body)

        let newFeature = new this.model.FeaturesValue({ ...req.body });
        await newFeature.save();
        if (newFeature) {
            return res.json({
                data: 'مقدار ویژگی با موفقيت ثبت شد',
                success: true
            })
        }
        else {
            return res.json({
                data: 'خطا دارد',
                success: true
            })
        }
    }
    storeProductFeature(req, res) {
        console.log(req.body);
        let newFeature ;
        for(var i=0;i<req.body.productFeature.length;i++){
             newFeature = new this.model.ProductFeature({
                productID:req.body.productID,
                featuresID:req.body.productFeature[i].featuresID,
                valueID:req.body.productFeature[i].valueID,

            }).save();

        }

        if (newFeature) {
            return res.json({
                data: 'ویژگی محصول با موفقيت ثبت شد',
                success: true
            })
        }
        else {
            return res.json({
                data: 'خطا دارد',
                success: true
            })
        }
    }
    async indexFeature(req, res) {
        let result =  await this.model.Features.find().populate('FeaturesValue');
        if(result){
            return res.json({
                data:result,
                success:true
            })
        }
        else{
            return res.json({
                data:'ویژگی وجود ندارد',
                success:false
            })
        }
    }
    async indexFeatureValue(req, res) {
        let result =  await this.model.FeaturesValue.find({featuresID:req.body.featuresID});
        if(result){
            return res.json({
                data:result,
                success:true
            })
        }
        else{
            return res.json({
                data:'ویژگی وجود ندارد',
                success:false
            })
        }
    }

    singleProduct(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Product.find({_id:req.params.id }).populate({
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

    showCategory(req, res) {
        this.model.Category.find().exec((err, Category) => {
            if (err) throw err;
            if (Category) {
                return res.json({
                    data: Category,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }
    deleteProductFeature(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductFeature.findByIdAndRemove(req.params.id, (err, result) => {
            if (err) throw err;
            if (result) {
                return res.json({
                    data: 'ویژگی محصول با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین ویژگی وجود ندارد',
                success: false
            });
        });
    }
    storeProductFeatureSingle(req, res) {
        console.log(req.body);
        let newFeature ;
      
             newFeature = new this.model.ProductFeature({
                productID:req.body.productID,
                featuresID:req.body.featuresID,
                valueID:req.body.valueID,

            }).save();

     

        if (newFeature) {
            return res.json({
                data: 'ویژگی محصول با موفقيت ثبت شد',
                success: true
            })
        }
        else {
            return res.json({
                data: 'خطا دارد',
                success: true
            })
        }
    }
}
