import {
  Container,
  FormControl,
  TextField,
  Typography,
  Box,
  makeStyles,
  Paper,
  Button,
  Link,
} from "@material-ui/core";
import axios from "axios";
import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import AlertCom from "../layout/Alert";
import { setAlert } from "../../action/alert";
import PropTypes from "prop-types";

const height = window.innerHeight;
const style = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    height: height,
    alignItems: "center",
    flexBasis: "auto",
  },
  paper: {
    width: "300px",
    padding: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "500px",
    "& h3": {
      textAlign: "center",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "300px",
  },
  inputSpace: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
  },
  btnGrp: {
    display: "flex",
    flexDirection: "column",
    height: "70px",
    justifyContent: "space-between",
  },
}));

const Register = (props) => {
  const classes = style();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [errVal, seterrVal] = useState("");
  const { name, email, password, password2 } = formData;
  const [error, seterror] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const onChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      props.setAlert("Password do not match", "error");
    } else {
      const newUser = {
        name,
        email,
        password,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify(newUser);
        const res = await axios.post("/api/users", body, config);
        console.log(res.data);
      } catch (err) {
        const errorvalue = err.response.data.errors[0].msg;
        seterrVal(errorvalue);
        seterror({ ...error, open: true });
      }
    }
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h3">Sign Up</Typography>
        <FormControl className={classes.form}>
          <TextField
            variant="outlined"
            label="Email"
            name="email"
            value={email}
            onChange={onChange}
          />
          <TextField
            className={classes.inputSpace}
            variant="outlined"
            label="Name"
            name="name"
            value={name}
            onChange={onChange}
          />
          <TextField
            className={classes.inputSpace}
            variant="outlined"
            label="password"
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
          <TextField
            className={classes.inputSpace}
            variant="outlined"
            label="Confrim password"
            name="password2"
            type="password"
            value={password2}
            onChange={onChange}
          />
        </FormControl>
        <Box className={classes.btnGrp}>
          <Button
            style={{ width: "100%" }}
            size="large"
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            Sign Up
          </Button>
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Box>
      </Paper>
      <AlertCom />
    </Container>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
