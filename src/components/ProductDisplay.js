import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { connect } from "react-redux";
import gitHub from "../img/if_1-06_2311228.png";
import sentLogo from "../img/if_telegram_519183.png";
import smiley from "../img/if_emoji_emoticon-04_3638423.png";
import Modal from "./modal";
import { Link } from "react-router-dom";
import GetAuthDetails from "./GetAuthDetails";
import { subscribeToChat } from "../firebase/firebase";

class ProductDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hidden: true,
      show: false
    };
  }

  toggleSellerInfoHidden = () => {
    if (this.props.uid) this.setState({ hidden: !this.state.hidden });
    else {
      alert("Please login to view seller details");
    }
  };

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const {
      imageURL,
      title,
      author,
      price,
      username,
      contact,
      isOnWa,
      email,
      uid
    } = this.props.location.state;

    return (
      <div className="sellWrapper">
        <Modal
          show={this.state.show}
          handleClose={this.hideModal}
          sendToUid={uid}
        />
        <GetAuthDetails />
        {this.props.location.state ? (
          <div>
            {/* APPBAR */}
            <div className="appbar">
              <a href="/" className="logo">
                Books
                <span id="watchPart">Watch</span>
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
            {/* EXTRA WHITE DIV */}
            <div className="extraWhiteDiv">
              <button type="submit"
                onClick={() => this.showModal()}
                id="contactButton" >chat with Seller</button>
            </div>

            <div id="centerTotal">
              <div className="imageHolder">
                <img id="textbook" src={imageURL} alt="Book" />
              </div>

              <div className="detailCard">
                <div id="textName">{title}</div>
                <div id="author">{author}</div>
                <div id="amount">
                  <span id="priceTag">Price</span>: Rs {price}{" "}
                </div>
                <div id="details">
                  Buyers are required to contact the sellers and set up a<br />
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

              {/* MESSENGER */}
              {/* <div className="chatUi">
                <div className="chatHead">Seller Name</div> */}

              {/* CHAT BODY */}
              {/* <div className="chatBody">
                  <div className="buyerBox">
                    Hey,there I'm interested in purchasing your book, where can
                    we meet
                  </div>

                  <div className="sellerBox">
                    Yeah Sure, we can meet up near college library
                  </div>
                </div>

                <div className="chatInput">
                  <img src={smiley} height="30" width="30" />
                  <input />
                  <img
                    src={sentLogo}
                    height="40"
                    width="40"
                    onClick={this.subscribe}
                  />
                </div>
              </div> */}

              {!this.state.hidden ? (
                <div id="sellerInfoCard">
                  <h2>Seller Info</h2>
                  <ul>
                    <li>
                      Name: <span>{username}</span>
                    </li>
                    <li>
                      Semester: <span>4</span>
                    </li>
                    <li>
                      Branch: <span>Computer Science</span>
                    </li>
                    <li>
                      Mobile No: <span>{contact}</span>
                    </li>
                    {isOnWa ? (
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
                      <span>{email}</span>
                    </li>
                    <button
                      type="submit"
                      onClick={() => this.toggleSellerInfoHidden()}
                    >
                      Back
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

const mapStateToProps = state => ({
  uid: state.auth.uid
});

export default connect(mapStateToProps)(ProductDisplay);
