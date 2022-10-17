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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { moveSyntheticComments } from "typescript";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
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
function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
function ResourceRequests() {
  let { path, url } = useRouteMatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedAccidentId, setSelectedAccidentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resourceRequests, setResourceRequests] = useState([]);
  const [accident, setAccident] = useState(null);
  const [approvedBy, setApprovedBy] = useState([]);
  const [requeste, setRequests] = useState(null);
  const [requestId, setRequestId] = useState("");
  const [openApproveRequestAlert, setOpenAlert] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    // setAccident(null);
    setApprovedBy([]);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  function getResourceRequests() {
    firebase
      .firestore()
      .collection("ResourceRequests")
      .get()
      .then((item) => {
        setLoading(false);
        const items = item.docs.map((doc) => doc.data());
        setResourceRequests(items);
      })
      .catch((err) => {
        setLoading(false);
      });
  }
  const Approve = () => {
    firebase
      .firestore()
      .collection("ResourceRequests")
      .where("requestId", "==", requestId)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            try {
              firebase
                .firestore()
                .collection("ResourceRequests")
                .doc(doc.id)
                .set(
                  {
                    status: "approved",
                  },
                  { merge: true }
                )
                .then(() => {
                  handleDeleteClose();
                  handleToggle();
                })
                .catch((err) => {
                  console.log(err);
                });
            } catch (e) {}
          });
        } else {
        }
      })
      .catch((error) => {
        console.warn("Error getting documents: ", error);
      });
  };
  const selectRequest = (request) => {
    setRequestId(request.requestId);
    firebase
      .firestore()
      .collection("Employees")
      .where("id", "==", request.requestedBy)
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setApprovedBy(items);
        console.log(items);

        console.log(accident);
        handleToggle();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // setLoading(true);
    getResourceRequests();
    // setLoading(false);
  }, [resourceRequests]);
  const handleDeleteClose = () => {
    setOpenAlert(!openApproveRequestAlert);
  };
  useEffect(() => {
    setLoading(true);
    getResourceRequests();
  }, []);
  return (
    <>
      <Dialog
        open={openApproveRequestAlert}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure of Approving this request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={Approve} color="primary" variant="outlined">
            Continue
          </Button>
          <Button
            onClick={handleDeleteClose}
            color="secondary"
            variant="outlined"
            autoFocus
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {approvedBy && (
        <Backdrop className={classes.backdrop} open={open}>
          <div
            style={{
              marginBottom: 50,
              marginTop: 50,
              height: "70%",
              width: "70%",
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

                <h6
                  style={{ marginTop: 10, color: "black", fontWeight: "600" }}
                >
                  Resource Request
                </h6>
              </Toolbar>
            </AppBar>
            <Row style={{ width: "100%", height: "70%" }}>
              <Col
                md="12"
                lg="6"
                style={{
                  paddingLeft: 20,
                  paddingRight: 20,
                  height: "100%",
                }}
              >
                <Card style={{ height: "100%" }}>
                  <CardHeader style={{ marginTop: "5%" }}>
                    <CardTitle tag="h6">
                      <b>Request Details</b>
                    </CardTitle>
                  </CardHeader>
                  <CardBody style={{ height: "100%", marginTop: "5%" }}>
                    <h5>Resources Requested</h5>
                    <Divider />
                    <List
                      component="nav"
                      aria-label="secondary mailbox folders"
                    >
                      {accident?.requests.map((request, i) => {
                        return (
                          <div key={i}>
                            <ListItem button>
                              <ListItemText
                                style={{ fontWeight: "700" }}
                                primary={request.resource}
                              />
                              <ListItemText
                                style={{ fontWeight: "700", fontSize: 22 }}
                                primary="X"
                              />
                              <ListItemText
                                style={{ fontWeight: "700" }}
                                primary={request.quantity}
                              />
                            </ListItem>
                          </div>
                        );
                      })}
                    </List>
                    <h5>Status:{accident?.status}</h5>
                    {/* })} */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      style={{ fontWeight: "700", marginTop: "10%" }}
                      onClick={() => {
                        setOpenAlert(true);
                      }}
                    >
                      Approve Request
                    </Button>
                  </CardBody>
                </Card>
              </Col>

              <Col
                md="12"
                lg="6"
                style={{
                  height: 200,
                  paddingLeft: 20,

                  paddingRight: 20,
                }}
              >
                <h6 style={{ textAlign: "center", color: "black" }}>
                  Requested By
                </h6>
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
                            {approvedBy[0]?.active}
                          </h5>
                        </Col>
                        <Col className="ml-auto mr-auto" lg="6" md="6" xs="6">
                          <h5>
                            <small>Requested This Resource At</small>
                            <br />
                            {moment(accident?.requestedAt.toDate()).calendar()}
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
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="demo-icons">
              <CardHeader>
                <CardTitle tag="h5">
                  {resourceRequests.length} Resource Requests
                </CardTitle>
                <p className="card-category">Details Are Listed Below</p>
              </CardHeader>
              <CardBody className="all-icons">
                {!loading ? (
                  <Row>
                    {resourceRequests.map((accident, index) => {
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
                                    fontSize: 20,
                                  }}
                                >
                                  Number of items requested:{" "}
                                  {accident.requests.length}
                                </h5>

                                <h5
                                  style={{
                                    textAlign: "left",
                                    fontWight: "600",
                                    marginLeft: 10,
                                    fontSize: 20,
                                  }}
                                >
                                  Requested At:{" "}
                                  {moment(
                                    accident.requestedAt.toDate()
                                  ).calendar()}
                                </h5>

                                <Button
                                  variant="outlined"
                                  color="primary"
                                  fullWidth
                                  style={{ fontWeight: "700", marginTop: 20 }}
                                  onClick={() => {
                                    setAccident(accident);
                                    console.log(accident);
                                    selectRequest(accident);
                                    handleToggle();
                                  }}
                                >
                                  See Details
                                </Button>
                              </CardBody>
                            </Card>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                ) : (
                  <div
                    style={{
                      marginVertical: "10%",

                      textAlign: "center",
                    }}
                  >
                    <CircularProgress
                      color="secondary"
                      style={{ fontWeight: "700" }}
                    />
                    <h6>Loading....</h6>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ResourceRequests;
