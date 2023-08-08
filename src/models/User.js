const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      default: null,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      default: null,
    },
    role: {
      type: String,
      default: "user",
      enum: ["admin", "user"],
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};
module.exports = model("user", UserSchema);
