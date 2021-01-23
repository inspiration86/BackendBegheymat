const express = require('express');
const router = express.Router();
const adminRouter = express.Router();

// middlewares
const apiAuthAdminUser = require('./middleware/apiAuthAdmin');
const apiAuth = require('./middleware/apiAuth');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
//admin controller
const AdminAuthController = require(`${ControllerApi}/v1/admin/AuthController`);
const AdminUploadController = require(`${ControllerApi}/v1/admin/UploadController`);
const ProductController = require(`${ControllerApi}/v1/admin/ProductController`);
const SliderController = require(`${ControllerApi}/v1/admin/SliderController`);
const CategoryController = require(`${ControllerApi}/v1/admin/CategoryController`);
const GiftController = require(`${ControllerApi}/v1/admin/GiftController`);
const CommentController = require(`${ControllerApi}/v1/admin/CommentController`);
const ProductAdviceController = require(`${ControllerApi}/v1/admin/ProductAdviceController`);
const SellerController = require(`${ControllerApi}/v1/admin/SellerController`);
const ManageProductController = require(`${ControllerApi}/v1/admin/ManageProductController`);
const UserController = require(`${ControllerApi}/v1/admin/UserController`);
const NotificationController = require(`${ControllerApi}/v1/admin/NotificationController`);
const ContractController = require(`${ControllerApi}/v1/admin/ContractController`);
const CommissionController = require(`${ControllerApi}/v1/admin/CommissionController`);

//Commission
adminRouter.post('/registerCommission', CommissionController.registerCommission.bind(CommissionController));
adminRouter.get('/allCommission', CommissionController.allCommission.bind(CommissionController));
adminRouter.put('/updateCommission/:id', CommissionController.updateCommission.bind(CommissionController));
adminRouter.delete('/deleteCommission/:id', CommissionController.deleteCommission.bind(CommissionController));
adminRouter.get('/singleCommission/:id', CommissionController.singleCommission.bind(CommissionController));
adminRouter.get('/searchCommission/:id', CommissionController.searchCommission.bind(CommissionController));


//ContractSellerbe
adminRouter.get('/allContractSellerbe', ContractController.allContractSellerbe.bind(ContractController));
adminRouter.post('/registerContractSellerbe', ContractController.registerContractSellerbe.bind(ContractController));
adminRouter.put('/updateContractSellerbe/:id', ContractController.updateContractSellerbe.bind(ContractController));
adminRouter.delete('/deleteContractSellerbe/:id', ContractController.deleteContractSellerbe.bind(ContractController));
adminRouter.get('/singleContractSellerbe/:id', ContractController.singleContractSellerbe.bind(ContractController));
adminRouter.put('/deactiveContractSellerbe/:id', ContractController.deactiveContractSellerbe.bind(ContractController));
adminRouter.put('/activeContractSellerbe/:id', ContractController.activeContractSellerbe.bind(ContractController));

//Notification
adminRouter.get('/allNotification', NotificationController.index.bind(NotificationController));
adminRouter.post('/registerNotification', NotificationController.store.bind(NotificationController));
adminRouter.put('/UpdateNotification/:id', NotificationController.update.bind(NotificationController));
adminRouter.delete('/deleteNotification/:id', NotificationController.destroy.bind(NotificationController));
adminRouter.get('/singleNotification/:id', NotificationController.single.bind(NotificationController));

//user
adminRouter.post('/registerUser', UserController.registerUser.bind(UserController));
adminRouter.put('/updateUser/:id', UserController.updateUser.bind(UserController));
adminRouter.delete('/deleteUser/:id', UserController.deleteUser.bind(UserController));
adminRouter.get('/allUser', UserController.allUser.bind(UserController));
adminRouter.get('/showUser/:id', UserController.showUser.bind(UserController));


