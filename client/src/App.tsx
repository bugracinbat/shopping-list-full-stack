import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShoppingList from "./features/shoppingList/ShoppingList";
import NavBar from "./components/NavBar/NavBar";
import { Container } from "@mui/material";

function App() {
  return (
    <Container maxWidth={false} disableGutters>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ShoppingList />} />
          {/* <Route path="add" element={<ItemForm />} />
          <Route path="edit/:id" element={<ItemForm />} /> */}
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
