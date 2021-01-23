const express = require('express');
const router = express.Router();
const adminRouter = express.Router();

// middlewares
const apiAuthAdminUser = require('./middleware/apiAuthAdmin');
const apiAuth = require('./middleware/apiAuth');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');

//user Controllers
const { api: ControllerApi } = config.path.controllers;
const UploadController = require(`${ControllerApi}/v1/user/UploadController`);
const AuthUserController = require(`${ControllerApi}/v1/user/AuthUserController`);
const BasketController=require(`${ControllerApi}/v1/user/BasketController`);
const PaymentController = require(`${ControllerApi}/v1/user/PaymentController`);
const WishListController = require(`${ControllerApi}/v1/user/WishListController`);
const CommentController = require(`${ControllerApi}/v1/user/CommentController`);
const ProductAdviceController = require(`${ControllerApi}/v1/user/ProductAdviceController`);

// auth user
router.post('/register', AuthUserController.register.bind(AuthUserController));
router.post('/login', AuthUserController.login.bind(AuthUserController));
router.put('/updateUser/:id', AuthUserController.UpdateUser.bind(AuthUserController));
router.post('/user', AuthUserController.singleUser.bind(AuthUserController));

router.put('/resetPassword', AuthUserController.resetPassword.bind(AuthUserController));
router.put('/changePassword/:id', AuthUserController.changePassword.bind(AuthUserController));

//wishlist
router.post('/allWishlistByUserID', WishListController.allWishlistByUserID.bind(WishListController));
router.post('/addWishList', WishListController.addWishList.bind(WishListController));
router.delete('/deleteWishList/:id', WishListController.deleteWishList.bind(WishListController));
router.post('/allWishlist', WishListController.allWishlist.bind(WishListController));
router.get('/countWishlist/:id', WishListController.countWishlist.bind(WishListController));

//ProductAdvice
router.get('/allProductAdvice/:id', ProductAdviceController.allProductAdvice.bind(ProductAdviceController));
router.post('/addProductAdvice', ProductAdviceController.addProductAdvice.bind(ProductAdviceController));
router.get('/countProductAdvice/:id', ProductAdviceController.countProductAdvice.bind(ProductAdviceController));


//comment
router.post('/addComment', CommentController.addComment.bind(CommentController));
router.get('/countComment/:id', CommentController.countComment.bind(CommentController));
router.get('/allCommentForProduct/:id', CommentController.allCommentForProduct.bind(CommentController));


//upload image

router.post('/image', uploadImage.single('image'), UploadController.uploadImage.bind(UploadController));

//NewsLetter
router.post('/EmailNewsletter', AuthUserController.EmailNewsletter.bind(AuthUserController));
router.post('/SmsNewsletter', AuthUserController.SmsNewsletter.bind(AuthUserController));

//basket
router.post('/basket', BasketController.register.bind(BasketController));
router.post('/basketList', BasketController.index.bind(BasketController));

router.post('/payment',PaymentController.payment.bind(PaymentController));
router.get('/payment/checker', PaymentController.checker.bind(PaymentController));
router.post('/checkStatePayment', PaymentController.checkStatePayment.bind(PaymentController));
router.post('/getPayment', PaymentController.displayPayment.bind(PaymentController));




router.use('', router);
module.exports = router;