//auth admin
adminRouter.post('/loginAdmin', AdminAuthController.login.bind(AdminAuthController));
adminRouter.post('/registerAdmin', AdminAuthController.register.bind(AdminAuthController));
adminRouter.put('/updateAdmin/:id', AdminAuthController.updateAdmin.bind(AdminAuthController));
adminRouter.delete('/deleteAdmin/:id', AdminAuthController.deleteAdmin.bind(AdminAuthController));
adminRouter.get('/allAdmin', AdminAuthController.allAdmin.bind(AdminAuthController));

//product
adminRouter.post('/registerProduct', ManageProductController.registerProduct.bind(ManageProductController));
adminRouter.get('/Products/:id', ManageProductController.Products.bind(ManageProductController));
adminRouter.put('/updateProduct/:id', ManageProductController.updateProduct.bind(ManageProductController));
adminRouter.delete('/deleteProduct/:id', ManageProductController.deleteProduct.bind(ManageProductController));
adminRouter.get('/singleProduct/:id', ManageProductController.singleProduct.bind(ManageProductController));

//feature
adminRouter.post('/feature', ManageProductController.storeFeature.bind(ManageProductController));
adminRouter.post('/featureValue', ManageProductController.storeFeatureValue.bind(ManageProductController));
adminRouter.post('/productFeature', ManageProductController.storeProductFeature.bind(ManageProductController));
adminRouter.get('/indexFeature', ManageProductController.indexFeature.bind(ManageProductController));
adminRouter.post('/indexFeatureValue', ManageProductController.indexFeatureValue.bind(ManageProductController));
adminRouter.delete('/deleteProductFeature/:id', ManageProductController.deleteProductFeature.bind(ManageProductController));
adminRouter.post('/storeProductFeatureSingle', ManageProductController.storeProductFeatureSingle.bind(ManageProductController));

//ProductAdvice
adminRouter.get('/allProductAdvice', ProductAdviceController.allProductAdvice.bind(ProductAdviceController));
adminRouter.put('/activeProductAdvice/:id', ProductAdviceController.activeProductAdvice.bind(ProductAdviceController));
adminRouter.delete('/deleteProductAdvice/:id', ProductAdviceController.deleteProductAdvice.bind(ProductAdviceController));

//comment
adminRouter.get('/countComment/:id', CommentController.countComment.bind(CommentController));
adminRouter.delete('/deleteComment/:id', CommentController.deleteComment.bind(CommentController));
adminRouter.get('/allComment', CommentController.allComment.bind(CommentController));
adminRouter.put('/activeComment/:id', CommentController.activeComment.bind(CommentController));

//seller
adminRouter.post('/registerSeller', SellerController.register.bind(SellerController));
adminRouter.delete('/deleteSeller/:id', SellerController.destroy.bind(SellerController));
adminRouter.get('/allseller', SellerController.allseller.bind(SellerController));
adminRouter.get('/showSeller/:id', SellerController.showSeller.bind(SellerController));
adminRouter.put('/updateSeller/:id', SellerController.updateSeller.bind(SellerController));
adminRouter.put('/activeSeller/:id', SellerController.activeSeller.bind(SellerController));
adminRouter.put('/deactiveSeller/:id', SellerController.deactiveSeller.bind(SellerController));


adminRouter.post('/deleteGallery/:id',CategoryController.deleteGallery.bind(CategoryController));
adminRouter.post('/deleteImage',CategoryController.deleteFile.bind(CategoryController));
adminRouter.post('/multipleimage',uploadFiles,AdminUploadController.uploadFiles.bind(AdminUploadController));
adminRouter.post('/image', uploadImage.single('image'), AdminUploadController.uploadImage.bind(AdminUploadController));
adminRouter.post('/login', AdminAuthController.login.bind(AdminAuthController));
adminRouter.put('/updateAdmin/:id', AdminAuthController.updateAdmin.bind(AdminAuthController));
//product
adminRouter.post('/product', ProductController.register.bind(ProductController));
adminRouter.get('/product', ProductController.index.bind(ProductController));
adminRouter.post('/findProductByID', ProductController.findProductByID.bind(ProductController));
adminRouter.put('/updateProduct/:id', ProductController.updateProduct.bind(ProductController));
adminRouter.delete('/deleteProduct/:id', ProductController.deleteProduct.bind(ProductController));

