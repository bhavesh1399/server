const express = require("express");
const { verifyToken } = require("../middlewares/verifyToken");
const { IsAdmin } = require("../middlewares/accessByRole");
const Controller = require("../controller/subscription");
const router = express.Router();

router.post(
  "/create-subscription",
  verifyToken,
  IsAdmin,
  Controller.createSubscription
);
router.patch(
  "/update-subscription/:id",
  verifyToken,
  IsAdmin,
  Controller.updateSubscription
);
router.delete(
  "/delete-subscription/:id",
  verifyToken,
  IsAdmin,
  Controller.deleteSubscription
);
router.get("/get-subscription-details/:id", Controller.getPostDetails);

router.get("/get-subscription-list", Controller.getPostList);

module.exports = router;
