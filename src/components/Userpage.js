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
    if (this.props.uid === "" || this.props.uid === null) {
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
    let bookData = await readFromStorage(uid);
    console.log(bookData);
    if (bookData == null) bookData = {};
    this.setState({
      bookData,
      loaded: true
    });
  };

<<<<<<< 2f11a012f8f2f1d57f251d4a81ff6f9b30acebfc
=======
  
>>>>>>> Search func added to userpage
  performSearch = async query => {
    console.log("performSearch");
    this.setState({
      loaded: false
    });
    console.log(query);
    try {
<<<<<<< 2f11a012f8f2f1d57f251d4a81ff6f9b30acebfc
      const data = await searchUser(query, this.props.uid);
      console.log(data);
      this.setState({
        searchResults: data,
=======
      const data = await searchUser(query,this.props.uid);
      console.log(data);
      this.setState({
        searchResults:data,
>>>>>>> Search func added to userpage
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

  render() {
    let books = [];
<<<<<<< 2f11a012f8f2f1d57f251d4a81ff6f9b30acebfc
    if (this.state.searchResults) {
=======
    if(this.state.searchResults){
>>>>>>> Search func added to userpage
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
          <SideMenu isFilter={false} userDetails={this.props} />
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
  updatePropic: PropTypes.func.isRequired
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

export default connect(mapStateToProps, mapDispatchToProps)(Userpage);
