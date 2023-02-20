import mongoose from 'mongoose';
const { Schema } = mongoose;

mongoose.connect("mongodb://localhost:27017/API-FACEBOOK-DKH", {
  useNewURLParser: true,
  useUnifieDTopology: true,
});

const AccountSchema = new Schema(
  {
    phonenumber: String,
    password: String,
    token: String,
    expirationAccessTokenDate: Date,
    refreshToken: String,
    id: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  },
  {
    collection: "accounts",
  }
);

const AccountModel = mongoose.model('accounts', AccountSchema);

module.exports = AccountModel;
