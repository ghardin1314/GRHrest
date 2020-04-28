import React from "react";
import { connect } from "react-redux";

import AutoscrapeSelect from "../components/autoscrape/AutoscrapeSelect";
import AutoGraph from "../components/autoscrape/AutoGraph";
import AutoBody from "../components/autoscrape/AutoBody";


class Autoscrape extends React.Component {

  render() {
    return <div>
        <AutoGraph />
        <AutoscrapeSelect/>
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