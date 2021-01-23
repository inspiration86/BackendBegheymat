const Controller = require(`${config.path.controller}/Controller`);
const EmployeeTransform = require(`${config.path.transform}/v1/EmployeeTransform`);
const bcrypt = require('bcrypt');
module.exports = new class AuthController extends Controller {
    showCategory(req, res) {
        this.model.Category.find({}, (err, Category) => {
            if (err) return res.json({
                data: 'اطلاعات وارد شده صحیح نیست',
                success: false
            });
            if (Category === null)
                return res.json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });
            else {
                return res.json({
                    data: Category,
                    success: true
                });
            }
        })
    }
    showSubCategory(req, res) {
        this.model.SubCategory.findOne({categoryID:req.body.categoryID}, (err, Category) => {
            if (err) return res.json({
                data: 'اطلاعات وارد شده صحیح نیست',
                success: false
            });
            if (Category === null)
                return res.json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });
            else {
                return res.json({
                    data: Category,
                    success: true
                });
            }
        })
    }
    showSubCategoryDetail(req, res) {
        this.model.SubCategoryDetail.findOne({subcategoryID:req.body.subcategoryID}, (err, Category) => {
            if (err) return res.json({
                data: 'اطلاعات وارد شده صحیح نیست',
                success: false
            });
            if (Category === null)
                return res.json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });
            else {
                return res.json({
                    data: Category,
                    success: true
                });
            }
        })
    }

}
