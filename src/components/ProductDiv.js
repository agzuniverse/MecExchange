import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../App.css";
import "../assets/book1.jpg";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class ProductDiv extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    const { imageurl, title, author, price } = this.props.details;

    return (
      <div className="ProductDiv">
        <MuiThemeProvider>
          <div className="imgDiv">
            <img src={imageurl} id="productImg" alt="" />
          </div>
          <Link
            to={{ pathname: "/productdisplay", state: this.props.details }}
            properties={this.props.details}
            style={{ textDecoration: "none" }}
          >
            <div className="infoDiv">
              <span id="bookName">{title}</span>
              <br />
              <span id="author">{author}</span>
              <br />
              <span id="price">Rs {price}</span>
              <br />
              <br />
            </div>
          </Link>
        </MuiThemeProvider>
      </div>
    );
  }
}

ProductDiv.propTypes = {
  details: PropTypes.object.isRequired
};

export default ProductDiv;
