import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import * as api from "../../api";

export interface CartItem {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  purchased: boolean;
}

interface ShoppingListState {
  items: CartItem[];
  loading: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
  showForm: boolean;
  selectedId: string | null;
  showDeleteDialog: boolean;
}

const initialState: ShoppingListState = {
  items: [],
  loading: false,
  status: "idle",
  error: null,
  showForm: false,
  selectedId: null,
  showDeleteDialog: false,
};

export const fetchItems = createAsyncThunk(
  "shoppingList/fetchItems",
  async () => {
    const response = await api.getItems();
    return response.data;
  }
);

export const createItem = createAsyncThunk(
  "shoppingList/createItem",
  async (item: any) => {
    const { data } = await api.createItem(item);
    return data;
  }
);

export const updateItem = createAsyncThunk(
  "shoppingList/updateItem",
  async ({ id, item }: { id: any; item: any }) => {
    try {
      const { data } = await api.updateItem(id, item);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deleteItem = createAsyncThunk(
  "shoppingList/deleteItem",
  async (id: any) => {
    try {
      await api.deleteItem(id);
    } catch (error) {
      console.log(error);
    }
  }
);

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    setShowDeleteDialog(state, action: PayloadAction<boolean>) {
      state.showDeleteDialog = action.payload;
      if (!action.payload) {
        state.selectedId = null;
      }
    },
    setShowForm(state, action: PayloadAction<boolean>) {
      state.showForm = action.payload;

      if (!action.payload) {
        state.selectedId = null;
      }
    },
    setSelectedId(state, action: PayloadAction<string>) {
      state.selectedId = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchItems.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
        state.showForm = false;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(
          (item) => item._id !== action.meta.arg
        );
        state.showDeleteDialog = false;
        state.selectedId = null;
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateItem.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
        state.showForm = false;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedId, setShowForm, setShowDeleteDialog } =
  shoppingListSlice.actions;
export default shoppingListSlice.reducer;
