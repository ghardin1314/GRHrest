import React from "react";
import { connect } from "react-redux";

import AutoGraph from "../components/autoscrape/AutoGraph";
import AutoBody from "../components/autoscrape/AutoBody";
import AutoForm from "../components/autoscrape/AutoForm"


class Autoscrape extends React.Component {

  render() {
    return <div>
        <AutoGraph />
        <AutoForm/>
        <AutoBody/>
    </div>;
  }
}


const mapStateToProps = state => {
    return{
      state: state
    }
  }

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Autoscrape)