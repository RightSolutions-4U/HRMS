const express = require("express");
const router = express.Router();
const OrgCont = require("../controllers/Organization");

// Home page route.
router.get("/", OrgCont.OrganizationList);

// About page route.
router.get("/OrgDet/:OrgId",OrgCont.OrganizationDetail);


module.exports = router;