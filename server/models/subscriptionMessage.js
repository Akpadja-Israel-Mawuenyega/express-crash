import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
  endpoint: String,
  expirationTime: Number,
  keys: {
    p256dh: String,
    auth: String,
  },
});

export const subscriptionMessage = mongoose.model(
  "subscriptions",
  subscriptionSchema,
  "subscriptions"
);
