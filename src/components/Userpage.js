import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { readFromStorage } from '../firebase/firebase';
import SideMenu from './SideMenu';
import ProductDiv from './ProductDiv';
import CircularProgress from 'material-ui/CircularProgress';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Userpage extends Component{

    constructor(props){
        super(props);
        this.state={
            bookData:{},
            loaded:false
        }
    }

    componentWillMount(){
        if(this.props.uid === '' || this.props.uid === null){
            this.fetchLocalUidAsync();
            this.props.update('SET_NAME',{name:localStorage.getItem('LOCAL_NAME')});
            this.props.update('SET_EMAIL',{email:localStorage.getItem('LOCAL_EMAIL')});
            this.props.update('SET_PROPIC',{propic:localStorage.getItem('LOCAL_PROPIC')});
        }
        else
            this.fetchUserBooks(this.props.uid);
    }

    fetchLocalUidAsync = async () => {
        await this.props.update('SET_UID',{uid:localStorage.getItem('LOCAL_UID')});
        this.fetchUserBooks(this.props.uid);
    }



    fetchUserBooks = async (uid) => {
        var bookData = await readFromStorage(uid);
        console.log(bookData);
        this.setState({
            bookData:bookData,
            loaded:true
        });
    }
    
    render() {
        const books = Object.keys(this.state.bookData).map(key => {
            console.log(this.state.bookData[key], key);
            return (
                <ProductDiv details={this.state.bookData[key]} />

            );
        });


        if (this.props.uid !== '' && this.props.uid !== null)
            return (
                <div className="App">
                    <SideMenu isFilter={false} userDetails={this.props} />
                    <div className="mainDiv">
                        {this.state.loaded ? books :
                            <div id="loading">
                                <GetAuthDetails />
                                <MuiThemeProvider>
                                    <CircularProgress size={200} thickness={9} />
                                </MuiThemeProvider>
                            </div>}

                    </div>
                </div>
            );
        else
            return <h1>403 Forbidden</h1>

    }
}

export default connect(
    (store) => {
        return store;
    },
    (dispatch) => {
        return {
          update: (dispatchType, dispatchPayload) => {
            dispatch({ type: dispatchType, payload: dispatchPayload });
          }
        }
    }
)(Userpage);