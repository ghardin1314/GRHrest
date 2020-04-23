import React from "react";
import { connect } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';

import AutoscrapeSelect from "../components/autoscrape/AutoscrapeSelect";
import AutoGraph from "../components/autoscrape/AutoGraph";


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
        <AutoGraph/>
        <AutoscrapeSelect/>
        {/* Placeholder for explination */}
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