import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// const useStyles = makeStyles((theme) => ({
//   terms: {
//     color: "blue",
//   },
// }));

const SummaryForm = () => {
  // const classes = useStyles();
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e) => {
    setDisabled(!disabled);
  };

  return (
    <Grid container justify="flex-start">
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={!disabled}
              onChange={handleChange}
              name="terms-and-conditions"
            />
          }
          label="I agree to Terms and Conditions"
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          type="submit"
          disabled={disabled}
          variant="contained"
          color="secondary"
        >
          Confirm Order
        </Button>
      </Grid>
    </Grid>
  );
};

export default SummaryForm;
