import Item from "../models/item.js";
import mongoose from "mongoose";

export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createItem = async (req, res) => {
  const item = req.body;
  const newItem = new Item(item);

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateItem = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No item with that ID");

  const updatedPost = await Item.findByIdAndUpdate(_id, post, { new: true });
  res.json(updatedPost);
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No item with that ID");

  await Item.findByIdAndRemove(id);
  res.json({ message: "Item deleted successfully" });
};
