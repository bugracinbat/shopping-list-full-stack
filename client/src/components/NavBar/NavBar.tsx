import { AppBar, Toolbar, Button } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Button component={NavLink} to="/" variant="text" color="inherit">
          Shopping List
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
