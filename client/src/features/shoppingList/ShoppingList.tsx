import { Grid } from "@mui/material";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchItems, setShowForm } from "./shoppingListSlice";
import Form from "../../components/Form/Form";
import ShoppingListItems from "../../components/Items/Items";
import Modal from "../../components/Modal/Modal";

export default function ShoppingList() {
  const items = useAppSelector((state) => state.shoppingList.items);
  const itemStatus = useAppSelector((state) => state.shoppingList.status);
  const showForm = useAppSelector((state) => state.shoppingList.showForm);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (itemStatus === "idle") {
      dispatch(fetchItems());
    }
  }, [itemStatus, dispatch]);

  return (
    <Grid container justifyContent="center" padding={7}>
      <ShoppingListItems items={items} />
      <Modal
        open={showForm}
        title="Shopping List"
        onClose={() => dispatch(setShowForm(false))}
        content={<Form />}
      />
    </Grid>
  );
}
