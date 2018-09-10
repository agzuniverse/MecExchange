import React from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../App.css";
import { deleteFromDB } from "../firebase/firebase";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class ProductDiv extends React.Component {
  deleteBook = id => {
    console.log(id);
    deleteFromDB(id);
  };

  render() {
    const { imageURL, title, author, price, bookId } = this.props.details;

    return (
      <div className="ProductDiv">
        <MuiThemeProvider>
          <div className="imgDiv">
            <img src={imageURL} id="productImg" alt="Book" />
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
          {bookId ? (
            <div>
              <button
                onClick={() => this.deleteBook(bookId)}
                className="bookDeleteButton"
              >
                Delete book
              </button>
            </div>
          ) : null}
        </MuiThemeProvider>
      </div>
    );
  }
}

ProductDiv.propTypes = {
  details: PropTypes.object.isRequired
};

export default ProductDiv;
