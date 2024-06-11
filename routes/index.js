var express = require('express');
var router = express.Router();

// Require controller modules.
const region_controller = require("../controllers/regionController");
const mountain_controller = require("../controllers/mountainController");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET request for list of all Region items.
router.get("/regions", region_controller.region_list);

// GET request for creating a Region. 
router.get("/region/create", region_controller.region_create_get);
// POST request for creating Region.
router.post("/region/create", region_controller.region_create_post);

// GET request to delete Region.
router.get("/region/:id/delete", region_controller.region_delete_get);
// POST request to delete Region.
router.post("/region/:id/delete", region_controller.region_delete_post);

// GET request to update Region.
router.get("/region/:id/update", region_controller.region_update_get);
// POST request to update Region.
router.post("/region/:id/update", region_controller.region_update_post);

// GET request for one Region.
router.get("/region/:id", region_controller.region_detail);


// GET request for list of all Mountain items.
router.get("/mountains", mountain_controller.mountain_list);

// GET request for creating a Mountain. 
router.get("/mountain/create", mountain_controller.mountain_create_get);
// POST request for creating Mountain.
router.post("/mountain/create", mountain_controller.mountain_create_post);

// GET request to delete Mountain.
router.get("/mountain/:id/delete", mountain_controller.mountain_delete_get);
// POST request to delete Mountain.
router.post("/mountain/:id/delete", mountain_controller.mountain_delete_post);

// GET request to update Mountain.
router.get("/mountain/:id/update", mountain_controller.mountain_update_get);
// POST request to update Mountain.
router.post("/mountain/:id/update", mountain_controller.mountain_update_post);

// GET request for one Mountain.
router.get("/mountain/:id", mountain_controller.mountain_detail);


module.exports = router;
