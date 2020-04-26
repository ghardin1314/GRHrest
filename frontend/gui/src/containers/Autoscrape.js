import React from "react";
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";


import AutoscrapeSelect from "../components/autoscrape/AutoscrapeSelect";
import AutoGraph from "../components/autoscrape/AutoGraph";
import AutoBody from "../components/autoscrape/AutoBody";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

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