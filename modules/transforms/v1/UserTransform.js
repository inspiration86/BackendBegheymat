const Transform = require('./../Transform');
const jwt = require('jsonwebtoken');

module.exports = class UserTransform extends Transform {
    transform(item , createToken = false) {
        this.createToken = createToken;
        return {
            'id':item.id,
            'mobile' : item.mobile,
            'password' : item.password,
            'type':item.type,
			 'city':item.city,
			 'state':item.state,
            'nationalCode':item.nationalCode,
             'phone':item.phone,
            'firstName':item.firstName,
            'lastName':item.lastName,
            'address':item.address,
            'postalCode':item.postalCode,
            'cardNumber':item.cardNumber,
            'accountNumber':item.accountNumber,
            'Plaque':item.Plaque,
            'image':item.image,
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
