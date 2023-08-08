const { Schema, model } = require("mongoose");

const SubscriptionSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    startDate: {
      type: String,
      require: true,
    },
    endDate: {
      type: String,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = model("subscription", SubscriptionSchema);
