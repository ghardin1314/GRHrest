import React from "react";

import Container from "@material-ui/core/Container";

import CustomTopbar from "../components/Topbar";

export default class ButtonAppBar extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CustomTopbar />
        <Container>{this.props.children}</Container>
      </React.Fragment>
    );
  }
}
