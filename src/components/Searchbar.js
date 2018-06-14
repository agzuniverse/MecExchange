import React from "react";
import PropTypes from "prop-types";
import "../App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import IconButton from "material-ui/IconButton";
import NavigationMenu from "material-ui/svg-icons/navigation/menu";

let sideMenu = false;

function toggleSideMenu() {
  if (!sideMenu) {
    document.getElementsByClassName("App")[0].style.gridTemplateColumns =
      "230px 1fr";
    document.getElementsByClassName("App")[0].style.gridTemplateRows = "1fr";
    document.getElementsByClassName("SideMenu")[0].style.display = "grid";
    document.getElementsByClassName("mainDiv")[0].style.overflow = "hidden";
    sideMenu = true;
  } else {
    document.getElementsByClassName("App")[0].style.gridTemplateColumns = "1fr";
    document.getElementsByClassName("SideMenu")[0].style.display = "none";
    document.getElementsByClassName("mainDiv")[0].style.overflow = "hidden";
    sideMenu = false;
  }
}

const Searchbar = props => (
  <div className="Searchbar">
    <MuiThemeProvider>
      <div id="iconDiv">
        <IconButton onClick={toggleSideMenu}>
          <NavigationMenu />
        </IconButton>
      </div>
      <div id="inputDiv">
        <form onSubmit={props.search} id="searchForm">
          <input id="input2" type="text" placeholder="Search for Books" />
        </form>
      </div>
    </MuiThemeProvider>
  </div>
);

Searchbar.propTypes = {
  search: PropTypes.func.isRequired
};

export default Searchbar;
