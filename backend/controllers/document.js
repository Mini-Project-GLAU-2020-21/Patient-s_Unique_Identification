const Documents = require("../models/document");


exports.getDocumentById = (req, res, next, id) => {
    
    Documents.findById(id)
    .populate("category")
    .exec((err, document) => {
        if(err || !document){
            return res.status(400).json({
                error: "Document not found"
            })
        }
        req.doc = document;
        next();
    });
};



exports.document_file = (req, res) => {           // method to export photo as it is set as undefined in above method
    if(req.doc.document_file){                      // checking whether the "product" object has some product or not
    //console.log(req.doc.document_file.data);
    //console.log(req.doc.category.name);
        res.set("Content-Type", req.doc.document_file.contentType)
        //console.log(req.doc.document_file.data);
        return res.send(req.doc.document_file.data);
    }
};