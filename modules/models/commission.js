const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommissionSchema = new Schema({
    categoryID: {  type:mongoose.Schema.ObjectId, ref:'Category',ref:'SubCategory',ref:'SubSubCategory'},
    percent:{type:Number,required:true},
},{toJSON:{virtuals:true}});
CommissionSchema.virtual('Category',{
    ref:'Category',
    localField:'categoryID',
    foreignField:'_id',
});
CommissionSchema.virtual('SubCategory',{
    ref:'SubCategory',
    localField:'categoryID',
    foreignField:'_id',
});
CommissionSchema.virtual('SubSubCategory',{
    ref:'SubSubCategory',
    localField:'categoryID',
    foreignField:'_id',
});
module.exports = mongoose.model('Commission', CommissionSchema);