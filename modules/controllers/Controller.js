// Model
const Admin= require(`${config.path.model}/admin`);
const Employee = require(`${config.path.model}/employee`);
const User = require(`${config.path.model}/user`);
const Category = require(`${config.path.model}/category`);
const SubCategory=require(`${config.path.model}/subCategory`);
const SubSubCategory=require(`${config.path.model}/subsubCategory`);
const Payment = require(`${config.path.model}/payment`);
const Seller = require(`${config.path.model}/seller`);
const Product = require(`${config.path.model}/product`);
const Slider = require(`${config.path.model}/slider`);
const Basket=require(`${config.path.model}/basket`);
const Inventory=require(`${config.path.model}/Inventory`);
const FeaturesValue=require(`${config.path.model}/featuresValue`);
const Features=require(`${config.path.model}/features`);
const ProductFeature=require(`${config.path.model}/productFeature`);
const SmsNewsletter=require(`${config.path.model}/smsNewsletter`);
const EmailNewsletter=require(`${config.path.model}/emailNewsletter`);
const Gift=require(`${config.path.model}/gift`);
const ProductGift=require(`${config.path.model}/productGift`);
const Wishlist=require(`${config.path.model}/wishlist`);
const Comment=require(`${config.path.model}/comment`);
const ProductAdvice=require(`${config.path.model}/productAdvice`);
const Notification=require(`${config.path.model}/notification`);
const ContractSellerbe=require(`${config.path.model}/contractSellerbe`);
const Commission=require(`${config.path.model}/commission`);

module.exports = class Controller {
    constructor() {
        this.model = { Admin,Employee,User,Category,FeaturesValue,Features,ProductFeature,Product,Slider,Basket,Inventory,
            Payment,Seller,SmsNewsletter,EmailNewsletter,Gift,ProductGift,Wishlist,
            Comment,SubCategory,SubSubCategory,ProductAdvice,Notification,
            ContractSellerbe,Commission}
    }
    showValidationErrors(req, res, callback) {
        let errors = req.validationErrors();
        if (errors) {
            res.json({
                message: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        }
        return false
    }

    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }
}
