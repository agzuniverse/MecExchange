import React, { Component } from "react";
import PropTypes from "prop-types";
import "../App.css";
import { connect } from "react-redux";
import GetAuthDetails from "./GetAuthDetails";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import Checkbox from "material-ui/Checkbox";
import { addToStorage } from "../firebase/firebase";
import Dialog from "material-ui/Dialog";
import CircularProgress from "material-ui/CircularProgress";

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semester: "Semester 1",
      branch: "Computer Science",
      isOnWa: true,
      open: false,
      invalid: [],
      uploading: false
    };
  }

  setInvalid = field => {
    const { invalid } = this.state;
    invalid.push(field);
    this.setState({ invalid });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  updateCheckmark = () => {
    this.setState({
      isOnWa: !this.state.isOnWa
    });
  };

  goToUserPage = () => {
    this.props.history.push("/user");
  };

  semChange = (event, index, value) => {
    this.setState({
      semester: value
    });
  };

  branchChange = (event, index, value) => {
    this.setState({
      branch: value
    });
  };

  handeSubmit = () => {
    if (!this.props.uid) {
      alert("You need to log in to add a book!");
    } else {
      const title = document.getElementById("bookTitle").value;
      const author = document.getElementById("bookAuthor").value;
      const price = document.getElementById("bookPrice").value;
      const contact = document.getElementById("mobile").value;
      const userClass = document.getElementById("userClass").value;
      const { isOnWa, semester, branch } = this.state;
      const file = document.getElementById("fileUpload").files[0];
      const tags = title.split(" ").concat(author.split(" "));

      this.state.invalid = [];
      // Generate tags for searching
      if (title.replace(/\s/g, "") === "")
        this.setInvalid("Title field is blank");

      if (author.replace(/\s/g, "") === "")
        this.setInvalid("Author field is blank");

      if (!(parseFloat(price) > 0))
        this.setInvalid("Price should be numeric and >0.");

      if (!(parseFloat(contact) > 0 && contact.length === 10))
        this.setInvalid(
          "Contact number is invalid. We only accept Indian Mobile Numbers. format eg: xxxxxxxxxx"
        );

      if (!(file && file.type.slice(0, 5) === "image"))
        this.setInvalid("Image is invalid.");

      // add all classes to state
      // if(!this.classNames.includes(userClass))
      //  this.setInvalid('class');
      if (!this.state.invalid.length === 0) {
        console.log("Form field error");
        this.handleOpen();
      } else {
        const data = {
          title,
          author,
          price,
          contact,
          userClass,
          isOnWa,
          uid: this.props.uid,
          email: this.props.email,
          username: this.props.name,
          semester,
          branch,
          tags
        };

        console.log("Adding book");
        document.getElementById("bookTitle").value = "";
        document.getElementById("bookAuthor").value = "";
        document.getElementById("bookPrice").value = "";
        document.getElementById("mobile").value = "";
        document.getElementById("userClass").value = "";
        this.setState({
          uploading: true
        });
        console.log("before uploading");
        this.addToStorageAsync(file, data);
      }
    }
  };

  addToStorageAsync = async (file, data) => {
    await addToStorage(file, data);
    this.setState({
      uploading: false
    });
    console.log("AFTER");
    this.props.history.push("/user");
  };

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary
        keyboardFocused
        onClick={this.handleClose}
      />
    ];
    if (this.props.uid)
      return (
        <div className="mainBackground-addProductPage sellWrapper">
          <GetAuthDetails />
          <MuiThemeProvider>
            <div className="appbar">
              <a href="/" className="logo">
                Books<span id="watchPart">Watch</span>
              </a>
            </div>
            {!this.state.uploading ? (
              <div className="centerTotal">
                <div className="backToButton">
                  <RaisedButton
                    style={{ float: "right", marginRight: "2vw" }}
                    label="Back to Profile"
                    onClick={this.goToUserPage}
                    primary
                  />
                </div>
                <h2 className="materialBlack">Add New Book</h2>
                <hr style={{ height: "2px", width: "90%", color: "black" }} />
                <p className="info">
                  <em>
                    Please fill in the information carefully without errors or
                    spelling mistakes. All fields are required.
                  </em>
                </p>
                <TextField
                  style={{ width: "65%" }}
                  id="bookTitle"
                  hintText="Enter book title"
                />
                <TextField
                  style={{ width: "65%" }}
                  id="bookAuthor"
                  hintText="Enter author name"
                />
                <TextField
                  style={{ width: "65%" }}
                  id="bookPrice"
                  hintText="Enter your expected price"
                />
                <TextField
                  type="number"
                  style={{ width: "65%" }}
                  id="mobile"
                  hintText="Enter your contact number"
                />
                <TextField
                  style={{ width: "65%" }}
                  id="userClass"
                  hintText="Enter your class (eg: CS4A, EE6 etc..)"
                />
                <br />
                <div>
                  <Checkbox
                    label="I can be contacted through Whatsapp"
                    checked={this.state.isOnWa}
                    onCheck={this.updateCheckmark}
                    style={{ fontSize: "13px" }}
                  />
                </div>
                <br />
                <span style={{ fontSize: "13px" }}>
                  Choose the semester for which this book is used:
                </span>
                <DropDownMenu
                  onChange={this.semChange}
                  style={{ width: "65%" }}
                  value={this.state.semester}
                  autoWidth={false}
                  className="dropDownMenu"
                >
                  <MenuItem value="Semester 1" primaryText="Semester 1" />
                  <MenuItem value="Semester 2" primaryText="Semester 2" />
                  <MenuItem value="Semester 3" primaryText="Semester 3" />
                  <MenuItem value="Semester 4" primaryText="Semester 4" />
                  <MenuItem value="Semester 5" primaryText="Semester 5" />
                  <MenuItem value="Semester 6" primaryText="Semester 6" />
                  <MenuItem value="Semester 7" primaryText="Semester 7" />
                  <MenuItem value="Semester 8" primaryText="Semester 8" />
                </DropDownMenu>
                <br />
                <span style={{ fontSize: "13px" }}>
                  Choose the branch for this book is used:
                </span>
                <DropDownMenu
                  onChange={this.branchChange}
                  style={{ width: "65%" }}
                  value={this.state.branch}
                  autoWidth={false}
                  className="dropDownMenu"
                >
                  <MenuItem
                    value="Computer Science"
                    primaryText="Computer Science"
                  />
                  <MenuItem value="Electrical" primaryText="Electrical" />
                  <MenuItem value="Electronics" primaryText="Electronics" />
                  <MenuItem value="Mechanical" primaryText="Mechanical" />
                  <MenuItem value="Civil" primaryText="Civil" />
                </DropDownMenu>
                <br />
                <br />
                <span style={{ padding: "5px", fontSize: "13px" }}>
                  {" "}
                  Upload a good quality picture of the book.{" "}
                </span>
                <RaisedButton
                  label="Choose Image"
                  labelPosition="before"
                  containerElement="label"
                >
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    className="hiddenFileInput"
                  />
                </RaisedButton>
                <div style={{ height: "5vh" }} />
                <RaisedButton
                  onClick={() => this.handeSubmit()}
                  label="Submit"
                  primary
                />
                <Dialog
                  title="Some fields require attention!"
                  actions={actions}
                  modal
                  open={this.state.open}
                >
                  {this.state.invalid.map(value => <p key={value}>{value}</p>)}
                </Dialog>
              </div>
            ) : (
              <div id="loading">
                <MuiThemeProvider>
                  <CircularProgress size={200} thickness={9} />
                  <h2 style={{ color: "white" }}> Uploading, please wait. </h2>
                </MuiThemeProvider>
              </div>
            )}
          </MuiThemeProvider>
        </div>
      );
    return (
      <div>
        <GetAuthDetails />
        <h1> 403 Forbidden </h1>
      </div>
    );
  }
}

AddProduct.propTypes = {
  uid: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  uid: state.auth.uid,
  email: state.auth.email,
  name: state.auth.name
});

export default connect(mapStateToProps)(AddProduct);
