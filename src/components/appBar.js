import React from "react";
import Auth from './auth';

class Appbar extends React.Component {
  render() {
    return (
      <div className="appbar">
        <a href="" className="logo">
          Books<span id="watchPart">Watch</span>
        </a>
        <Auth />
        {/* <button id="logout" onClick={this.logout}>
          Logout
        </button> */}
      </div>
    );
  }
}

export default Appbar;
