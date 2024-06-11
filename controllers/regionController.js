const Mountain = require("../models/mountain");
const Region = require("../models/region");

const { body, validationResult } = require("express-validator");

const asyncHandler = require("express-async-handler");

// Display list of all books.
exports.region_list = asyncHandler(async (req, res, next) => {
    const allRegions = await Region.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Region List", region_list: allRegions });
});

exports.region_create_get = asyncHandler(async (req, res, next) => {
    const allRegions = await Region.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Region List", region_list: allRegions });
});

exports.region_create_post = asyncHandler(async (req, res, next) => {
    const allRegions = await Region.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Region List", region_list: allRegions });
});

exports.region_delete_get = asyncHandler(async (req, res, next) => {
    const allRegions = await Region.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Region List", region_list: allRegions });
});

exports.region_delete_post = asyncHandler(async (req, res, next) => {
    const allRegions = await Region.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Region List", region_list: allRegions });
});


exports.region_update_get = asyncHandler(async (req, res, next) => {
    const allRegions = await Region.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Region List", region_list: allRegions });
});

exports.region_update_post = asyncHandler(async (req, res, next) => {
    const allRegions = await Region.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Region List", region_list: allRegions });
});

exports.region_detail = asyncHandler(async (req, res, next) => {
    const allRegions = await Region.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Region List", region_list: allRegions });
});



