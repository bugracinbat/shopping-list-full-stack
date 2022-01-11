import axios from "axios";

const url = "http://localhost:5050/items";

export const getItems = () => axios.get(url);
export const createItem = (newItem) => axios.post(url, newItem);
export const updateItem = (id, updatedItem) =>
  axios.patch(`${url}/${id}`, updatedItem);
export const deleteItem = (id) => axios.delete(`${url}/${id}`);
