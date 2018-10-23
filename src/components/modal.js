import React, { Component } from "react";
import RaisedButton from "material-ui/RaisedButton";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";


const Modal = ({ handleClose, show }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <MuiThemeProvider>
                <div className="modal-main">
                    <div className="chatBox">
                        You recieved one message from Vivek.R
                     </div>
                    <div className="chatBox"></div>
                    <div className="chatBox"></div>
                    <div className="chatBox"></div>
                    <RaisedButton secondary={true} onClick={handleClose} style={{ width: "20", margin: "auto" }}>
                        close
                    </RaisedButton>
                </div>
            </MuiThemeProvider>
        </div>
    );
};

export default Modal;