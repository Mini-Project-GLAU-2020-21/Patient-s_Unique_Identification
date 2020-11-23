const Patient = require("../models/patient");
const Documents = require("../models/document");
const formidable = require("formidable");
const fs = require("fs");            //fs stands for file system. we don't need to install it..it comes inbuilt with nodejs
const { check, validationResult } = require('express-validator');
const Category = require("../models/category");
const { response } = require("express");





exports.getPatientById = (req, res, next, id) => {
    Patient.findById(id).exec((err, patient) => {
        if(err || !patient){
            return res.status(400).json({
                error: "No patient found in DB"
            });
        }
        req.profile = patient;
        next();
    });
};


//to return patient's own details
exports.getPatientByOwn = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.documents = undefined;
    return res.json(req.profile);
};





exports.getPatientForGuestt = async (req, res, next, upi) => {
    //console.log("req")
    let patient = await Patient.findOne(req.body, {
        _id:0,
        role:0,
        createdAt:0,
        updatedAt:0,
        encry_password:0,
        email: 0,
        salt:0
    })
    
    console.log(patient)
    res.json(patient)
    
};


//to return any patient's details for guest login
exports.getPatientForGuest = (req, res) => {
    //const error = validationResult(req);
    console.log("before dstrctr: ",req.body);
    const  upi  = req.body.upi;
    console.log("ghjhg",upi);
    //console.log("aftr dstrctr: ",upi)
    /*if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()[0].msg
        });
    };*/

    Patient.findOne({upi:upi}, (err, patient) =>{
        //console.log(patient)
        if(err || !patient){
            return res.status(400).json({
                error: "UPI does not exists"
            })
        }
        //send response on frontend
        //console.log(patient)
        //const p = JSON.stringify(patient)
        //console.log("jhgfdsdfghjhgvcfgh", p)
        const {f_name, l_name, r_contact_number, r_name, r_relation , address, blood_group, upi, documents} = patient;
        console.log( {f_name, l_name, r_contact_number, r_name, r_relation , address, blood_group, upi, documents})
        const p = JSON.stringify({ f_name: f_name, l_name: l_name, r_contact_number: r_contact_number, r_name: r_name, r_relation: r_relation , address: address,blood_group: blood_group, upi: upi, documents: documents});
        console.log("ppppppp: ", p);
        //console.log(f_name)
        //console.log({ "f_name": f_name, "l_name": l_name, "r_contact_number": r_contact_number, "r_name": r_name, "r_relation": r_relation , "address": address,"blood_group": blood_group,"upi": upi,"documents": documents})
        res.json( { "f_name": f_name, "l_name": l_name, "r_contact_number": r_contact_number, "r_name": r_name, "r_relation": r_relation , "address": address,"blood_group": blood_group,"upi": upi,"documents": documents})
        
    })
    /*let patient = await Patient.findOne(upi, {
        _id:0,
        role:0,
        createdAt:0,
        updatedAt:0,
        encry_password:0,
        email: 0,
        salt:0
    })
    console.log(patient)
    return res.send(patient) //res.json(patient)*/
}









/*exports. = (req, res) => {
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.p_contact_number = undefined;
    req.profile.email = undefined;
    return res.json(req.profile);
};*/


// to update patient
exports.updatePatient = (req, res) => {
    //console.log(req.body)
    Patient.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, patient) => {
            if(err){
                return res.status(400).json({
                    error: "You are not authorized to update this detail."
                });
            }
            patient.salt = undefined;
            patient.encry_password = undefined;
            patient.createdAt = undefined;
            patient.documents = undefined;
            //console.log(patient);
            res.json(patient);

            
        }
    );
};




// to upload a document in patient's schema
exports.uploadDocument = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, async (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "Problem with file."
            });
        }
        
        // destructure the field
        const { category, by_doctor_name } = fields;
        const categoryName = await Category.findById(category).exec()
        
        /*
        try catch, callback, event loop, promise, async await, synchrous and asynchrous
        
        exec((err, cate) => {         //cate is being used as shortform of category
            if(err){
                return res.status(400).json({
                    error: "Category not found!!!"
                });
            }
             return cate;
        });*/
        //console.log(categoryName)
        //console.log(categoryName);

        //console.log(category)
        if(!category || !by_doctor_name) {
            return res.status(400).json({
                error: "Please include all the fields."
            });
        }
        
        let docu  = new Documents(fields);

        // handle file here
        if(file.document_file){
            if(file.document_file.size > 2000000) {           // checking the size of the file should be less than 1000000 bytes (0.95 MB)
                return res.status(400).json({
                    error: "File is too big."
                })
            }
            docu.by_doctor_name = by_doctor_name
            docu.category = category
            docu.categoryName = categoryName.name
            //console.log(docu.category)
           
            Patient.findByIdAndUpdate(
                {_id: req.profile._id},
                {$push: {documents: docu}},
                {new: true, useFindAndModify: false},
                (err, patient) => {
                    if(err){
                        return res.status(400).json({
                            error: "You are not authorized to update this detail."
                        });
                    }
                    patient.salt = undefined;
                    patient.encry_password = undefined;
                    patient.createdAt = undefined;
                    patient.documents = undefined;
                    res.json(patient);
                }
            );
            
            docu.document_file.data = fs.readFileSync(file.document_file.path)
            docu.document_file.contentType = file.document_file.type
            //console.log(file.document_file);
        }

        
        //console.log(docu);
        // save file to DB
        docu.save((err, docu) => {
            //console.log(docu)
            if (err) {
                return res.status(400).json({
                    error: "Saving file in DB failed"
                });
            }
            return ; //res.json(docu);
        });

 /*const varr = Documents.findById(
    {_id: docu._id},
    //{$set: {categoryName: categoryName}}
    )*/

    });
};




// to view list of all the documents
exports.viewAllDocuments = (req, res) => {
    const documents = req.profile.documents;
    if (documents.length == 0) {
        return res.status(400).json({
            error: "No document found in your DB"
        });
    }
    else {
        //documents.forEach(function(err, doc) {
        res.json(documents);
     //});
    return ;
    }
    
    //return res.json(documents);
    /*documents
    //.select("-document_file")
    //.populate("category")
    //.sort([["asc"]])
    //.select("-documents_file")
    .exec((err, docs) => {
        if (err) {
            return res.status(400).json({
                error: "Error in viewing documents"
            });
        }
        //docs.document_file = undefined;
        res.json(docs)
    });*/
};