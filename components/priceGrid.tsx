import React, { useState, useEffect, useCallback, memo } from "react";
import Grid from "@mui/material/Grid";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import { StudentInfo, ListStudentOrders, CartObject } from "../libs/types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles, useTheme, withStyles } from "@mui/styles";
import { formatPrice } from "../libs/formatPrice";

type AmountGridProps = {
  info: StudentInfo;
  cart: Array<CartObject>;
};

const useStyles = makeStyles((theme) => ({
  //best option creating classes
}));

const PriceGrid: React.FC<AmountGridProps> = ({ info, cart }) => {
  let { first_name, last_name, cohort } = info;

  const classes = useStyles();
  const theme = useTheme();

  let totalCalc: number;

  let cartPrice = cart.map((e) => {
    return e.price;
  });

  if (cart.length > 1) {
    totalCalc = cartPrice.reduce((prev, curr) => {
      return prev + curr;
    });
  } else if (cart.length === 1) {
    totalCalc = cart[0].price;
  } else {
    totalCalc = 0;
  }

  let total: string = `$${formatPrice(totalCalc)}`;

  return (
    <React.Fragment>
      <Grid sx={{ flexGrow: 1 }} container spacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Grid container>
              <Grid item style={{ width: "100%" }}>
                {/* <FormControl component="fieldset">
                <FormLabel component="legend">spacing</FormLabel>
              </FormControl> */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      gap: "40%",
                    }}
                  >
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ width: "100px" }}
                    >
                      {first_name} {last_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      gutterBottom
                      style={{ width: "100px" }}
                    >
                      {cohort}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      gap: "40%",
                    }}
                  >
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ width: "100px" }}
                    >
                      Total a Pagar
                    </Typography>
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{
                        width: "100px",
                      }}
                    >
                      {total}
                    </Typography>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default PriceGrid;
