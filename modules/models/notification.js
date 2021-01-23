const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
    title: { type: String, required: true },
    description:{type:String,required:true},
    date:{type:String,required:true},


})
module.exports = mongoose.model('Notification', NotificationSchema);