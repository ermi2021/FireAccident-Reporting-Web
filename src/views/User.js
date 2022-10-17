import React, { useEffect, useState, Component } from "react";
import firebase from "../API/firebase";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  NavLink,
} from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { Modal, ModalManager, Effect } from "react-dynamic-modal";
import logo from "../assets/img/activefire.jpg";
import ShowActiveDetails from "./ShowActiveDetails";
import { GoogleMap, withScriptjs } from "react-google-maps";
import "elements-x/dist/mapbox";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { moveSyntheticComments } from "typescript";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#f6f6f6",
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function User() {
  let { path, url } = useRouteMatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedAccidentId, setSelectedAccidentId] = useState(null);
  const [activeAccidents, setActiveAccidents] = useState([]);
  const [accident, setAccident] = useState(null);
  const [helpRequests, setHelpRequests] = useState([]);
  const [requestedTo, setRequestedTo] = useState([]);
  const handleClose = () => {
    setOpen(false);
    setAccident(null);
    setRequestedTo([]);
    setRequestedTo([]);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  function getHelpRequests() {
    firebase
      .firestore()
      .collection("HelpRequests")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setHelpRequests(items);
      });
  }
  function selectAccident(accident) {
    firebase
      .firestore()
      .collection("Employees")
      .where("id", "==", accident.RequestedTo)
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setRequestedTo(items);

        setAccident(accident);
        handleToggle();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    // setLoading(true);
    getHelpRequests();
    // setLoading(false);
  }, [helpRequests]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={open}>
        <div
          style={{
            marginBottom: 50,
            marginTop: 50,
            height: "85%",
            width: "90%",
            backgroundColor: "white",
            padding: 30,
          }}
        >
          <AppBar
            position="static"
            color="transparent"
            style={{ marginBottom: 20 }}
          >
            <Toolbar variant="dense">
              <IconButton
                edge="end"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleClose}
              ></IconButton>
              <h5 style={{ marginTop: 10, color: "black", fontWeight: "700" }}>
                Request Details
              </h5>
            </Toolbar>
          </AppBar>
          <Row style={{ width: "100%", height: "90%" }}>
            <Col
              md="12"
              lg="8"
              style={{
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">
                    <b>Request Location</b>
                  </CardTitle>
                </CardHeader>
                <CardBody style={{ height: "100%" }}>
                  <x-mapbox
                    center={accident?.Longtitude + "," + accident?.Latitude}
                    zoom="9"
                    access-token="pk.eyJ1IjoiZXJtaTEzIiwiYSI6ImNrcjVnbXBkMjM1OTgzMW5sdzFqb3F4cDEifQ.lYHeG_Lr7l3-oMHQoga7Gg"
                  >
                    <x-marker
                      id="marker"
                      lnglat={accident?.Longtitude + "," + accident?.Latitude}
                      center
                    >
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/fire_gif.gif").default}
                        style={{ width: 70, height: 70 }}
                      />
                    </x-marker>
                  </x-mapbox>
                </CardBody>
              </Card>
            </Col>

            <Col
              md="12"
              lg="4"
              style={{
                height: 200,
                paddingLeft: 20,

                paddingRight: 20,
              }}
            >
              <h4 style={{ textAlign: "center", color: "black" }}>
                Requested To:
              </h4>
              <Card className="card-user">
                <div
                  className="image"
                  style={{ backgroundColor: "#f6f6f6" }}
                ></div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt={require("assets/img/AccountIcon.png").default}
                        className="avatar border-gray"
                        src={require("assets/img/AccountIcon.png").default}
                      />
                      <h5 className="title" style={{ color: "black" }}>
                        {requestedTo[0]?.FirstName} {requestedTo[0]?.MiddleName}{" "}
                        {requestedTo[0]?.LastName}
                      </h5>
                    </a>
                    <p className="description" style={{ fontWeight: "700" }}>
                      Fire Fighter
                    </p>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="6" md="6" xs="6">
                        <h5>
                          <small>status</small>
                          <br />
                          {/* {approvedBy.active} */}
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="6" md="6" xs="6">
                        <h5>
                          <small>Approved this accident at:</small>
                          <br />
                          {moment(accident?.Time.toDate()).calendar()}
                        </h5>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </Backdrop>

      <div className="content">
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle tag="h5">Help Me Requests</CardTitle>
                <p className="card-category">Details Are Listed Below</p>
              </CardHeader>
              <CardBody className="all-icons">
                <Row>
                  {helpRequests.map((accident, index) => {
                    return (
                      <>
                        <Col md="4" lg="4" sm="12">
                          <Card>
                            <CardHeader>
                              <div
                                style={{
                                  height: 100,
                                  backgroundColor: "#f6f6f6",
                                }}
                              >
                                <img
                                  src={logo}
                                  alt="react-logo"
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </div>
                            </CardHeader>
                            <CardBody>
                              <h5
                                style={{
                                  textAlign: "left",
                                  marginLeft: 10,
                                  fontWight: "700",
                                }}
                              >
                                Reported By: {accident?.PhoneNumber}{" "}
                              </h5>

                              <h5
                                style={{
                                  textAlign: "left",
                                  fontWight: "600",
                                  marginLeft: 10,
                                }}
                              >
                                Reported At:{" "}
                                {moment(accident?.Time.toDate()).calendar()}
                              </h5>

                              <Button
                                variant="outlined"
                                color="primary"
                                fullWidth
                                style={{ fontWeight: "700", marginTop: 20 }}
                                onClick={() => {
                                  selectAccident(accident);
                                }}
                              >
                                Show On Map
                              </Button>
                            </CardBody>
                          </Card>
                        </Col>
                      </>
                    );
                  })}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
