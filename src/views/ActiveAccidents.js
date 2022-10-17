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

import ShowActiveDetails from "./ShowActiveDetails";
import { GoogleMap, withScriptjs } from "react-google-maps";
import "elements-x/dist/mapbox";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { moveSyntheticComments } from "typescript";
import logo from "../assets/img/activefire.jpg";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";

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

function ActiveAccidents() {
  let { path, url } = useRouteMatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedAccidentId, setSelectedAccidentId] = useState(null);
  const handleClose = () => {
    setOpen(false);
    setAccident(null);
    setApprovedBy([]);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const [activeAccidents, setActiveAccidents] = useState([]);
  const [accident, setAccident] = useState(null);
  const [approvedBy, setApprovedBy] = useState([]);

  function getActiveAccidents() {
    firebase
      .firestore()
      .collection("ActiveAccidents")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setActiveAccidents(items);
      });
  }

  function selectAccident(accident) {
    firebase
      .firestore()
      .collection("Employees")
      .where("id", "==", accident.ApprovedBy)
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setApprovedBy(items);
        console.log(items);
        setAccident(accident);
        handleToggle();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    // setLoading(true);

    getActiveAccidents();
    // setLoading(false);
  }, [activeAccidents]);

  return (
    <>
      {approvedBy && (
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
                <h6
                  style={{ marginTop: 10, color: "black", fontWeight: "500" }}
                >
                  <FaMapMarkerAlt /> Accident Details
                </h6>
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
                      <b>Accident Location</b>
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
                    <h5 style={{ marginTop: 20 }}>
                      <b>Current Status: {accident?.status}</b>
                    </h5>
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
                  Approved By
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
                          {approvedBy.FirstName} {approvedBy.MiddleName}{" "}
                          {approvedBy.LastName}
                        </h5>
                      </a>
                      <p className="description">Fire Fighter</p>
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
                            {approvedBy.active}
                          </h5>
                        </Col>
                        <Col className="ml-auto mr-auto" lg="6" md="6" xs="6">
                          <h5>
                            <small>Approved this accident at:</small>
                            <br />
                            {moment(accident?.ApprovedAt.toDate()).calendar()}
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
      )}
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
                Accident Details
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
                    <b>Accident Location</b>
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
                  <h5 style={{ marginTop: 20 }}>
                    <b>Current Status: {accident?.status}</b>
                  </h5>
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
                Approved By
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
                        {approvedBy[0]?.FirstName} {approvedBy[0]?.MiddleName}{" "}
                        {approvedBy[0]?.LastName}
                      </h5>
                    </a>
                    <p
                      className="description"
                      style={{ color: "black", fontWeight: "700" }}
                    >
                      {approvedBy[0]?.Role}
                    </p>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="6" md="6" xs="6">
                        <h5>
                          <small>
                            <b>status</b>
                          </small>
                          <br />
                          {approvedBy.active}
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="6" md="6" xs="6">
                        <h5>
                          <small>
                            <b>Approved This Accident At:</b>
                          </small>
                          <br />
                          {moment(accident?.ApprovedAt.toDate()).calendar()}
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
                <CardTitle tag="h5" style={{ fontWeight: "700" }}>
                  {activeAccidents.length} Active Fires
                </CardTitle>
                <p className="card-category">Details Are Listed Below</p>
              </CardHeader>
              <CardBody className="all-icons">
                <Row>
                  {activeAccidents.map((accident, index) => {
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
                                  marginTop: 10,
                                  fontSize: 18,
                                }}
                              >
                                Reported By:{" "}
                                <span style={{ fontWeight: "500" }}>
                                  {accident.ReportedBy}{" "}
                                </span>
                              </h5>

                              <h5
                                style={{
                                  textAlign: "left",
                                  fontWight: "500",
                                  marginLeft: 10,
                                  marginTop: 10,
                                  fontSize: 18,
                                }}
                              >
                                Reported At:{" "}
                                {moment(
                                  accident.ReportedAt.toDate()
                                ).calendar()}
                              </h5>
                              <h5
                                style={{
                                  textAlign: "left",
                                  marginLeft: 10,
                                  fontWight: "700",
                                  fontSize: 18,
                                }}
                              >
                                Approved At:{" "}
                                {moment(
                                  accident.ApprovedAt.toDate()
                                ).calendar()}
                              </h5>
                              <h5
                                style={{
                                  textAlign: "left",
                                  marginLeft: 10,
                                  fontWight: "700",
                                  fontSize: 18,
                                }}
                              >
                                Status: {accident.status}
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
                                <FaMapMarkerAlt
                                  style={{ color: "red", marginRight: "3%" }}
                                />{" "}
                                View On Map
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

export default ActiveAccidents;
