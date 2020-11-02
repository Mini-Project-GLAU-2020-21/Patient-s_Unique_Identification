const Category = require("../models/category");


exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if(err){
            return res.status(400).json({
                error: "Not able to create this category!!!"
            });
        }
        res.json({category});
    });
};



exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, cate) => {         //cate is being used as shortform of category
        if(err){
            return res.status(400).json({
                error: "Category not found!!!"
            });
        }
        req.category = cate;                      //cate is being used as shortform of category
        next();
    });
};