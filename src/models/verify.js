import mongoose from "mongoose";
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/API-FACEBOOK-DKH", {
  useNewURLParser: true,
  useUnifieDTopology: true,
});

const VerifySchema = new Schema(
  {
    id: String,
    startTime: Number,
    verifyCode: String,
    verified: Boolean,
  },
  {
    collection: "verify",
  }
);

const VerifyModel = mongoose.model("verify", VerifySchema);

module.exports = VerifyModel;
