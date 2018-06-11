import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import GetAuthDetails from "./GetAuthDetails";

class ProductDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }
  toggleSellerInfoHidden = () => {
    if (
      this.props.uid !== "" &&
      this.props.uid !== null &&
      this.props.uid !== undefined
    )
      this.setState({ hidden: !this.state.hidden });
    else {
      alert("Please login to view seller details");
    }
  };

  render() {
    return (
      <div className="mainBackground sellWrapper">
        <GetAuthDetails />
        {this.props.location.state ? (
          <div>
            <div className="appbar">
              <a href="/" className="logo">
                Books<span id="watchPart">Watch</span>
              </a>
              {!this.props.uid ? (
                <Link to="/login">
                  <button id="logoutAppBar">Login</button>
                </Link>
              ) : (
                <Link to="/user">
                  <button id="logoutAppBar">Profile</button>
                </Link>
              )}
            </div>

            <div id="centerTotal">
              <div className="imageHolder">
                <img
                  id="textbook"
                  src={this.props.location.state.imageURL}
                  alt="Fetching error"
                />
              </div>

              <div className="detailCard">
                <div id="textName">{this.props.location.state.title}</div>
                <div id="author">{this.props.location.state.author}</div>
                <div id="amount">
                  <span id="priceTag">Price</span>: Rs{" "}
                  {this.props.location.state.price}{" "}
                </div>
                <div id="details">
                  Buyers are required to contact the sellers and set up a
                  meeting place for themselves
                </div>
                <button
                  type="submit"
                  id="sellerInfo"
                  onClick={() => this.toggleSellerInfoHidden()}
                >
                  Seller Info
                </button>
              </div>

              {!this.state.hidden ? (
                <div id="sellerInfoCard">
                  <h2>Seller Info</h2>
                  <ul>
                    <li>
                      Name: <span>{this.props.location.state.username}</span>
                    </li>
                    <li>
                      Semester: <span>4</span>
                    </li>
                    <li>
                      Branch: <span>Computer Science</span>
                    </li>
                    <li>
                      Mobile No:{" "}
                      <span>{this.props.location.state.contact}</span>
                    </li>
                    {this.props.location.state.isOnWa ? (
                      <li>
                        Is on Whatsapp: <span>Yes</span>
                      </li>
                    ) : (
                      <li>
                        Is on Whatsapp: <span>No</span>
                      </li>
                    )}
                    <li>
                      Email:
                      <span>{this.props.location.state.email}</span>
                    </li>
                    <button
                      type="submit"
                      onClick={() => this.toggleSellerInfoHidden()}
                    >
                      Done
                    </button>
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <h1 style={{ color: "white" }}>403 Forbidden</h1>
        )}
      </div>
    );
  }
}

ProductDisplay.propTypes = {
  uid: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired
};

export default connect(store => store)(ProductDisplay);