//category
adminRouter.post('/registerCategory', CategoryController.register.bind(CategoryController));
adminRouter.get('/category', CategoryController.index.bind(CategoryController));
adminRouter.post('/registerSubCategory', CategoryController.registerSubCategory.bind(CategoryController));
adminRouter.get('/subCategory/:id', CategoryController.indexSubCategory.bind(CategoryController));
adminRouter.post('/registerSubSubCategory', CategoryController.registerSubSubCategory.bind(CategoryController));
adminRouter.get('/subsubCategory/:id', CategoryController.indexSubSubCategory.bind(CategoryController));
adminRouter.get('/searchParentSubCategory/:id', CategoryController.searchParentSubCategory.bind(CategoryController));

adminRouter.put('/updateCategory/:id', CategoryController.update.bind(CategoryController));
adminRouter.put('/updateSubCategory/:id', CategoryController.updateSubCategory.bind(CategoryController));
adminRouter.put('/updateSubSubCategory/:id', CategoryController.updateSubSubCategory.bind(CategoryController));
adminRouter.delete('/deleteCategory/:id', CategoryController.delete.bind(CategoryController));
adminRouter.delete('/deleteSubCategory/:id', CategoryController.deleteSubCategory.bind(CategoryController));
adminRouter.delete('/deleteSubSubCategory/:id', CategoryController.deleteSubSubCategory.bind(CategoryController));


//Gift
adminRouter.get('/showGift', GiftController.index.bind(GiftController));
adminRouter.post('/registerGift', GiftController.register.bind(GiftController));
adminRouter.put('/updateGift', GiftController.updateProduct.bind(GiftController));
adminRouter.delete('/deleteGift', GiftController.delete.bind(GiftController));
adminRouter.post('/registerProductGift', GiftController.registerProductGift.bind(GiftController));
 
//feature
adminRouter.post('/feature', CategoryController.storeFeature.bind(CategoryController));
adminRouter.post('/featureValue', CategoryController.storeFeatureValue.bind(CategoryController));
adminRouter.post('/productFeature', CategoryController.storeProductFeature.bind(CategoryController));
adminRouter.get('/indexFeature', CategoryController.indexFeature.bind(CategoryController));
adminRouter.post('/indexFeatureValue', CategoryController.indexFeatureValue.bind(CategoryController));

//allProductByCategoryID
adminRouter.get('/allProductByCategoryID/:id', ProductController.allProductByCategoryID.bind(ProductController));
//allProductBySubCategoryID
adminRouter.get('/allProductBySubCategoryID/:id', ProductController.allProductBySubCategoryID.bind(ProductController));
//allProductBySubSubCategoryID
adminRouter.get('/allProductBySubSubCategoryID/:id', ProductController.allProductBySubSubCategoryID.bind(ProductController));

//advanceSearchProduct
adminRouter.post('/advanceSearchProduct', ProductController.advanceSearchProduct.bind(ProductController));


//gift product
adminRouter.get('/giftProduct/:id', ProductController.giftProducts.bind(ProductController));

//hottest
adminRouter.get('/hottest', ProductController.hottest.bind(ProductController));

//Bestselling
adminRouter.get('/Bestselling', ProductController.Bestselling.bind(ProductController));
//allProduct
adminRouter.get('/allProduct', ProductController.allProduct.bind(ProductController));

//relatedProducts
adminRouter.get('/relatedProducts/:id', ProductController.relatedProducts.bind(ProductController));
//allProductBySearch
adminRouter.post('/allProductBySearch', ProductController.allProductBySearch.bind(ProductController));

//slider
adminRouter.post('/slider', SliderController.store.bind(SliderController));
adminRouter.get('/slider', SliderController.index.bind(SliderController));
adminRouter.get('/slider/:id', SliderController.single.bind(SliderController));
adminRouter.put('/slider/:id', SliderController.update.bind(SliderController));
adminRouter.delete('/slider/:id', SliderController.destroy.bind(SliderController));

router.use('', adminRouter);
module.exports = router;
