import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchItems, setShowForm } from "./shoppingListSlice";
import ItemForm from "./Form";
import ShoppingListItems from "./Items";

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

  const FormModal = () => (
    <Dialog
      open={showForm}
      fullWidth
      onClose={() => dispatch(setShowForm(false))}
    >
      <DialogTitle id="id">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="h6">SHOPPING LIST</Typography>
          </Box>
          <Box>
            <IconButton onClick={() => dispatch(setShowForm(false))}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <ItemForm />
      </DialogContent>
    </Dialog>
  );

  return (
    <Grid container justifyContent="center" padding={7}>
      <ShoppingListItems items={items} />
      <FormModal />
    </Grid>
  );
}
