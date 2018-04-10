import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { searchAll } from '../firebase/firebase';
import SideMenu from './SideMenu';
import ProductDiv from './ProductDiv';
import GetAuthDetails from './GetAuthDetails';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class SearchPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
      loaded:false
    }
  }

  componentWillMount(){
    if(this.props.query!='' && this.props.query!=null){
      this.performSearch(this.props.query);
    }
  }
  

  performSearch = async (query) => {
    let data = await searchAll(query);
    console.log(data);
    this.setState({
      searchResults:data,
      loaded:true
    });
  }

  render() {
    console.log(this.state.searchResults);
    const books = this.state.searchResults.map(book => {
      return (
        <ProductDiv details={book} />
      );
    });


      return (
        <div className="App">
          <GetAuthDetails />
          <SideMenu isFilter={true} />
          <div className="mainDiv">
            <div id="searchDiv">
              <input id="input2" type="text" placeholder="Search for Books" />
            </div>

            {this.state.loaded ? books :
              <div id="loading">
                <MuiThemeProvider>
                  <CircularProgress size={200} thickness={9} />
                </MuiThemeProvider>
              </div>}
          </div>
        </div>
      );
    }

  
}

export default connect(
  (store) => {
    return store;
  }
)(SearchPage);
