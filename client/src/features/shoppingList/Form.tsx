import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createItem, setShowForm, updateItem } from "./shoppingListSlice";

const ItemForm = () => {
  const [values, setValues] = useState({
    id: "",
    name: "",
    description: "",
    quantity: 0,
    purchased: false,
  });

  const selectedId = useAppSelector((state) => state.shoppingList.selectedId);
  const item = useAppSelector((state) =>
    state.shoppingList.items.find(
      (x) => x._id === state.shoppingList.selectedId
    )
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedId && item) {
      setValues({ ...item, id: item._id });
    }
  }, [selectedId, item]);

  const handleChangeValues =
    (name: string) => (event: { target: { value: any } }) => {
      setValues({ ...values, [name]: event.target.value });
    };

  const addCartItem = (values: {
    name: string;
    description: string;
    quantity: number;
    purchased: boolean;
    id: string;
  }) => {
    console.log(values);

    if (selectedId) {
      dispatch(updateItem({ id: selectedId, item: values }));
    } else {
      dispatch(createItem(values));
    }
  };

  return (
    <Grid
      container
      xs
      alignItems="flex-start"
      alignContent="flex-start"
      direction="column"
      rowGap={2}
    >
      <Grid container direction="column" alignItems="flex-start">
        <Typography variant="h5">
          {selectedId ? "Edit an Item" : "Add an Item"}
        </Typography>
        <Typography variant="subtitle1">
          {selectedId ? "Edit your item below" : "Add your new item below"}
        </Typography>
      </Grid>
      <TextField
        fullWidth
        id="filled-basic"
        label="Item Name"
        variant="outlined"
        value={values.name}
        onChange={handleChangeValues("name")}
      />
      <TextField
        fullWidth
        id="filled-basic"
        label="Description"
        variant="outlined"
        inputProps={{
          maxLength: 100,
        }}
        onChange={handleChangeValues("description")}
        helperText={`${values.description.length}/100`}
        multiline
        value={values.description}
        minRows={5}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">How many?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={values.quantity}
          label="Quantity"
          onChange={handleChangeValues("quantity")}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>

      {selectedId && (
        <FormControlLabel
          control={
            <Checkbox
              checked={values.purchased}
              onChange={(e) =>
                setValues({ ...values, purchased: e.target.checked })
              }
            />
          }
          label="Purchased"
        />
      )}

      <Grid container justifyContent="flex-end" gap={2} item>
        <Button variant="outlined" onClick={() => dispatch(setShowForm(false))}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => addCartItem(values)}>
          {selectedId ? "Save Item" : "Add Task"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default ItemForm;
