import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { searchString } from "../redux/ActionCreators";
import GetAuthDetails from "./GetAuthDetails";
import Auth from "./auth";

class LandingPage extends Component {
  search = () => {
    const query = document.getElementById("input").value;
    this.props.updateSearchString(query);
    this.props.history.push("/search");
  };

  navigateOnAuthChange = path => {
    switch (path) {
      case "userpage":
        this.props.history.push("/user");
        break;
      case "homepage":
        this.props.history.push("/");
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <div>
        <GetAuthDetails />
        <div className="Wrapper">
          <div className="bg" />
          <div className="bg2" />

          <div className="container">
            <span id="button">
              <Auth navigateOnAuthChange={this.navigateOnAuthChange} />
            </span>
            <center>
              <h1 id="head">
                <span id="watch">BooksWatch</span>
              </h1>
            </center>
            <form onSubmit={this.search}>
              <input id="input" type="text" placeholder="Search for Books" />
            </form>
            <div id="tagLine">
              An Official KTU book exchange platform For MECians!
            </div>
            <div id="bottom">
              <Link
                to="/credits"
                style={{ textDecoration: "none", color: "white" }}
              >
                Developed by Students of Govt. Model Engineering College
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LandingPage.propTypes = {
  updateSearchString: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
const mapDispatchToProps = dispatch => ({
  updateSearchString: query => {
    dispatch(searchString(query));
  }
});

export default connect(null, mapDispatchToProps)(LandingPage);
