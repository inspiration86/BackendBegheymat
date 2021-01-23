const Controller = require(`${config.path.controller}/Controller`);
var fs = require('fs');
var path = require('path');
var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
const randomstring  = require('randomstring');

module.exports = new class ContractController extends Controller {

generateContractSellerbe(req,res){
let contractCode=randomstring.generate({charset: 'begheymat', length: 2})+'/'+(req.body.startDate)+'/'+randomstring.generate({charset: '12345678', length: 3});
// The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
this.replaceErrors();
//this.errorHandler();
//Load the docx file as a binary
var content = fs
    .readFileSync(path.resolve("./public/uploads/contracts/", 'contractSellerbe1399.docx'), 'binary');

var zip = new PizZip(content);
var doc;
try {
    doc = new Docxtemplater(zip);
} catch(error) {
    // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
     console.log(JSON.stringify({error: error}, replaceErrors));

           if (error.properties && error.properties.errors instanceof Array) {
               const errorMessages = error.properties.errors.map(function (error) {
                   return error.properties.explanation;
               }).join("\n");
               console.log('errorMessages', errorMessages);
               // errorMessages is a humanly readable message looking like this :
               // 'The tag beginning with "foobar" is unopened'
           }
           throw error;
           }

//set the templateVariables
doc.setData({
    startDate:req.body.startDate,
    endDate:req.body.endDate,
    firstName:req.body.firstName,
    lastName: req.body.lastName,
    nationalCode:req.body.nationalCode,
    mobile:req.body.mobile,
    email:req.body.email,
    startYear:req.body.startYear,
    endYear:req.body.endYear,
    address:req.body.address,
    postalCode:req.body.postalCode,
    contractCode:contractCode
    });

try {
    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render()
}
catch (error) {
    // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
      console.log(JSON.stringify({error: error}, replaceErrors));

            if (error.properties && error.properties.errors instanceof Array) {
                const errorMessages = error.properties.errors.map(function (error) {
                    return error.properties.explanation;
                }).join("\n");
                console.log('errorMessages', errorMessages);
                // errorMessages is a humanly readable message looking like this :
                // 'The tag beginning with "foobar" is unopened'
            }
            throw error;
            }


var buf = doc.getZip()
             .generate({type: 'nodebuffer'});

// buf is a nodejs buffer, you can either write it to a file or do anything else with it.
fs.writeFileSync(path.resolve('./public/uploads/contractSeller/',req.body.nationalCode+'.docx'), buf);
    return res.json({
        ContractText:'http://194.5.175.25:3005/public/uploads/contractSeller/'+req.body.nationalCode+'.docx',
        contractCode:contractCode,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        success: true
    });
}

registerContractSellerbe(req,res){
this.model.ContractSellerbe({
    sellerID: req.body.sellerID,
    ContractText:req.body.ContractText,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    ContractCode:req.body.contractCode,
    active:true
}).save(err => {
    if (err) {
        throw err;
    }
    return res.json({
        data:'قرارداد با موفقیت ثبت شد',
        success: true
    });
});

}

singleContractSellerbe(req, res) {
    req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
    if (this.showValidationErrors(req, res))
        return;
    this.model.ContractSellerbe.find({sellerID:req.params.id }).populate({path: 'Seller'})
    .exec((err, ContractSellerbe) => {
        if (err) res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
        if (ContractSellerbe) {
            return res.json({
                data: ContractSellerbe,
                success: true
            });
        }
        res.json({
            data: 'اطلاعاتی وجود ندارد',
            success: false
        })
    });
}

    replaceErrors = (key, value) => {
    if (value instanceof Error) {
            return Object.getOwnPropertyNames(value).reduce(function(error, key) {
                error[key] = value[key];
                return error;
            }, {});
        }
        return value;
    }

    
    }

