const Controller = require(`${config.path.controller}/Controller`);
const AdminTransform = require(`${config.path.transform}/v1/AdminTransform`);
const bcrypt = require('bcrypt');
const { Console } = require('console');
const fs = require('fs');

module.exports = new class CategoryController extends Controller {

    // delete a file
    deleteFile(req, res) {
    
        try {
            
            fs.unlinkSync('C:/BackEndBeghyemat/' +req.body.path.replace(/\\/gi, '/'));
            return res.json({
                data: 'فایل با موفقيت حذف شد',
                success: true
            })
            console.log("File is deleted.");
        } catch (error) {
            return res.json({
                data: 'ناموفق',
                success: false
            })
            console.log(error);
        }
    }
    // C:\BackEndBeghyemat\public\uploads\images
    // delete image in gallery
    deleteGallery(req, res) {
        try {
            // fs.unlinkSync('C:\\BackEndBeghyemat\\'+req.body.path.replace('/',/\\/));
            req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
            if (this.showValidationErrors(req, res))
                return;
            this.model.Product.findOne({_id:req.params.id}).exec((err, Product) => {
                if (err) throw err;
                if (Product) {
                    let x = Product.gallery;
                    let pathArray = Product.gallery;
                    x.splice(req.body.index, 1);
                    for (let i = 0; i <pathArray.length; i++) { 
                        console.log(pathArray[i])
                        if (i == req.body.index) {
                            console.log(i+'='+req.body.index)
                            let path='C:/BackEndBeghyemat/'+pathArray[i].destination+'/'+pathArray[i].filename
                             fs.unlinkSync(path);
                        }
                    }
                    this.model.Product.findByIdAndUpdate(req.params.id, {
                        gallery: x
                    }, (err, ProductR) => {
                        if (ProductR) {
                            return res.json({
                                data: 'تصویر با موفقیت حذف شد',
                                success: true
                            });
                        }
                        res.status(404).json({
                            data: 'چنین اطلاعاتی وجود ندارد',
                            success: false
                        });
                    })

                }

            });
            console.log("File is deleted.");
        } catch (error) {
            return res.json({
                data: 'ناموفق',
                success: false
            })
            console.log(error);
        }
    }


    register(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Category({
            title: req.body.title,

        }).save(err => {
            if (err) {
                throw err;
            }

            return res.json({
                data: 'دسته سطح یک با موفقیت ثبت  شد',
                success: true
            });
        });
    }

    registerSubCategory(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('categoryID', 'وارد کردن فیلد کد  دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategory({
            categoryID: req.body.categoryID,
            title: req.body.title,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'دسته سطح دو با موفقیت ثبت  شد',
                success: true
            });
        });
    }

    registerSubSubCategory(req, res) {
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('SubCategoryID', 'وارد کردن فیلد کد زیر دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubSubCategory({
            SubCategoryID: req.body.SubCategoryID,
            title: req.body.title,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'دسته سطح سه با موفقیت ثبت  شد',
                success: true
            });
        });
    }

    
    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Category.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
        }, (err, Category) => {
            if (err) throw err;
            if (Category) {
                return res.json({
                    data: ' دسته سطح یک با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
  
    updateSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('categoryID', 'وارد کردن فیلد کد  دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategory.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            categoryID:req.body.categoryID
        }, (err, SubCategory) => {
            if (err) throw err;
            if (SubCategory) {
                return res.json({
                    data: '  دسته سطح دو با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    updateSubSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        req.checkBody('title', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        req.checkBody('SubCategoryID', 'وارد کردن فیلد کد  دسته الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubSubCategory.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            SubCategoryID:req.body.SubCategoryID
        }, (err, SubSubCategory) => {
            if (err) throw err;
            if (SubSubCategory) {
                return res.json({
                    data: '  دسته سطح سه با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    delete(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Category.findByIdAndRemove(req.params.id, (err, Category) => {
            if (err) throw err;
            if (Category) {
                return res.json({
                    data: 'دسته سطح یک با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    deleteSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategory.findByIdAndRemove(req.params.id, (err,SubCategory) => {
            if (err) throw err;
            if (SubCategory) {
                return res.json({
                    data: 'دسته سطح دو با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    
    deleteSubSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubSubCategory.findByIdAndRemove(req.params.id, (err,SubSubCategory) => {
            if (err) throw err;
            if (SubSubCategory) {
                return res.json({
                    data: 'دسته سطح سه با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    index(req, res) {
        this.model.Category.find()
            .populate({ path: 'SubCategory', populate: { path: 'SubSubCategory' } })
            .exec((err, Category) => {
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

    indexSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategory.find({ categoryID: req.params.id }).exec((err, SubCategory) => {
            if (err) throw err;
            if (SubCategory) {
                return res.json({
                    data: SubCategory,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    indexSubSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubSubCategory.find({ SubCategoryID: req.params.id }).exec((err, SubSubCategory) => {
            if (err) throw err;
            if (SubSubCategory) {
                return res.json({
                    data: SubSubCategory,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }


   
    searchParentSubCategory(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SubCategory.findById(req.params.id, (err, SubCategory) => {
            if (SubCategory) {
                return res.json({
                    data: SubCategory,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }
    

    storeFeature(req, res) {
        req.checkBody('titleFarsi', 'وارد کردن فیلد عنوان الزامیست').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Features({
            titleFarsi: req.body.titleFarsi,
            titleLatin: req.body.titleLatin,
        }).save(err => {
            if (err) {
                throw err;
            }
            return res.json({
                data: 'محصول با موفقیت ثبت  شد',
                success: true
            });
        });
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
        console.log(req.body.productFeature.length)
        for (var i = 0; i < req.body.productFeature.length; i++) {
            let newFeature = new this.model.ProductFeature({
                subsubCategoryID: req.body.subsubCategoryID,
                productID: req.body.productID,
                featuresID: req.body.productFeature[i].featuresID,
                valueID: req.body.productFeature[i].valueID,

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
        let result = await this.model.Features.find().populate('FeaturesValue');
        if (result) {
            return res.json({
                data: result,
                success: true
            })
        }
        else {
            return res.json({
                data: 'ویژگی وجود ندارد',
                success: false
            })
        }
    }
    async indexFeatureValue(req, res) {
        let result = await this.model.FeaturesValue.find({ featuresID: req.body.featuresID });
        if (result) {
            return res.json({
                data: result,
                success: true
            })
        }
        else {
            return res.json({
                data: 'ویژگی وجود ندارد',
                success: false
            })
        }
    }
}
