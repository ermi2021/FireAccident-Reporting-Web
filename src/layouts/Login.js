import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import auth from "../auth";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Controls from "../Controls/Controls";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Redirect, useHistory } from "react-router-dom";
import { useForm, Form } from "../components/useForm";
import logo from "../assets/img/fire_gif.gif";
import firebase from "../API/firebase";
import Paper from "@material-ui/core/Paper";
const initialFValues = {
  username: "",
  password: "",
  role: "",
  email: "",
  newpassword: "",
  confirmpassword: "",
  phone: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const [role, setRole] = useState("");
  const [forgetpass, setForget] = useState(false);
  const [roleError, setRoleError] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    // if ("email" in fieldValues)
    //   temp.email = fieldValues.email ? "" : "Email is required!!";
    // if ("phone" in fieldValues)
    //   temp.phone = fieldValues.phone ? "" : "Phone Number is required!!";
    // if ("newpassword" in fieldValues)
    //   temp.newpassword = fieldValues.newpassword
    //     ? ""
    //     : "Password is required!!";
    // if ("confpassword" in fieldValues)
    //   temp.confpassword = fieldValues.confirmpassword
    //     ? ""
    //     : "Confirm your password!!";
    if ("username" in fieldValues)
      temp.username = fieldValues.username ? "" : "User Name is required!!";
    if ("password" in fieldValues)
      temp.password = fieldValues.password ? "" : "Password is required!!";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, errors, setErrors, handleInputChange, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );
  let loginAdmin = () => {
    localStorage.clear();
    localStorage.setItem("adminLoggedIn", true);
    history.push("/admin/dashboard");
  };
  let loginHr = () => {
    localStorage.clear();
    localStorage.setItem("managerLoggedIn", true);
    history.push("/hr/dashboard");
  };
  const handleSubmit = async (e) => {
    //console.log(values.username + " " + values.password + " " + role);
    e.preventDefault();
    if (role == "your role?") {
      setRoleError("Please Select Your Role?");
    } else {
      if (validate()) {
        firebase
          .firestore()
          .collection("Employees")
          .where("UserName", "==", values.username)
          .where("Password", "==", values.password)
          .where("Role", "==", role)
          .get()
          .then((querySnapshot) => {
            if (!querySnapshot.empty) {
              const items = querySnapshot.docs.map((doc) => doc.data());

              if (items[0].Role == "Adminstrator") {
                loginAdmin();
              }
              if (items[0].Role == "Manager") {
                loginHr();
              }

              console.log(items);
            } else {
              setIncorrect(true);
            }

            resetForm();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    setRoleError("");
  }, []);
  return (
    <div className={classes.root}>
      <Form onSubmit={handleSubmit}>
        <AppBar position="static" color="transparent">
          <Toolbar variant="regular">
            <img
              src={logo}
              alt="react-logo"
              style={{ width: 50, height: 50 }}
            />
            <Typography
              variant="h5"
              color="inherit"
              style={{
                fontWeight: "700",
                marginTop: 20,
                marginBottom: 20,
                marginLeft: 20,
                textAlign: "center",
              }}
            >
              APLS <br />
              <span
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: "tomato",
                }}
              >
                (Fire Accident V.)
              </span>
            </Typography>
          </Toolbar>
        </AppBar>

        <Grid
          container
          style={{ height: "100%", padding: "3%", overflowX: "hidden" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{
              padding: "5%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {!forgetpass && (
              <>
                <Card
                  className="card-user"
                  style={{ width: "30%", marginLeft: "10%" }}
                >
                  <div className="image" style={{ backgroundColor: "tomato" }}>
                    <h3
                      style={{
                        marginTop: "50px",
                        fontWeight: "700",
                        textAlign: "left",
                        color: "white",
                        marginLeft: 22,
                      }}
                    >
                      Sign In Form
                    </h3>
                  </div>
                  {incorrect && (
                    <Paper
                      variant="outlined"
                      color="secondary"
                      style={{
                        marginVertical: 15,
                        marginTop: 20,
                        padding: 15,
                        width: "100%",
                        marginHoLeft: 5,
                        marginRight: 5,
                        // backgroundColor: "brown",
                        opacity: 8,
                      }}
                      elevation={4}
                    >
                      <h6
                        style={{
                          color: "white",
                          fontWeight: "600",
                          color: "red",
                          textAlign: "center",
                        }}
                      >
                        INCORRECT USERNAME OR PASSWORD,TRY AGAIN!!
                      </h6>
                    </Paper>
                  )}
                  <CardBody
                    style={{
                      marginBottom: "50px",
                      alignContent: "center",
                      alignItems: "center",
                      width: "100%",
                      marginLeft: 40,
                    }}
                  >
                    <Controls.Input
                      label="username"
                      name="username"
                      value={values.username}
                      onChange={handleInputChange}
                      error={errors.username}
                    />
                    <br />
                    <br />
                    <Controls.Input
                      label="password"
                      name="password"
                      type="password"
                      value={values.password}
                      onChange={handleInputChange}
                      error={errors.password}
                    />
                    <br />
                    <br />
                    <FormControl className={classes.formControl}>
                      <Select value={role} onChange={handleChange}>
                        <MenuItem value="your role?">your role?</MenuItem>
                        <MenuItem value={"Adminstrator"}>Adminstrator</MenuItem>
                        <MenuItem value={"Manager"}>Manager</MenuItem>
                      </Select>
                      <h2
                        style={{
                          fontWeight: "700",
                          fontSize: 13,
                          marginVertical: 20,
                          color: "red",
                        }}
                      >
                        {roleError}
                      </h2>
                    </FormControl>
                    <br />
                    <br />
                    <FormControl className={classes.formControl}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Log In
                      </Button>
                    </FormControl>
                    <FormControl></FormControl>
                  </CardBody>
                </Card>
                <div
                  style={{
                    width: "60%",

                    marginLeft: "5%",
                  }}
                >
                  <Paper
                    variant="elevation"
                    color="secondary"
                    style={{
                      marginVertical: 15,

                      padding: 15,
                      width: "100%",
                      height: "100%",
                      marginLeft: 5,
                      marginRight: 5,
                      // backgroundColor: "brown",
                      paddingTop: "5%",
                      textAlign: "left",
                      paddingLeft: "5%",
                      justifyContent: "center",
                      alignContent: "center",
                      opacity: 8,
                    }}
                    elevation={0.2}
                  >
                    <img
                      alt=""
                      style={{ height: "270px", marginBottom: "50px" }}
                      src={require("assets/img/firefighterHome.jpg").default}
                    />
                    <h2 style={{ fontWeight: "700" }}>Seconds Are Lives</h2>
                    <h1 style={{ fontWeight: "500" }}>
                      Lets Be There In Time
                      <span style={{ color: "green", fontWeight: "700" }}>
                        !!!!!
                      </span>
                    </h1>
                  </Paper>
                </div>
              </>
            )}
          </Grid>
        </Grid>
      </Form>
    </div>
  );
}

export default Login;
