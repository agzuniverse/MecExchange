import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { connect } from "react-redux";
import {
  setGlobalUid,
  setGlobalEmail,
  setGlobalName,
  setGlobalProPic
} from "../redux/ActionCreators";
import { readFromStorage, searchUser } from "../firebase/firebase";
import SideMenu from "./SideMenu";
import ProductDiv from "./ProductDiv";
import CircularProgress from "material-ui/CircularProgress";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Searchbar from "./Searchbar";

class Userpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: {},
      loaded: false
    };
  }

  componentWillMount() {
    if (!this.props.uid) {
      this.fetchLocalUidAsync();
      this.props.updateName(localStorage.getItem("LOCAL_NAME"));
      this.props.updateEmail(localStorage.getItem("LOCAL_EMAIL"));
      this.props.updatePropic(localStorage.getItem("LOCAL_PROPIC"));
    } else this.fetchUserBooks(this.props.uid);
  }

  fetchLocalUidAsync = async () => {
    await this.props.updateUid(localStorage.getItem("LOCAL_UID"));
    this.fetchUserBooks(this.props.uid);
  };

  fetchUserBooks = async uid => {
    const result = await readFromStorage(uid);
    let bookData = {};
    result.forEach(data => {
      bookData[data.id] = data.data();
    });
    if (bookData == null) bookData = {};
    this.setState({
      bookData,
      loaded: true
    });
  };

  performSearch = async query => {
    console.log("performSearch");
    this.setState({
      loaded: false
    });
    console.log(query);
    try {
      const result = await searchUser(query, this.props.uid);
      const searchResults = {};
      result.forEach(data => {
        searchResults[data.id] = data.data();
      });
      this.setState({
        searchResults,
        loaded: true
      });
    } catch (err) {
      console.log(err);
    }
  };

  search = e => {
    console.log("search func");
    e.preventDefault();
    const query = document.getElementById("input2").value;
    this.performSearch(query);
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
    let books = [];
    if (this.state.searchResults) {
      books = this.state.searchResults.map(book => (
        <ProductDiv details={book} />
      ));
    } else {
      books = Object.keys(this.state.bookData).map(key => (
        <ProductDiv details={this.state.bookData[key]} />
      ));
    }

    if (this.props.uid !== "" && this.props.uid !== null)
      return (
        <div className="App">
          <SideMenu
            isFilter={false}
            userDetails={this.props}
            navigateOnAuthChange={this.navigateOnAuthChange}
          />
          <div className="mainDiv">
            <Searchbar search={this.search} />
            <div id="productList">
              {this.state.loaded ? (
                books
              ) : (
                <div id="loading">
                  <MuiThemeProvider>
                    <CircularProgress size={50} thickness={5} />
                  </MuiThemeProvider>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    return <h1>403 Forbidden</h1>;
  }
}

Userpage.propTypes = {
  uid: PropTypes.string.isRequired,
  updateUid: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  updatePropic: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  uid: state.auth.uid
});

const mapDispatchToProps = dispatch => ({
  updateUid: uid => {
    dispatch(setGlobalUid(uid));
  },
  updateEmail: email => {
    dispatch(setGlobalEmail(email));
  },
  updateName: name => {
    dispatch(setGlobalName(name));
  },
  updatePropic: propic => {
    dispatch(setGlobalProPic(propic));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Userpage);
