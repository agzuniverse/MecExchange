import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSemFilter, setBranchFilter } from "../redux/ActionCreators";
import RaisedButton from "material-ui/RaisedButton";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import Auth from "./auth";

class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semesterValue: "Any semester",
      branchValue: "Any branch"
    };
  }

  semChange = (event, index, value) => {
    this.setState({
      semesterValue: value
    });
    this.props.updateSemFilter(value);
  };

  branchChange = (event, index, value) => {
    this.setState({
      branchValue: value
    });
    this.props.updateBranchFilter(value);
  };

  login = () => {
    window.location = "/";
    window.alert("Please login to add book");
  };

  render() {
    if (this.props.isFilter === true) {
      return (
        <div className="SideMenu mainBackground mainColor">
          <MuiThemeProvider>
            <Link to="/">
              <a href="#" className="logo">
                Books<span id="watchPart">Watch</span>
              </a>
            </Link>
            <div className="filterDiv">
              <br />
              <br />
              Semester<br />
              <DropDownMenu
                onChange={this.semChange}
                value={this.state.semesterValue}
                autoWidth={false}
                className="dropDownMenu"
                labelStyle={{ color: "rgba(255,255,255,0.87)" }}
              >
                <MenuItem value="Any semester" primaryText="Any semester" />
                <MenuItem value="Semester 1" primaryText="Semester 1" />
                <MenuItem value="Semester 2" primaryText="Semester 2" />
                <MenuItem value="Semester 3" primaryText="Semester 3" />
                <MenuItem value="Semester 4" primaryText="Semester 4" />
                <MenuItem value="Semester 5" primaryText="Semester 5" />
                <MenuItem value="Semester 6" primaryText="Semester 6" />
                <MenuItem value="Semester 7" primaryText="Semester 7" />
                <MenuItem value="Semester 8" primaryText="Semester 8" />
              </DropDownMenu>
              <br />
              Branch<br />
              <DropDownMenu
                onChange={this.branchChange}
                value={this.state.branchValue}
                autoWidth={false}
                className="dropDownMenu"
                labelStyle={{ color: "rgba(255,255,255,0.87)" }}
              >
                <MenuItem value="Any branch" primaryText="Any branch" />
                <MenuItem
                  value="Computer Science"
                  primaryText="Computer Science"
                />
                <MenuItem value="Electrical" primaryText="Electrical" />
                <MenuItem value="Electronics" primaryText="Electronics" />
                <MenuItem value="Mechanical" primaryText="Mechanical" />
                <MenuItem value="Civil" primaryText="Civil" />
              </DropDownMenu>
            </div>
            <div className="linksDiv">
              {this.props.uid !== "" && this.props.uid !== null ? (
                <Link to="/user">
                  <RaisedButton backgroundColor="lawngreen" fullWidth>
                    Sell Books
                  </RaisedButton>
                </Link>
              ) : (
                <RaisedButton
                  backgroundColor="lawngreen"
                  fullWidth
                  onClick={this.login}
                >
                  Sell Books
                </RaisedButton>
              )}
            </div>
          </MuiThemeProvider>
        </div>
      );
    }
    return (
      <div className="SideMenu mainBackground mainColor">
        <MuiThemeProvider>
          <Link to="/">
            <a href="#" className="logo">
              Books<span id="watchPart">Watch</span>
            </a>
          </Link>
          <div className="userInfoDiv">
            <br />
            <br />
            <img
              src={this.props.proPic}
              className="profilePic"
              alt="Fetch error"
            />
            <br />
            <br />
            {this.props.userDetails.name}
            <br />
            {this.props.userDetails.email}
            <br />
            <Auth />
          </div>
          <div className="linksDiv">
            <Link to="/addproduct">
              <RaisedButton backgroundColor="lawngreen" fullWidth>
                Add Book
              </RaisedButton>
              <br />
              <br />
            </Link>
            <Link to="/search">
              <RaisedButton backgroundColor="lightblue" fullWidth>
                Search for books
              </RaisedButton>
              <br />
              <br />
            </Link>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

SideMenu.propTypes = {
  isFilter: PropTypes.bool.isRequired,
  updateSemFilter: PropTypes.func.isRequired,
  updateBranchFilter: PropTypes.func.isRequired,
  proPic: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  userDetails: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  uid: state.auth.uid,
  proPic: state.auth.proPic
});

const mapDispatchToProps = dispatch => ({
  updateSemFilter: sem => {
    dispatch(setSemFilter(sem));
  },
  updateBranchFilter: branch => {
    dispatch(setBranchFilter(branch));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
