const Controller = require(`${config.path.controller}/Controller`);
const request = require('request-promise');

module.exports = new class PaymentController extends Controller {
    payment(req, res) {

        let params = {
            MerchantID: 'c3d32f57-fd02-417d-9bfd-adf62d6a5302',
            Amount: req.body.price,
            CallbackURL: 'http://194.5.175.25:3005/api/v1/user/payment/checker?price=' + req.body.price + '&',
            Description: 'پرداخت هزینه خرید کالا',
        };
        let options = {
            method: 'POST',
            uri: 'https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json',
            headers: {
                'cache-control': 'no-cache',
                'content-type': 'application/json'
            },
            body: params,
            json: true,
        };
        request(options)
            .then(data => {

                if (data.Status === 100) {
                    console.log('rasssssssssssss');
                    this.model.Payment({
                        userID: req.body.user.userID,
                        resNumber: data.Authority,
                        price: req.body.price,
                        statePayment: false,
                        date: req.body.user.date,
                        time: req.body.user.time,
                        mobile: req.body.user.mobile
                    }).save(err => {
                        if (err) {
                            throw err;
                        }
                        else {
                            let countProduct = req.body.product;

                            for (var i = 0; i < countProduct.length; i++) {

                                let x = countProduct[i]['product']
								
								console.log(countProduct[i]['product']);
                                this.model.Basket({
									 sellerID:  x['cartList'].sellerID,
                                    userID: req.body.user.userID,
                                    categoryID: x['cartList'].categoryID,
                                    productID: x['cartList']._id,
                                    refID: data.Authority,
                                    count: x['number'],
                                    price: x['cartList'].price,
                                    offerPercent: x['cartList'].offerPercent,
                                    priceAll: x['cartList'].priceAll,
                                    pricePost: x['cartList'].pricePost,
                                    date: req.body.user.date,
                                    time: req.body.user.time,

                                }).save(err => {
                                    if (err) {
                                        throw err;
                                    }
                                });
                            }



                        }

                    });

                    return res.json({
                        data: `https://www.zarinpal.com/pg/StartPay/${data.Authority}`,
                        sucess: true
                    })
                    // return res.redirect(`https://www.zarinpal.com/pg/StartPay/${data.Authority}`)
                }
            })
            .catch(err => res.json(err.message));
    }

    checker(req, res, next) {
        console.log(req.query.price);
        try {
            this.model.Payment.find({ resNumber: req.query.Authority }).exec((err, result) => {
                let params = {
                    MerchantID: 'c3d32f57-fd02-417d-9bfd-adf62d6a5302',
                    Amount: req.query.price,
                    Authority: req.query.Authority,
                };
                let options = {
                    method: 'POST',
                    uri: 'https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json',
                    headers: {
                        'cache-control': 'no-cache',
                        'content-type': 'application/json'
                    },
                    body: params,
                    json: true,
                };
                request(options)
                    .then(data => {
                        console.log(data);
                        if (data.Status === 100) {
                            //console.log('تراکنش با موفقیت انجام شد');
                            this.model.Payment.find({ resNumber: req.query.Authority }).exec((err, resultPayment) => {
                                if (resultPayment.length > 0) {
                                    this.model.Payment.updateOne(
                                        { resNumber: req.query.Authority },
                                        { $set: { statusPayment: 'موفق', refID: data.RefID } }).exec((err, result) => {
                                        });

                                    this.model.Basket.find({refID: req.query.Authority}).exec((err, resultBasket) => {
                                        if (resultBasket.length > 0) {
                                            this.model.Basket.update(
                                                { refID: req.query.Authority},
                                                { $set: { sucess: 'موفق'}}).exec((err, result) => {
                                                });
                                            for (let i = 0; i < resultBasket.length; i++) {
                                                this.model.Inventory.findOneAndUpdate({ productID: resultBasket[i]['_doc'].productID },{count:resultBasket[i]['_doc'].count}).exec((err, result) => {
                                                    if (result) {                                                    
                                                       return res.redirect('http://www.begheymat.com//#/home/call-back/true');
                                                    }
                                                })
                                            }
                                        }
                                    });
                                }
                            });


                        } else {
                            this.model.Basket.deleteMany({ refID: req.query.Authority }).exec((err, result) => {
                                if (result) {
                                    return res.redirect('http://www.begheymat.com//#/home/call-back/false');
                                }
                            })


                        }

                    }).catch(err => {
                        next(err)
                    })

            })

        } catch (err) {
            next(err)
        }
        //this.sendsmsPaymentTracking(data.RefID,mobile);

    }
    sendsmsPaymentTracking = (TransationNum, mobile) => {
        var qs = require("querystring");
        var http = require("http");
        var options = {
            "method": "POST",
            "hostname": "rest.payamak-panel.com",
            "port": null,
            "path": "/api/SendSMS/SendSMS",
            "headers": {
                "cache-control": "no-cache",
                "postman-token": "7ce78606-0d0b-107d-286c-bbd4b4142760",
                "content-type": "application/x-www-form-urlencoded"
            }
        };

        var req = http.request(options, function (res) {
            var chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                var body = Buffer.concat(chunks);
                // console.log(body.toString());
            });
        });
        req.write(qs.stringify({
            username: '09211480573',
            password: 'cgbd4h',
            to: mobile,
            from: '5000400010602',
            text: ` کد پیگیری پرداخت شما در آزمون مدارس آموزش پرورش ناحیه یک : ${TransationNum} می باشد `,
            isflash: 'false'
        }));
        req.end();
        return TransationNum;
    }

    displayPayment(req, res) {
        console.log(req.body)
        this.model.Payment.find({ userID: req.body.userID, statusPayment: "موفق" }, (err, result) => {
            if (result.length) {
                return res.json({
                    data: result,
                    success: true
                })
            }
            res.json({
                data: 'کاربر یافت نشد',
                success: false
            })
        })
    }

    /*  checkStatePayment(req,res) {
         this.model.Payment.findOne({mobile: req.body.mobile, nationalCode: req.body.nationalCode}, (err, Payment) => {
             if (err) throw err;
             if (Payment) {
                 return res.json({
                     data: 'یافت شد',
                     status:Payment._doc.statusPayment,
                     success: true
                 });
             }
         })
     }*/

    checkStatePayment(req, res) {
        this.model.Payment.findOne({ nationalCode: req.body.nationalCode, statusPayment: 'موفق' }, (err, Payment) => {
            if (err) throw err;
            if (Payment) {
                return res.json({
                    data: Payment,
                    success: true
                });
            }
            else {
                return res.json({
                    data: Payment,
                    success: false
                });
            }
        })
    }

    trackingPayment(req, res) {
        this.model.Payment.findOne({ resNumber: req.body.resNumber }, (err, Payment) => {
            if (err) throw err;
            if (Payment) {
                return res.json({
                    data: Payment,
                    success: true
                });
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }



}
