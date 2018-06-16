import { auth, provider } from "../firebase/firebase";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  setGlobalUid,
  setGlobalEmail,
  setGlobalName,
  setGlobalProPic,
  testRedux
} from "../redux/ActionCreators";
import GetAuthDetails from "./GetAuthDetails";

class Auth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: "",
      userName: "",
      userProPic: "",
      userEmail: ""
    };
  }

  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log("already logged in");
      } else {
        console.log("No user logged in");
      }
    });
    this.props.testRedux("WORKS");
  }

  logout = () => {
    window.location = '/';
    auth.signOut().then(() => {
      this.setState({
        uid: "",
        userEmail: "",
        userName: "",
        userProPic: ""
      });
      localStorage.removeItem("LOCAL_UID");
      localStorage.removeItem("LOCAL_NAME");
      localStorage.removeItem("LOCAL_EMAIL");
      localStorage.removeItem("LOCAL_PROPIC");
      this.props.updateUid("");
      this.props.updateName("");
      this.props.updateEmail("");
      this.props.updatePropic("");
      console.log("Logout Successful");
      // this.props.history.push("/");
    });
  };

  login = () => {
    auth.signInWithPopup(provider).then(result => {
      const pData = result.user.providerData[0];
      console.log(result);
      // Check if user is a new user
      // const isNewUser = result.additionalUserInfo.isNewUser;
      this.setState(
        {
          uid: pData.uid,
          userEmail: pData.email,
          userName: pData.displayName,
          userProPic: pData.photoURL
        },
        () => {
          this.props.updateUid(this.state.uid);
          this.props.updateName(this.state.userName);
          this.props.updateEmail(this.state.userEmail);
          this.props.updatePropic(this.state.userProPic);
          localStorage.setItem("LOCAL_UID", this.state.uid);
          localStorage.setItem("LOCAL_NAME", this.state.userName);
          localStorage.setItem("LOCAL_EMAIL", this.state.userEmail);
          localStorage.setItem("LOCAL_PROPIC", this.state.userProPic);
          // this.props.history.push("/user");
        }
      );
      console.log("User has logged in");
      window.location = '/user';
      // this.props.history.push("/user");
    });
  };

  render() {
    return (
      <span>
        <GetAuthDetails />
        {!this.props.uid ? (
          <div>
            <button
              id="google-login"
              className="loginBtn loginBtn--google"
              onClick={this.login}
            >
              Login with Google
            </button>
            {/* <button id="fb-login" className="loginBtn loginBtn--facebook" onClick={ this.login }>Login with Facebook</button> */}
          </div>
        ) : (
          <button id="logout" onClick={this.logout}>
            Logout
          </button>
        )}
      </span>
    );
  }
}

Auth.propTypes = {
  uid: PropTypes.string.isRequired,
  updateUid: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  updatePropic: PropTypes.func.isRequired,
  testRedux: PropTypes.func.isRequired,
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
  },
  testRedux: text => {
    dispatch(testRedux(text));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
