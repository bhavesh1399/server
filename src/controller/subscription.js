const SubscriptionSchema = require("../models/Subscription");
const { successResponse, errorResponse } = require("../helper/response");
const validator = require("../middlewares/validatator");
const messages = require("../constants/messages");
const moment = require("moment");
const createSubscription = async (req, res) => {
  try {
    validator(req, res);
    let { title, startDate, endDate } = req.body;

    const uniqueName = await SubscriptionSchema.find({
      title,
    });
    if (uniqueName.length > 0) {
      return errorResponse(res, 200, messages.subscription.ALREADY_EXIST);
    }
    startDate = moment(startDate).format("MM/DD/YYYY");
    endDate = moment(endDate).format("MM/DD/YYYY");
    let currentDate = moment(new Date()).format("MM/DD/YYYY");

    if (currentDate >= startDate && currentDate >= endDate) {
      return errorResponse(res, 200, messages.subscription.ENTER_VALID_DATE);
    }
    if (startDate >= endDate) {
      return errorResponse(res, 200, messages.subscription.ENTER_VALID_ENDDATE);
    }
    await SubscriptionSchema.create({
      title,
      startDate,
      endDate,
    });

    return successResponse(res, messages.subscription.CREATE_SUCCESS);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, messages.INTERNAL_SERVER_ERROR);
  }
};
const updateSubscription = async (req, res) => {
  try {
    console.log(req.params, "<<<<< request");
    const { id } = req.params;
    let { title, startDate, endDate } = req.body;
    const uniqueName = await SubscriptionSchema.find({
      title,
    });

    if (uniqueName.length > 0) {
      return errorResponse(res, 200, messages.subscription.ALREADY_EXIST);
    }

    if (startDate || endDate) {
      startDate = moment(startDate).format("MM/DD/YYYY");
      endDate = moment(endDate).format("MM/DD/YYYY");

      let currentDate = moment(new Date()).format("MM/DD/YYYY");

      if (currentDate >= startDate && currentDate >= endDate) {
        return errorResponse(res, 200, messages.subscription.ENTER_VALID_DATE);
      }
      if (startDate >= endDate) {
        return errorResponse(
          res,
          200,
          messages.subscription.ENTER_VALID_ENDDATE
        );
      }
    }
    subscription = await SubscriptionSchema.findOneAndUpdate(
      { _id: id },
      {
        title,
        startDate,
        endDate,
      },
      { new: true }
    );

    return successResponse(res, messages.subscription.SUBSCRIPTION_UPDATED);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, messages.INTERNAL_SERVER_ERROR);
  }
};

const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    await SubscriptionSchema.deleteOne({ _id: id });

    return successResponse(res, messages.subscription.SUBSCRIPTION_DELETED);
  } catch {
    return errorResponse(res, 500, messages.INTERNAL_SERVER_ERROR);
  }
};
const getPostList = async (req, res) => {
  try {
    let posts = await SubscriptionSchema.find().exec();

    if (!posts) {
      return errorResponse(
        res,
        200,
        messages.subscription.CAN_NOT_GET_SUBSCRIPTIONS_LIST
      );
    }
    const subscriptionList = {
      subscriptionList: posts,
    };
    return successResponse(
      res,
      messages.subscription.SUBSCRIPTIONS_LIST_SUCCESS,
      subscriptionList
    );
  } catch (err) {
    console.log(err);
    return errorResponse(res, 500, messages.INTERNAL_SERVER_ERROR);
  }
};

const getPostDetails = async (req, res) => {
  try {
    let { id } = req.params;
    let posts = await SubscriptionSchema.findById(id).exec();

    if (!posts) {
      return errorResponse(
        res,
        200,
        messages.subscription.CAN_NOT_GET_SUBSCRIPTIONS
      );
    }
    return successResponse(
      res,
      messages.subscription.SUBSCRIPTIONS_SUCCESS,
      posts
    );
  } catch (err) {
    console.log(err);
    return errorResponse(res, 500, messages.INTERNAL_SERVER_ERROR);
  }
};
module.exports = {
  createSubscription,
  updateSubscription,
  deleteSubscription,
  getPostList,
  getPostDetails,
};
