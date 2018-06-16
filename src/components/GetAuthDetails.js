import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  setGlobalUid,
  setGlobalEmail,
  setGlobalName,
  setGlobalProPic
} from "../redux/ActionCreators";

class GetAuthDetails extends React.Component {
  componentWillMount() {
    if (this.props.uid === "" || this.props.uid === null) {
      this.props.updateUid(localStorage.getItem("LOCAL_UID"));
      this.props.updateName(localStorage.getItem("LOCAL_NAME"));
      this.props.updateEmail(localStorage.getItem("LOCAL_EMAIL"));
      this.props.updatePropic(localStorage.getItem("LOCAL_PROPIC"));
    }
  }

  render() {
    return null;
  }
}

GetAuthDetails.propTypes = {
  uid: PropTypes.string,
  updateUid: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
  updateName: PropTypes.func.isRequired,
  updatePropic: PropTypes.func.isRequired
};

GetAuthDetails.defaultProps = {
  uid: ""
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
)(GetAuthDetails);
