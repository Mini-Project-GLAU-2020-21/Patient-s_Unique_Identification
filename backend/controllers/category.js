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


exports.getCategory = (req, res) => {
    return res.json(req.category);
}


exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((err, updatedCategory) => {
        if(err){
            return res.status(400).json({
                error: "Failed to update category!!!"
            });
        }
        res.json(updatedCategory);
    });
};