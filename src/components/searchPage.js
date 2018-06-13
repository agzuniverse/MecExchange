import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { connect } from "react-redux";
import { searchAll } from "../firebase/firebase";
import SideMenu from "./SideMenu";
import ProductDiv from "./ProductDiv";
import Searchbar from "./Searchbar";
import GetAuthDetails from "./GetAuthDetails";
import CircularProgress from "material-ui/CircularProgress";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      loaded: false,
    };
  }

  componentWillMount() {
    if (this.props.query !== null) {
      this.performSearch(this.props.query);
    }
  }

  performSearch = async query => {
    this.setState({
      loaded: false
    });
    console.log(query);
    const data = await searchAll(query);
    console.log(data);
    this.setState({
      searchResults: data,
      loaded: true
    });
  };

  search = e => {
    e.preventDefault();
    const query = document.getElementById("input2").value;
    this.performSearch(query);
  };

  render() {
    console.log(this.state.searchResults);
    const books = this.state.searchResults.map(book => {
      if (
        this.props.semFilter === "Any semester" &&
        this.props.branchFilter === "Any branch"
      )
        return <ProductDiv details={book} />;
      else if (
        this.props.semFilter !== "Any semester" &&
        this.props.branchFilter === "Any branch"
      ) {
        if (book.semester === this.props.semFilter)
          return <ProductDiv details={book} />;
      } else if (
        this.props.semFilter === "Any semester" &&
        this.props.branchFilter !== "Any branch"
      ) {
        if (book.branch === this.props.branchFilter)
          return <ProductDiv details={book} />;
      } else if (
        book.branch === this.props.branchFilter &&
        book.semester === this.props.semFilter
      )
        return <ProductDiv details={book} />;
      return null;
    });
    return (
      <div className="App">
        <GetAuthDetails />
        <SideMenu isFilter />
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
  }
}

SearchPage.propTypes = {
  query: PropTypes.string.isRequired,
  semFilter: PropTypes.string.isRequired,
  branchFilter: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  query: state.search.query,
  semFilter: state.search.semFilter,
  branchFilter: state.search.branchFilter
});

export default connect(mapStateToProps)(SearchPage);
