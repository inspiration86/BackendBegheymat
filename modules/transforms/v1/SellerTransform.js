const Transform = require('./../Transform');
const jwt = require('jsonwebtoken');

module.exports = class SellerTransform extends Transform {
    transform(item , createToken = false) {
        this.createToken = createToken;
        return {
    '_id':item.id,
    'mobile' : item.mobile,
    'password' : item.password,
    'type':item.type,
    'phone': item.phone,
    'address': item.address,
    'firstName':item.firstName,
    'lastName':item.lastName,
    'state': item.state,
    'city':item.city,
    'postalCode': item.postalCode,
    'logo': item.logo,
    'birthDay':item.birthDay,
    'nationalCode':item.nationalCode,
    'idNumber':item.idNumber,
    'shopName':item.shopName,
    'category':item.category,
    'gender':item.gender,
    'companyName':item.companyName,
    'regNumCompany':item.regNumCompany,
    'economicCompany':item.economicCompany,
    'shabaNumber':item.shabaNumber,
    'typeCompany':item.typeCompany,
    'signCompany':item.signCompany,
    'imageSeller':item.imageSeller,
    'imageNationalcard':item.imageNationalcard,
    'imageCertificate':item.imageCertificate,
    'imageCompany':item.imageCompany,
    'resume':item.resume,
    'active':item.active,
            ...this.withToken(item)
        }
    }
    withToken(item) {
        if(item.token)
            return { token : item.token}

        if(this.createToken) {

            let token = jwt.sign({ user_id : item._id } , config.secret , {
                expiresIn :  '110h',
            });
            return { token }
        }
        return {};
    }

}
