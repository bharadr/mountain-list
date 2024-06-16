const Mountain = require("../models/mountain");
const Region = require("../models/region");
const { body, validationResult } = require("express-validator");
const he = require('he');

const asyncHandler = require("express-async-handler");
// Function to decode HTML entities
function decodeHTMLEntities(text) {
    return he.decode(text);
}

exports.mountain_list = asyncHandler(async (req, res, next) => {
    const allMountains = await Mountain.find({}, "name height location region").populate("region")
      .sort({ name: 1 })
      .exec();
  
    res.render("mountain_list", { title: "Mountain List", mountains: allMountains });
});

exports.mountain_detail = asyncHandler(async (req, res, next) => {
    const mountain = await Mountain.findById(req.params.id).populate("region").exec();
    if (mountain === null) {
        const err = new Error("Mountain not found");
        err.status = 404;
        return next(err);
    }
    
    res.render("mountain_detail", {
        title: mountain.name,
        mountain: mountain,
        id: req.params.id,
    });
});

exports.mountain_create_get = asyncHandler(async (req, res, next) => {
    const allRegions = await Region.find({}, "name description")
        .sort({ name: 1 })
        .exec();

    res.render("mountain_form", {
        title: "Create Mountain",
        mountain: undefined,
        regions: allRegions,
        errors: [],
    });
});

exports.mountain_create_post = [
    body('name')
      .isString().withMessage('Name must be a string')
      .isLength({ max: 100 }).withMessage('Name must be at most 100 characters long')
      .notEmpty().withMessage('Name is required'),
    body('height')
      .isNumeric().withMessage('Height must be a number')
      .isFloat({ min: 1 }).withMessage('Height must be at least 1'),
    body('lat')
        .isNumeric().withMessage('Latitude must be a number')
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be at between -90 and 90'),
    body('lon')
        .isNumeric().withMessage('Longitude must be a number')
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be at between -180 and 180'),
    body('region')
      .isMongoId().withMessage('Region must be a valid ObjectId'),
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const allRegions = await Region.find({}, "name description").sort({ name: 1 }).exec();
        if (!errors.isEmpty()) {
            res.render("mountain_form", {
                title: "Create Mountain",
                mountain: undefined,
                regions: allRegions,
                errors: errors.array(),
            });
            return;
        }
        // Data from form is valid. Save region.
        const newName = decodeHTMLEntities(req.body.name);
        const mountain = new Mountain({
            name: newName,
            height: req.body.height,
            location: [req.body.lat, req.body.lon],
            region: req.body.region,
        });
        try {
            await mountain.save();
                // Find the corresponding region and update its mountains field
                await Region.findByIdAndUpdate(req.body.region, { $push: { mountains: mountain._id } });
                res.redirect(mountain.url);
            } catch(error) {
            let serverError = {msg: error.errorResponse.errmsg}
            res.render("mountain_form", {
                title: "Create Mountain",
                mountain: undefined,
                regions: allRegions,
                errors: [serverError],
            });
        }
      }
    ),
];

exports.mountain_update_get = asyncHandler(async (req, res, next) => {
    const mountain = await Mountain.findById(req.params.id).exec();    
    const allRegions = await Region.find({}, "name description")
        .sort({ name: 1 })
        .exec();

    if (mountain === null) {
        const err = new Error("Mountain not found");
        err.status = 404;
        return next(err);
    }

    res.render("mountain_form", {
        title: "Update Mountain",
        mountain: mountain,
        regions: allRegions,
        errors: [],
    });
});

exports.mountain_update_post = [
    body('name')
      .isString().withMessage('Name must be a string')
      .isLength({ max: 100 }).withMessage('Name must be at most 100 characters long')
      .notEmpty().withMessage('Name is required'),
    body('height')
      .isNumeric().withMessage('Height must be a number')
      .isFloat({ min: 1 }).withMessage('Height must be at least 1'),
    body('lat')
        .isNumeric().withMessage('Latitude must be a number')
        .isFloat({ min: -90, max: 90 }).withMessage('Latitude must be at between -90 and 90'),
    body('lon')
        .isNumeric().withMessage('Longitude must be a number')
        .isFloat({ min: -180, max: 180 }).withMessage('Longitude must be at between -180 and 180'),
    body('region')
      .isMongoId().withMessage('Region must be a valid ObjectId'),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const allRegions = await Region.find({}, "name description").sort({ name: 1 }).exec();
        const originalMountain = await Mountain.findById(req.params.id).exec();
        const newName = decodeHTMLEntities(req.body.name);
        const newMountain = new Mountain({
            _id: req.params.id,
            name: newName,
            height: req.body.height,
            location: [req.body.lat, req.body.lon],
            region: req.body.region,
        });
        if (!errors.isEmpty()) {
            res.render("mountain_form", {
                title: "Update Mountain",
                mountain: newMountain,
                regions: allRegions,
                errors: errors.array(),
            });
            return;
        }
        // Remove the mountainId from the old region
        await Region.findByIdAndUpdate(originalMountain.region, { $pull: { mountains: newMountain._id } });
        // Add the MountainID to the new region
        await Region.findByIdAndUpdate(req.body.region, { $push: { mountains: newMountain._id } });

        const updatedMountain = await Mountain.findByIdAndUpdate(req.params.id, newMountain, {});
        res.redirect(updatedMountain.url);
      }
    ),
];

exports.mountain_delete_get = asyncHandler(async (req, res, next) => {
    const mountain = await Mountain.findById(req.params.id).exec();   
    if (mountain === null) {
        res.redirect("/mountains");
    }
    res.render("mountain_delete", {
        title: "Delete Mountain",
        mountain: mountain,
    });
});

exports.mountain_delete_post = asyncHandler(async (req, res, next) => {
    // Remove the mountainId from the old region
    const originalMountain = await Mountain.findById(req.params.id).exec();
    await Region.findByIdAndUpdate(originalMountain.region, { $pull: { mountains: req.body.mountainid } });
    await Mountain.findByIdAndDelete(req.body.mountainid);
    res.redirect("/mountains");
});

