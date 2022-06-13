import React, { useState, useEffect, useCallback, memo } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  StudentInfo,
  ListStudentOrders,
  StudentOrderObject,
  CartObject,
} from "../libs/types";
import { makeStyles, useTheme, withStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import "moment/locale/es";
import Checkbox from "@mui/material/Checkbox";
import { formatPrice } from "../libs/formatPrice";

type NestedCheckListProps = {
  info: StudentInfo;
  list: ListStudentOrders;
  type: {
    status: "PAID" | "DUE" | "OUTSTANDING" | string;
    primary: string;
    secondary: string;
  };
  handleToggle: Function;
  cart: Array<CartObject>;
};

const useStyles = makeStyles((theme) => ({
  //best option creating classes
}));

const NestedCheckList: React.FC<NestedCheckListProps> = ({
  info,
  list,
  type,
  handleToggle,
  cart,
}) => {
  let { first_name, last_name, cohort } = info;
  let { status, primary, secondary } = type;

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const listFiltered = list.filter((v) => v.status === status);

  type RenderPaymentOrdersProps = {
    orderStatus: string;
    order: StudentOrderObject;
    handleToggle: Function;
    cart: Array<CartObject>;
  };

  const RenderPaymentOrders: React.FC<RenderPaymentOrdersProps> = ({
    orderStatus,
    order,
    handleToggle,
    cart,
  }) => {
    let { name } = order;

    let timeText: string;
    moment.locale("es");
    let today = moment(new Date());
    let dueTime = moment(new Date(order.due));

    if (today.diff(dueTime) > 0) {
      if (orderStatus === "PAID") {
        order.payin
          ? (timeText = `Su pago ingresó correctamente el ${moment(
              new Date(order.payin.created)
            ).format("ll")}`)
          : (timeText = `Su pago realizado se está procesando`);
      } else {
        timeText = `Venció el ${dueTime.format("ll")}`;
      }
    } else {
      timeText = `Vence el ${dueTime.format("ll")}`;
    }
    return (
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton
            sx={{ pl: 4 }}
            onClick={
              orderStatus === "PAID"
                ? undefined
                : () => {
                    handleToggle(
                      order.id,
                      Number(order.price) + Number(order.interest)
                    );
                  }
            }
            dense
          >
            <ListItemText primary={name} secondary={timeText} />
            <ListItemText
              primary={`$${formatPrice(Number(order.price))}`}
              secondary={
                Number(order.interest) > 0
                  ? `Interés: $${formatPrice(Number(order.interest))}`
                  : undefined
              }
              sx={{ textAlign: "end" }}
            />
            {orderStatus !== "PAID" && (
              <Checkbox
                edge="end"
                checked={
                  cart.findIndex((v) => v.id === order.id) === -1 ? false : true
                }
                tabIndex={-1}
                disableRipple
              />
            )}
          </ListItemButton>
        </List>
      </Collapse>
    );
  };

  return (
    <React.Fragment>
      <Grid sx={{ flexGrow: 1 }} container spacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mt: 2 }}>
            <Grid container>
              <Grid item style={{ width: "100%" }}>
                <List
                  sx={{
                    width: "100%",
                    bgcolor: "background.paper",
                    margin: "auto",
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton
                    onClick={handleClick}
                    style={{ width: "100%" }}
                  >
                    <ListItemIcon>
                      {status === "PAID" && <DoneAllIcon />}
                      {status === "DUE" && <AccessTimeIcon />}
                      {status === "OUTSTANDING" && <PendingActionsIcon />}
                    </ListItemIcon>
                    <ListItemText primary={primary} secondary={secondary} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>

                  {listFiltered.map((elem, i) => (
                    <RenderPaymentOrders
                      orderStatus={status}
                      order={elem}
                      key={i}
                      handleToggle={handleToggle}
                      cart={cart}
                    />
                  ))}
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default NestedCheckList;
