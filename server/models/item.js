import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  name: String,
  description: String,
  quantity: Number,
  purchased: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Item = mongoose.model("Item", itemSchema);
export default Item;
