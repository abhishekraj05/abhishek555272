const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listining.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingControler = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingControler.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControler.createListing)
  )
  .post((req, res) => {
    res.send(req.file);
  });

// new route
router.get("/new", isLoggedIn, listingControler.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingControler.showlisting))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingControler.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingControler.deleteListing));

// edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingControler.editListing)
);

module.exports = router;
