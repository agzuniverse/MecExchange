import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import sentLogo from "../img/if_telegram_519183.png";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import {
  sendMsg,
  subscribeToChat,
  checkForNewMessages,
  deleteNewMessages
} from "../firebase/firebase";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          msg:
            "Hey,there I'm interested in purchasing your book, where can we meet?",
          side: 0
        },
        {
          msg:
            "Yeah Sure, we can meet up near college library at 1pm tomorrow..",
          side: 1
        },
        {
          msg: "Sure man",
          side: 0
        },
        {
          msg: "Deal.",
          side: 1
        }
      ],
      newMessages: [
        {
          msg: "This is a placeholder",
          sender: "Vivek R"
        }
      ]
    };
  }

  componentDidMount() {
    this.fetchChatsAsync(this.props.uid, this.props.sendToUid);
    if (!this.props.sendToUid) {
      this.fetchNewMessages();
    }
  }

  fetchChatsAsync = async (uid, sendToUid) => {
    let messages = await subscribeToChat(uid, sendToUid);
    messages.forEach(data => {
      let msg = data.data();
      console.log(msg);
      if (msg.sender === this.props.uid) {
        this.setState({
          messages: this.state.messages.concat([{ msg: msg.msg, side: 1 }])
        });
      } else {
        this.setState({
          messages: this.state.messages.concat([{ msg: msg.msg, side: 0 }])
        });
      }
    });
  };

  sendChat = () => {
    if (this._input.value) {
      sendMsg(this.props.uid, this.props.sendToUid, this._input.value);
      this.setState({
        messages: this.state.messages.concat([
          { msg: this._input.value, side: 1 }
        ])
      });
      this._input.value = "";
    }
  };

  fetchNewMessages = () => {
    this.fetchNewMessagesAsync(this.props.uid);
  };

  fetchNewMessagesAsync = async uid => {
    let messages = await checkForNewMessages(uid);
    messages.forEach(data => {
      let msg = data.data();
      console.log(msg);
      this.setState({
        newMessages: this.state.newMessages.concat([
          { msg: msg.msg, sender: msg.sender }
        ])
      });
    });
    this.props.setUnreadText(this.state.newMessages.length);
    this.deleteSeenMessages(uid);
  };

  deleteSeenMessages = uid => {
    deleteNewMessages(uid);
  };

  fetchChat() {
    const Buyerbox = props => <div className="buyerBox">{props.chat}</div>;
    const Sellerbox = props => <div className="sellerBox">{props.chat}</div>;

    if (this.props.sendToUid) {
      return (
        <div className="chatContainer">
          <div className="chatHead">MecBooksWatch</div>
          <div className="chatBody">
            {this.state.messages.map(msg => {
              if (msg.side === 0) {
                return <Buyerbox chat={msg.msg} />;
              } else {
                return <Sellerbox chat={msg.msg} />;
              }
            })}
          </div>
          <div className="chatInput">
            <input ref={e => (this._input = e)} onKeyDown={e => {
              console.log(e.key);
              if (e.key == 'Enter') {
                e.preventDefault();
                this.sendChat();
              }
            }} />
            <img
              src={sentLogo}
              height="40"
              width="40"
              onClick={() => {
                this.sendChat();
              }}
            />
          </div>
        </div>
      );
    }
    return null;
  }
  render() {
    const { handleClose, show, sendToUid } = this.props;
    const showHideClassName = show
      ? "modal display-block"
      : "modal display-none";

    return (
      <div className={showHideClassName}>
        <MuiThemeProvider>
          {sendToUid ? (
            <div className="modal-main">
              {this.fetchChat()}
              <RaisedButton
                secondary={true}
                onClick={handleClose}
                id="closeBtn"
                buttonStyle={{
                  width: "20",
                  position: "absolute",
                  bottom: "10",
                  right: "10",
                  backgroundColor: "white",
                  borderRadius: "2em"
                }}
              >
                CLOSE
              </RaisedButton>
            </div>
          ) : (
              <div className="modal-main">
                {this.state.newMessages.map(msg => {
                  return <div className="chatBox">{msg.msg}</div>;
                })}
                <RaisedButton
                  secondary={true}
                  onClick={handleClose}
                  id="closeBtn"
                  buttonStyle={{
                    width: "20",
                    position: "absolute",
                    bottom: "10",
                    right: "10",
                    color: "white",
                    borderRadius: "2em"
                  }}
                >
                  CLOSE
              </RaisedButton>
              </div>
            )}
        </MuiThemeProvider>
      </div>
    );
  }
}

Modal.propTypes = {
  uid: PropTypes.string.isRequired,
  sendToUid: PropTypes.string
};

Modal.defaultProps = {
  sendToUid: ""
};

const mapStateToProps = state => ({
  uid: state.auth.uid
});

export default connect(mapStateToProps)(Modal);
