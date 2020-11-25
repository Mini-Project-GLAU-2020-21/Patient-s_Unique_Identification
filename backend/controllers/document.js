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



exports.document_file = (req, res) => {           
    if(req.doc.document_file){
        res.set("Content-Type", req.doc.document_file.contentType)
        return res.send(req.doc.document_file.data);
    }
};