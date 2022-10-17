import React, { useEffect, useState } from "react";

// reactstrap components
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import firebase from "../API/firebase";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Backdrop from "@material-ui/core/Backdrop";
import IconButton from "@material-ui/core/IconButton";
import { TextField } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { v4 as uuidv4 } from "uuid";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  FormGroup,
  Form,
  Input,
  Col,
} from "reactstrap";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
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

function ManageResources() {
  const classes = useStyles();
  const vertical = "top";
  const horizontal = "center";
  const [firefighters, setFirefighters] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [hrs, setHRs] = useState([]);
  const [managers, setManagers] = useState([]);
  const [resourceId, setResourceId] = useState("");
  const storage = firebase.storage();
  const [fname, setFname] = useState("");
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setPicture] = useState("");
  const allInputs = { imgUrl: "" };
  const [imageAsUrl, setImageAsUrl] = React.useState(allInputs);
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openSuccessUpdate, setOpenSuccessUpdate] = React.useState(false);
  const [openDeleteAlert, setDeleteOpen] = React.useState(false);
  const [resQN, setResourceQunatity] = useState("");
  const [resRN, setResourceName] = useState("");
  const [resources, setResources] = useState([]);
  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleClickSuccess = () => {
    setOpenSuccess(true);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const handleClickSuccessUpdate = () => {
    setOpenSuccessUpdate(true);
  };

  const handleCloseSuccessUpdate = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessUpdate(false);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleFnChange = (event) => {
    setFname(event.target.value);
  };

  const handleMnChange = (event) => {
    setMname(event.target.value);
  };

  const handlEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLnChange = (event) => {
    setLname(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleRNChange = (event) => {
    setResourceName(event.target.value);
  };
  const handleQNChange = (event) => {
    setResourceQunatity(event.target.value);
  };
  const handlepicture = (event) => {
    const image = event.target.files[0];
    var src = URL.createObjectURL(event.target.files[0]);
    var preview = document.getElementById("pro_picture");
    preview.style.display = "block";
    preview.style.marginLeft = "40%";
    preview.src = src;
    setPicture(image);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClose = () => {
    setFname("");
    setMname("");
    setLname("");
    setRole("");
    setPhoneNumber("");
    setEmail("");
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleCloseUpdate = () => {
    setFname("");
    setMname("");
    setLname("");
    setRole("");
    setPhoneNumber("");
    setEmail("");
    setOpenUpdate(false);
    // setResourceId("");
  };

  const handleToggleUpdate = () => {
    setOpenUpdate(!openUpdate);
  };

  function getResources() {
    firebase
      .firestore()
      .collection("Resources")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setResources(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateResource(resource) {
    handleToggleUpdate();
    setResourceId(resource.id);
    setResourceName(resource.name);
    setResourceQunatity(resource.avaiableItem);

    // firebase
    //   .firestore()
    //   .collection("Employees")
    //   .where("Role", "==", "HR")
    //   .get()
    //   .then((item) => {
    //     const items = item.docs.map((doc) => doc.data());
    //     setHRs(items);
    //   });
  }
  const resetForm = () => {
    setOpen(false);
    setFname("");
    setMname("");
    setPhoneNumber("");
    setEmail("");
    setLname("");
    setPicture("");
    setRole("");
    setResourceQunatity("");
    setResourceName("");
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();

    firebase
      .firestore()
      .collection("Resources")
      .where("id", "==", resourceId)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //   console.warn(doc.id);

            firebase
              .firestore()
              .collection("Resources")
              .doc(doc.id)
              .set(
                {
                  name: resRN,
                  avaiableItem: resQN,
                },
                { merge: true }
              )
              .then(() => {
                handleClickSuccessUpdate();
                handleCloseUpdate();
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    firebase
      .firestore()
      .collection("Resources")
      .add({
        id: uuidv4(),
        name: resRN,
        avaiableItem: resQN,
      })
      .then(handleClickSuccess(), resetForm())
      .catch((err) => {
        console.log(err);
        resetForm();
      });
  };

  useEffect(() => {
    // setLoading(true);

    getResources();

    // setLoading(false);
  }, [resources]);

  const deleteUser = () => {
    firebase
      .firestore()
      .collection("Resources")

      .where("id", "==", resourceId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          firebase
            .firestore()
            .collection("Resources")
            .doc(doc.id)
            .delete()
            .then(() => {
              handleDeleteClose();
            })
            .catch();
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Dialog
        open={openDeleteAlert}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure Of deleteing this Resource, this action can't be
            undone!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteUser} color="primary">
            Continue
          </Button>
          <Button onClick={handleDeleteClose} color="secondary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Resource Added Successfully!!!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccessUpdate}
        autoHideDuration={6000}
        onClose={handleCloseSuccessUpdate}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleCloseSuccessUpdate} severity="success">
          Resource Updated Successfully!!!
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={open}>
        <div
          style={{
            marginBottom: 50,
            marginTop: 50,
            height: "60%",
            width: "60%",
            backgroundColor: "#f6f6f6",
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
              <h6 style={{ marginTop: 10, color: "black", fontWeight: "500" }}>
                Add Accident Prevention Tool
              </h6>
            </Toolbar>
          </AppBar>
          <Row
            style={{
              width: "100%",
              height: "90%",
              marginTop: "5%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Col
              md="12"
              lg="6"
              style={{
                paddingLeft: 20,

                paddingRight: 20,
              }}
            >
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h6">Add Resource Form</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row style={{ paddingLeft: 30, paddingRight: 30 }}>
                      <Col className="px-1" md="12">
                        <FormGroup>
                          <label>Resource Name</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={resRN}
                            onChange={handleRNChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="12">
                        <FormGroup>
                          <label>Quantity</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            type="number"
                            variant="outlined"
                            value={resQN}
                            onChange={handleQNChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        variant="contained"
                        fullWidth
                        size={"large"}
                        style={{
                          width: "70%",
                          marginTop: "2%",
                          marginLeft: "10%",
                          backgroundColor: "green",
                        }}
                      >
                        Submit
                      </Button>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Backdrop>
      <Backdrop className={classes.backdrop} open={openUpdate}>
        <div
          style={{
            marginBottom: 50,
            marginTop: 50,
            height: "60%",
            width: "60%",
            backgroundColor: "#f6f6f6",
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
                onClick={handleCloseUpdate}
              ></IconButton>
              <h6 style={{ marginTop: 10, color: "black", fontWeight: "500" }}>
                Update Accident Prevention Tool
              </h6>
            </Toolbar>
          </AppBar>
          <Row
            style={{
              width: "100%",
              height: "90%",
              marginTop: "5%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Col
              md="12"
              lg="6"
              style={{
                paddingLeft: 20,

                paddingRight: 20,
              }}
            >
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h6">Update Resource Form</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmitUpdate}>
                    <Row style={{ paddingLeft: 30, paddingRight: 30 }}>
                      <Col className="px-1" md="12">
                        <FormGroup>
                          <label>Resource Name</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={resRN}
                            onChange={handleRNChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="12">
                        <FormGroup>
                          <label>Quantity</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            type="number"
                            variant="outlined"
                            value={resQN}
                            onChange={handleQNChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        variant="contained"
                        fullWidth
                        size={"large"}
                        style={{
                          width: "70%",
                          marginTop: "2%",
                          marginLeft: "10%",
                          backgroundColor: "green",
                        }}
                      >
                        UPDATE
                      </Button>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Backdrop>

      <div className="content">
        <div
          style={{
            width: "100%",
            marginBottom: 30,
            backgroundColor: "white",
            display: "flex",
            flexDirection: "row",
            paddingLeft: 15,
          }}
        >
          <div
            style={{
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <h2
              style={{
                textAlign: "left",
                color: "tomato",
                fontWeight: "700",
              }}
            >
              {resources.length}
            </h2>
            <h4 style={{ textAlign: "center", fontWeight: "700" }}>
              Prevation Resources Available
            </h4>
          </div>
        </div>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingRight: "3%",
                  paddingLeft: "3%",
                  alignItems: "center",
                }}
              >
                <h4 style={{ fontWeight: "500" }}>
                  Accident Controlling Resources
                </h4>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => {
                    handleToggle();
                  }}
                >
                  Add Resource
                </Button>
              </CardHeader>
              <CardBody>
                <Paper className={classes.root}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Name
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 300, fontWeight: "700" }}
                          >
                            Total Quantity
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {resources
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((row, index) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={row.code}
                              >
                                <TableCell key={row.name} align="left">
                                  {row.name}
                                </TableCell>
                                <TableCell key={row.availableItem} align="left">
                                  {row.avaiableItem}
                                </TableCell>
                                <TableCell key={row.id} align="left">
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    style={{ fontWeight: "700" }}
                                    onClick={() => {
                                      updateResource(row);
                                    }}
                                  >
                                    Update
                                  </Button>
                                </TableCell>
                                <TableCell key={index} align="left">
                                  <Button
                                    variant="outlined"
                                    color="primary"
                                    fullWidth
                                    style={{ fontWeight: "700" }}
                                    onClick={() => {
                                      setResourceId(row.id);
                                      handleDeleteOpen();
                                    }}
                                  >
                                    Delete
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={firefighters.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </Paper>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">
                <img
                  alt="..."
                  src={require("assets/img/damir-bosnjak.jpg").default}
                />
              </div>
              <CardBody>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/mike.jpg").default}
                    />
                    <h5 className="title">Chet Faker</h5>
                  </a>
                  <p className="description">@chetfaker</p>
                </div>
                <p className="description text-center">
                  "I like the way you work it <br />
                  No diggity <br />I wanna bag it up"
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        12 <br />
                        <small>Files</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        2GB <br />
                        <small>Used</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                        24,6$ <br />
                        <small>Spent</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Team Members</CardTitle>
              </CardHeader>
              <CardBody>
                <ul className="list-unstyled team-members">
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={
                              require("assets/img/faces/ayo-ogunseinde-2.jpg")
                                .default
                            }
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        DJ Khaled <br />
                        <span className="text-muted">
                          <small>Offline</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={
                              require("assets/img/faces/joe-gardner-2.jpg")
                                .default
                            }
                          />
                        </div>
                      </Col>
                      <Col md="7" xs="7">
                        Creative Tim <br />
                        <span className="text-success">
                          <small>Available</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                  <li>
                    <Row>
                      <Col md="2" xs="2">
                        <div className="avatar">
                          <img
                            alt="..."
                            className="img-circle img-no-padding img-responsive"
                            src={
                              require("assets/img/faces/clem-onojeghuo-2.jpg")
                                .default
                            }
                          />
                        </div>
                      </Col>
                      <Col className="col-ms-7" xs="7">
                        Flume <br />
                        <span className="text-danger">
                          <small>Busy</small>
                        </span>
                      </Col>
                      <Col className="text-right" md="3" xs="3">
                        <Button
                          className="btn-round btn-icon"
                          color="success"
                          outline
                          size="sm"
                        >
                          <i className="fa fa-envelope" />
                        </Button>
                      </Col>
                    </Row>
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Company (disabled)</label>
                        <Input
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="Email" type="email" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue="Chet"
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue="Faker"
                          placeholder="Last Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue="Melbourne, Australia"
                          placeholder="Home Address"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>City</label>
                        <Input
                          defaultValue="Melbourne"
                          placeholder="City"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Country</label>
                        <Input
                          defaultValue="Australia"
                          placeholder="Country"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Postal Code</label>
                        <Input placeholder="ZIP Code" type="number" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          type="textarea"
                          defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      */}
      </div>
    </>
  );
}

export default ManageResources;
