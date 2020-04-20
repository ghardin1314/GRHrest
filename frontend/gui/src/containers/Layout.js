import React from "react";

import CustomTopbar from "../components/Topbar";

export default class ButtonAppBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CustomTopbar />
        {this.props.children}
      </React.Fragment>
    );
  }
}
                                                                                     