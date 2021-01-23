const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');
const randomstring  = require('randomstring');
module.exports = new class BasketController extends Controller {
    index(req, res) {
        this.model.Basket.find({sellerID:req.body.sellerID,success:'موفق'}).populate('product user').exec((err, cartcustom) => {
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

    findRefId(req, res) {
        let query = {};
    
        if (req.body.refID) {
            query.resNumber = req.body.resNumber;
        }
        // query.statusPayment="موفق";
        console.log(query)
        this.model.Payment.find({resNumber: req.body.resNumber}).exec((err, cartcustom) => {
            if (err) throw err;
            if (cartcustom.length>0) {
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
