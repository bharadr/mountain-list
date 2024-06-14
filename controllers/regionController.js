const Mountain = require("../models/mountain");
const Region = require("../models/region");
const he = require('he');

const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");


// Function to decode HTML entities
function decodeHTMLEntities(text) {
    return he.decode(text);
}

// Display list of all regions.
exports.region_list = asyncHandler(async (req, res, next) => {
    const allRegions = await Region.find({}, "name mountains")
      .sort({ name: 1 })
      .exec();
    res.render("region_list", { title: "Region List", region_list: allRegions });
});

exports.region_detail = asyncHandler(async (req, res, next) => {
    const region = await Region.findById(req.params.id).populate("mountains").exec();

    if (region === null) {
        // No results.
        const err = new Error("Region not found");
        err.status = 404;
        return next(err);
    }
    
    res.render("region_detail", {
        title: region.name,
        id: req.params.id,
        description: region.description,
        mountains: region.mountains,
    });
});

exports.region_create_get = asyncHandler(async (req, res, next) => {
    res.render("region_form", {
        title: "Create Region",
        region: undefined,
        errors: [],
    });
});

exports.region_create_post = [
    // Validate and sanitize fields.
    body("name", "Name must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("description", "Description must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    // Now process the form data
    asyncHandler(async (req, res, next) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
      // Create a Region object with escaped and trimmed data.
      const newName = decodeHTMLEntities(req.body.name);
      const newDescription = decodeHTMLEntities(req.body.description);
      const region = new Region({
        name: newName,
        description: newDescription,
      });
  
      if (!errors.isEmpty()) {
        res.render("region_form", {
            title: "Create Region",
            region: undefined,
            errors: errors.array(),
        });
      } else {
        // Data from form is valid. Save region.
        await region.save();
        res.redirect(region.url);
      }
    }),
];

exports.region_update_get = asyncHandler(async (req, res, next) => {
    const region = await Region.findById(req.params.id).exec();    
    if (region === null) {
        const err = new Error("Region not found");
        err.status = 404;
        return next(err);
    }

    res.render("region_form", {
        title: "Update Region",
        region: region,
        errors: [],
    });
});

exports.region_update_post = [
    // Validate and sanitize fields.
    body("name", "Name must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("description", "Description must not be empty.")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Create a Region object with escaped and trimmed data.
        const newName = decodeHTMLEntities(req.body.name);
        const newDescription = decodeHTMLEntities(req.body.description);  
        const region = new Region({
            name: newName,
            description: newDescription,
            _id: req.params.id,
        });
        if (!errors.isEmpty()) {
            res.render("region_form", {
                title: "Update Region",
                region: region,
                errors: errors.array(),
            });
            return;
        } else {
            // Data from form is valid. Save region.
            const updatedRegion = await Region.findByIdAndUpdate(req.params.id, region, {});
            res.redirect(updatedRegion.url);
        }
    }),
];

exports.region_delete_get = asyncHandler(async (req, res, next) => {
    const region = await Region.findById(req.params.id).populate("mountains").exec();
    if (region === null) {
        res.redirect("/regions");
    }
    res.render("region_delete", {
        title: "Delete Region",
        region: region,
        mountains: region.mountains,
    });
});

exports.region_delete_post = asyncHandler(async (req, res, next) => {
    // Remove the mountainId from the old region
    const region = await Region.findById(req.params.id).populate("mountains").exec();
    if (region === null) {
        res.redirect("/regions");
    }
    await Mountain.deleteMany({ region: req.body.regionid });
    await Region.findByIdAndDelete(req.body.regionid);
    res.redirect("/regions");
});

