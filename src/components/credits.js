import React from "react";
import "../css/credits.css";
import { FaEnvelope, FaGithub } from "react-icons/lib/fa";

class Credits extends React.Component {
  constructor(props) {
    super(props);
    this.devs = [
      {
        name: "Aswin G",
        email: "aswinganesh666@gmail.com",
        githubID: "https://github.com/agzuniverse",
        avatar: "https://github.com/agzuniverse.png",
        gitName: "agzuniverse"
      },
      {
        name: "Aswin M Prabhu",
        email: "aswinmprabhu@gmail.com",
        githubID: "https://github.com/aswinmprabhu",
        avatar: "https://github.com/aswinmprabhu.png",
        gitName: "aswin1999"
      },
      {
        name: "Joyal A Johney",
        email: "joyalajohney@gmail.com",
        githubID: "https://github.com/JoyalAJohney",
        avatar: "https://github.com/JoyalAJohney.png",
        gitName: "JoyalAJohney"
      },
      {
        name: "Vivek R",
        email: "123vivekr@gmail.com",
        githubID: "https://github.com/123vivekr",
        avatar: "https://github.com/123vivekr.png",
        gitName: "123vivekr"
      }
    ];
  }

  users = dev => (
    <div id={dev.name} className="credits-card">
      <center>
        <img id="credits-avatar" src={dev.avatar} alt={`${dev.name} pic`} />
      </center>
      <div className="credits-devinfo">
        <span className="credits-name">
          <strong>{dev.name}</strong>
        </span>
        <br />
        <br />
        <span className="credit-sep" />
        <FaEnvelope key={dev.email} /> {dev.email}
        <br />
        <br />
        <FaGithub key={dev.githubID} />
        <a href={dev.githubID} style={{ textDecoration: "none" }}>
          {dev.gitName}
        </a>
      </div>
    </div>
  );

  render() {
    return (
      <div>
        <div className="Wrapper">
          <div className="bg" />
          <div className="bg2" />
          <div className="credits-container">
            <center>{this.devs.map(dev => this.users(dev))}</center>
          </div>
        </div>
      </div>
    );
  }
}
export default Credits;
