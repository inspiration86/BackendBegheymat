const express = require('express');
const router = express.Router();

const { uploadImage } = require('./middleware/UploadMiddleware');
const { uploadFiles } = require('./middleware/UploadMiddleware');

const { api: ControllerApi } = config.path.controllers;
const AuthSellerController = require(`${ControllerApi}/v1/seller/AuthSellerController`);
const SellerUploadController = require(`${ControllerApi}/v1/seller/UploadController`);
const SellerProductController = require(`${ControllerApi}/v1/seller/ProductController`);
const ProductAdviceController = require(`${ControllerApi}/v1/seller/ProductAdviceController`);
const BasketController = require(`${ControllerApi}/v1/seller/BasketController`);
const ContractController = require(`${ControllerApi}/v1/seller/ContractController`);

//Contract Sellerbe
router.post('/generateContractSellerbe', ContractController.generateContractSellerbe.bind(ContractController));
router.post('/registerContractSellerbe', ContractController.registerContractSellerbe.bind(ContractController));
router.get('/singleContractSellerbe/:id', ContractController.singleContractSellerbe.bind(ContractController));

//ProductAdvice
router.put('/answerProductAdvice/:id', ProductAdviceController.answerProductAdvice.bind(ProductAdviceController));
router.get('/allProductAdvice/:id', ProductAdviceController.allProductAdvice.bind(ProductAdviceController));
router.get('/countProductAdvice/:id', ProductAdviceController.countProductAdvice.bind(ProductAdviceController));


//auth
router.post('/loginSeller', AuthSellerController.login.bind(AuthSellerController));
router.post('/registerSeller', AuthSellerController.register.bind(AuthSellerController));
router.get('/allseller', AuthSellerController.allseller.bind(AuthSellerController));
router.get('/showSeller/:id', AuthSellerController.showSeller.bind(AuthSellerController));
router.put('/updateSeller/:id', AuthSellerController.updateSeller.bind(AuthSellerController));
router.put('/resetPassword', AuthSellerController.resetPassword.bind(AuthSellerController));
router.put('/changePassword/:id', AuthSellerController.changePassword.bind(AuthSellerController));
router.post('/seller', AuthSellerController.singleSeller.bind(AuthSellerController));

//upload image
router.post('/image', uploadImage.single('image'), SellerUploadController.uploadImage.bind(SellerUploadController));
router.post('/multipleimage',uploadFiles,SellerUploadController.uploadFiles.bind(SellerUploadController));
// router.post('/pdf', uploadPdf.single('file'), SellerUploadController.uploadpdf.bind(SellerUploadController));

//category
router.get('/category', SellerProductController.showCategory.bind(SellerProductController));

//product
router.post('/registerProduct', SellerProductController.registerProduct.bind(SellerProductController));
router.get('/Products/:id', SellerProductController.Products.bind(SellerProductController));
router.put('/updateProduct/:id', SellerProductController.updateProduct.bind(SellerProductController));
router.delete('/deleteProduct/:id', SellerProductController.deleteProduct.bind(SellerProductController));
router.get('/singleProduct/:id', SellerProductController.singleProduct.bind(SellerProductController));

//feature
router.post('/feature', SellerProductController.storeFeature.bind(SellerProductController));
router.post('/featureValue', SellerProductController.storeFeatureValue.bind(SellerProductController));
router.post('/productFeature', SellerProductController.storeProductFeature.bind(SellerProductController));
router.get('/indexFeature', SellerProductController.indexFeature.bind(SellerProductController));
router.post('/indexFeatureValue', SellerProductController.indexFeatureValue.bind(SellerProductController));
router.delete('/deleteProductFeature/:id', SellerProductController.deleteProductFeature.bind(SellerProductController));
router.post('/storeProductFeatureSingle', SellerProductController.storeProductFeatureSingle.bind(SellerProductController));


//basket
router.post('/basketList', BasketController.index.bind(BasketController));
router.post('/findRefID', BasketController.findRefId.bind(BasketController));

router.use('', router);
module.exports = router;
