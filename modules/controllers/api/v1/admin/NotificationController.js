const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class NotificationController extends Controller {
    index(req, res) {
        this.model.Notification.find({}).sort({ title: -1 }).exec((err, Notification) => {
            if (err) throw err;
            if (Notification) {
                return res.json({
                    data: Notification,
                    success: true
                });
            }
            res.json({
                data: 'اطلاعاتی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Notification.findById(req.params.id, (err, Notification) => {
            if (Notification) {
                return res.json({
                    data: Notification,
                    success: true
                })
            }
            res.json({
                data: 'یافت نشد',
                success: false
            })
        })
    }

    store(req, res) {
        req.checkBody('title', ' عنوان اطلاعیه نمیتواند خالی بماند').notEmpty();
        req.checkBody('description', ' توضیحات اطلاعیه نمیتواند خالی بماند').notEmpty();
        if (this.showValidationErrors(req, res))
            return;
        let newNotification = new this.model.Notification({
            title:req.body.title,
            description:req.body.description,
            date:req.body.date
        })
        newNotification.save(err => {
            if (err)  return res.json({
                data: 'خطا',
                success: false
            });
            return res.json({
                data: 'اطلاعیه با موفقیت ثبت شد',
                success: true
            });
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Notification.findByIdAndUpdate(req.params.id, {
            title:req.body.title,
            description:req.body.description,
            date:req.body.date
        }, (err, Notification) => {
            if (err) throw err;
            if (Notification) {
                return res.json({
                    data: ' اطلاعیه با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Notification.findByIdAndRemove(req.params.id, (err, Notification) => {
            if (err) throw err;
            if (Notification) {
                return res.json({
                    data: 'اطلاعیه با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین اطلاعاتی وجود ندارد',
                success: false
            });
        });
    }
}
