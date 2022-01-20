import {
  Grid,
  Typography,
  Button,
  Box,
  IconButton,
  Checkbox,
  CircularProgress,
  DialogActions,
} from "@mui/material";
import styled from "styled-components";
import {
  CartItem,
  deleteItem,
  setSelectedId,
  setShowDeleteDialog,
  setShowForm,
} from "../../features/shoppingList/shoppingListSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Modal from "../Modal/Modal";

const StyledEmptyShoppingCartContainer = styled(Grid)`
  border: 1px solid #c6c6c6;
  box-sizing: border-box;
  border-radius: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 290px;
  max-width: 614px;
`;

const StyledItemsHeader = styled(Grid)`
  justify-content: space-between;
  align-items: center;
  padding-bottom: 11px;
`;

const StyledItemsGrid = styled(Grid)`
  padding: 10px;
  min-height: 87px;
  margin-bottom: 12px;
  border: 1px solid #d5dfe9;
`;

const StyledButton = styled(Button)`
  margin: 16px;
`;

const ShoppingListItems = ({ items }: { items: CartItem[] }) => {
  const itemStatus = useAppSelector((state) => state.shoppingList.status);
  const showDeleteDialog = useAppSelector(
    (state) => state.shoppingList.showDeleteDialog
  );
  const selectedId = useAppSelector((state) => state.shoppingList.selectedId);

  const dispatch = useAppDispatch();

  const handleDeleteClick = (id: string) => {
    dispatch(setShowDeleteDialog(true));
    dispatch(setSelectedId(id));
  };

  const handleAddClick = () => {
    dispatch(setShowForm(true));
  };

  const handleEditClick = (id: string) => {
    dispatch(setShowForm(true));
    dispatch(setSelectedId(id));
  };

  const EmptyShoppingList = () => (
    <StyledEmptyShoppingCartContainer container item xs={9} padding={6}>
      <Typography color="#87898C" variant="h6">
        Your shopping list is empty :(
      </Typography>
      <StyledButton
        variant="contained"
        onClick={() => dispatch(setShowForm(true))}
      >
        Add your first item
      </StyledButton>
    </StyledEmptyShoppingCartContainer>
  );

  const DeleteModal = () => {
    return (
      <Modal
        open={showDeleteDialog}
        title="Delete Item?"
        onClose={() => dispatch(setShowDeleteDialog(false))}
        content="Are you sure you want to delete this item? This can not be undone."
        actions={
          <>
            <Button
              variant="outlined"
              onClick={() => dispatch(setShowDeleteDialog(false))}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(deleteItem(selectedId))}
            >
              Delete
            </Button>
          </>
        }
      />
    );
  };

  if (itemStatus === "loading") {
    return <CircularProgress />;
  } else if (items.length === 0) {
    return <EmptyShoppingList />;
  }

  return (
    <Grid container spacing={2} justifyContent="space-between">
      <StyledItemsHeader container>
        <Typography variant="h6">Your Items</Typography>
        <Button variant="contained" onClick={handleAddClick}>
          Add Item
        </Button>
      </StyledItemsHeader>

      <DeleteModal />

      {items.map((item) => {
        return (
          <StyledItemsGrid
            container
            alignItems="center"
            justifyContent="flex-end"
            justifyItems="flex-end"
            key={item._id}
            item
            xs={12}
          >
            <Grid item xs={1}>
              <Checkbox color="primary" disabled checked={item.purchased} />
            </Grid>
            <Grid item xs>
              <Typography
                variant="h6"
                style={{
                  textDecoration: item.purchased ? "line-through" : "",
                  color: item.purchased ? "#4D81B7" : "#000000",
                }}
              >
                {item.name}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ textDecoration: item.purchased ? "line-through" : "" }}
              >
                {item.description}
              </Typography>
            </Grid>
            <Grid item>
              <Box>
                <IconButton onClick={() => handleEditClick(item._id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(item._id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Grid>
          </StyledItemsGrid>
        );
      })}
    </Grid>
  );
};

export default ShoppingListItems;
