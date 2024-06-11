const Mountain = require("../models/mountain");
const Region = require("../models/region");

const asyncHandler = require("express-async-handler");

// Display list of all books.
exports.region_list = asyncHandler(async (req, res, next) => {
    const allMountains = await Mountain.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Mountain List", region_list: allMountains });
});

exports.region_create_get = asyncHandler(async (req, res, next) => {
    const allMountains = await Mountain.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Mountain List", region_list: allMountains });
});

exports.region_create_post = asyncHandler(async (req, res, next) => {
    const allMountains = await Mountain.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Mountain List", region_list: allMountains });
});

exports.region_delete_get = asyncHandler(async (req, res, next) => {
    const allMountains = await Mountain.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Mountain List", region_list: allMountains });
});

exports.region_delete_post = asyncHandler(async (req, res, next) => {
    const allMountains = await Mountain.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Mountain List", region_list: allMountains });
});


exports.region_update_get = asyncHandler(async (req, res, next) => {
    const allMountains = await Mountain.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Mountain List", region_list: allMountains });
});

exports.region_update_post = asyncHandler(async (req, res, next) => {
    const allMountains = await Mountain.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Mountain List", region_list: allMountains });
});

exports.region_detail = asyncHandler(async (req, res, next) => {
    const allMountains = await Mountain.find({}, "name mountainCount url")
      .sort({ name: 1 })
      .exec();
  
    res.render("region_list", { title: "Mountain List", region_list: allMountains });
});



