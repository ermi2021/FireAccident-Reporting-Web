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
import { FaPlus } from "react-icons/fa";
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

function ManageUser() {
  const classes = useStyles();
  const vertical = "top";
  const horizontal = "center";
  const [firefighters, setFirefighters] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [hrs, setHRs] = useState([]);
  const [managers, setManagers] = useState([]);
  const [updateId, setUpdateId] = useState("");
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
    // setUpdateId("");
  };

  const handleToggleUpdate = () => {
    setOpenUpdate(!openUpdate);
  };

  function getFireFighters() {
    firebase
      .firestore()
      .collection("Employees")
      .where("Role", "==", "FireFighter")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setFirefighters(items);
      });
  }

  function getAdmins() {
    firebase
      .firestore()
      .collection("Employees")
      .where("Role", "==", "Adminstrator")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setAdmins(items);
      });
  }

  function getManagers() {
    firebase
      .firestore()
      .collection("Employees")
      .where("Role", "==", "Manager")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setManagers(items);
      });
  }

  function getHRS() {
    firebase
      .firestore()
      .collection("Employees")
      .where("Role", "==", "HR")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setHRs(items);
      });
  }
  function updateUser(user) {
    handleToggleUpdate();
    setUpdateId(user.id);
    setFname(user.FirstName);
    setMname(user.MiddleName);
    setLname(user.LastName);
    setRole(user.Role);
    setPhoneNumber(user.PhoneNumber);

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
  };

  const handleSubmitUpdate = (e) => {
    e.preventDefault();
    console.log(updateId);
    firebase
      .firestore()
      .collection("Employees")
      .where("id", "==", updateId)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //   console.warn(doc.id);

            firebase
              .firestore()
              .collection("Employees")
              .doc(doc.id)
              .set(
                {
                  FirstName: fname,
                  MiddleName: mname,
                  LastName: lname,
                  PhoneNumber: phoneNumber,
                  Email: email,
                  Role: role,
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
    const uploadTask = storage
      .ref(`/employee_images/${profilePicture.name}`)
      .put(profilePicture);
    uploadTask.on(
      "state_changed",
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot);
      },
      (err) => {
        //catches the errors
        console.log(err);
      },
      () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage
          .ref("employee_images")
          .child(profilePicture.name)
          .getDownloadURL()
          .then((fireBaseUrl) => {
            setImageAsUrl((prevObject) => ({
              ...prevObject,
              imgUrl: fireBaseUrl,
            }));
            console.log("image url" + imageAsUrl);
            firebase
              .firestore()
              .collection("Employees")
              .add({
                id: uuidv4(),
                FirstName: fname,
                MiddleName: mname,
                LastName: lname,
                UserName: fname + "123",
                Password: mname + "123",
                Role: role,
                Location: [0, 0],
                PhoneNumber: phoneNumber,
                Email: email,
                Profile_picture: imageAsUrl,
                active: false,
              })
              .then(handleClickSuccess(), resetForm())
              .catch((err) => {
                console.log(err);
                resetForm();
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  };

  useEffect(() => {
    // setLoading(true);

    getHRS();

    // setLoading(false);
  }, [hrs]);

  useEffect(() => {
    // setLoading(true);

    getAdmins();

    // setLoading(false);
  }, [admins]);

  useEffect(() => {
    // setLoading(true);

    getManagers();
    // setLoading(false);
  }, [managers]);

  useEffect(() => {
    // setLoading(true);
    getFireFighters();

    // setLoading(false);
  }, [firefighters]);

  const deleteUser = () => {
    firebase
      .firestore()
      .collection("Employees")

      .where("id", "==", updateId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          firebase
            .firestore()
            .collection("Employees")
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
            Are You Sure Of deleteing this user, this action can't be undone!!
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
          User Created Successfully!!!
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccessUpdate}
        autoHideDuration={6000}
        onClose={handleCloseSuccessUpdate}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleCloseSuccessUpdate} severity="success">
          User Updated Successfully!!!
        </Alert>
      </Snackbar>
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
              <h5 style={{ marginTop: 10, color: "black", fontWeight: "600" }}>
                <FaPlus style={{ fontWeight: "700", fontSize: 18 }} /> Add User
              </h5>
            </Toolbar>
          </AppBar>
          <Row style={{ width: "100%", height: "90%", marginTop: "5%" }}>
            <Col
              md="12"
              lg="8"
              style={{
                paddingLeft: 20,

                paddingRight: 20,
              }}
            >
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">
                    <b>New User Form</b>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>First Name</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={fname}
                            inputProps={{
                              required: true,
                            }}
                            onChange={handleFnChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Middle Name</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={mname}
                            inputProps={{
                              required: true,
                            }}
                            onChange={handleMnChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Last Name</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={lname}
                            onChange={handleLnChange}
                            inputProps={{
                              required: true,
                            }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Phone Number</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={phoneNumber}
                            inputProps={{
                              required: true,
                            }}
                            onChange={handlePhoneChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label></label>
                          <br />
                          <TextField
                            id="outlined-select-currency-native"
                            select
                            label="User Role"
                            value={role}
                            fullWidth
                            inputProps={{
                              required: true,
                            }}
                            onChange={handleRoleChange}
                            SelectProps={{
                              native: true,
                            }}
                            variant="outlined"
                          >
                            <option key="" value=""></option>
                            <option key="FireFighter" value="FireFighter">
                              FireFighter
                            </option>
                            <option key="Adminstrator" value="Adminstrator">
                              Adminstrator
                            </option>

                            <option key="Manager" value="Manager">
                              Manager
                            </option>
                          </TextField>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pl-2" md="6">
                        <FormGroup>
                          <label>Email Address</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={email}
                            inputProps={{
                              type: "email",
                              required: true,
                            }}
                            onChange={handlEmailChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label style={{ color: "black" }}>
                            Profile Picture
                          </label>
                          <br />
                          <input
                            accept="image/*"
                            //   className={classes.input}
                            id="contained-button-file"
                            multiple
                            name="picture"
                            type="file"
                            value={""}
                            onChange={handlepicture}
                            hidden
                          />
                          <label htmlFor="contained-button-file">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              // style={{ margnLeft: 10 }}
                              size="large"
                            >
                              Upload
                            </Button>
                          </label>
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
                          width: "50%",
                          marginTop: "2%",
                          marginLeft: "25%",
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

            <Col
              md="12"
              lg="4"
              style={{
                height: 200,
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <Card className="card-user">
                <div
                  className="image"
                  style={{ backgroundColor: "#f6f6f6" }}
                ></div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        id="pro_picture"
                        className="avatar border-gray"
                        src={require("assets/img/AccountIcon.png").default}
                      />
                      <h5 className="title" style={{ color: "black" }}>
                        {fname} {mname} {lname}
                      </h5>
                    </a>
                    <p className="description" style={{ color: "black" }}>
                      {role}
                    </p>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                </CardFooter>
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
                onClick={handleCloseUpdate}
              ></IconButton>
              <h6 style={{ marginTop: 10, color: "black", fontWeight: "600" }}>
                Update User
              </h6>
            </Toolbar>
          </AppBar>
          <Row style={{ width: "100%", height: "90%", marginTop: "5%" }}>
            <Col
              md="12"
              lg="8"
              style={{
                paddingLeft: 20,

                paddingRight: 20,
              }}
            >
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">
                    <b>Update User Form</b>
                  </CardTitle>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={handleSubmitUpdate}>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>First Name</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={fname}
                            onChange={handleFnChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Middle Name</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={mname}
                            onChange={handleMnChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Last Name</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={lname}
                            onChange={handleLnChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Phone Number</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={phoneNumber}
                            onChange={handlePhoneChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label></label>
                          <br />
                          <TextField
                            id="outlined-select-currency-native"
                            select
                            label="User Role"
                            value={role}
                            fullWidth
                            onChange={handleRoleChange}
                            SelectProps={{
                              native: true,
                            }}
                            variant="outlined"
                          >
                            <option key="" value=""></option>
                            <option key="FireFighter" value="FireFighter">
                              FireFighter
                            </option>
                            <option key="Adminstrator" value="Adminstrator">
                              Adminstrator
                            </option>
                            <option key="HR" value="HR">
                              Human Resource Manager
                            </option>
                            <option key="Manager" value="Manager">
                              Manager
                            </option>
                          </TextField>
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="pl-2" md="6">
                        <FormGroup>
                          <label>Email Address</label>
                          <TextField
                            placeholder=""
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={handlEmailChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label style={{ color: "black" }}>
                            Profile Picture
                          </label>
                          <br />
                          <input
                            accept="image/*"
                            //   className={classes.input}
                            id="contained-button-file"
                            multiple
                            name="picture"
                            type="file"
                            value={""}
                            onChange={handlepicture}
                            hidden
                          />
                          <label htmlFor="contained-button-file">
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                              // style={{ margnLeft: 10 }}
                              size="large"
                            >
                              Upload
                            </Button>
                          </label>
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
                          width: "50%",
                          marginTop: "2%",
                          marginLeft: "25%",
                          backgroundColor: "green",
                        }}
                      >
                        Update
                      </Button>
                    </Row>
                  </Form>
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
              <Card className="card-user">
                <div
                  className="image"
                  style={{ backgroundColor: "#f6f6f6" }}
                ></div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        id="pro_picture"
                        className="avatar border-gray"
                        src={require("assets/img/AccountIcon.png").default}
                      />
                      <h5 className="title" style={{ color: "black" }}>
                        {fname} {mname} {lname}
                      </h5>
                    </a>
                    <p className="description" style={{ color: "black" }}>
                      {role}
                    </p>
                  </div>
                </CardBody>
                <CardFooter>
                  <hr />
                </CardFooter>
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

            justifyContent: "space-around",
            flexDirection: "row",
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
                textAlign: "center",
                color: "tomato",
                fontWeight: "700",
              }}
            >
              {admins.length}
            </h2>
            <h4 style={{ textAlign: "center", fontWeight: "700" }}>
              Adminstrators
            </h4>
          </div>
          <div
            style={{
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "tomato",
                fontWeight: "700",
              }}
            >
              {hrs.length}
            </h2>
            <h4 style={{ textAlign: "center", fontWeight: "700" }}>
              Human Resource Managers
            </h4>
          </div>
          <div
            style={{
              paddingTop: 20,
              paddingBottom: 20,
            }}
          >
            <h2
              style={{
                textAlign: "center",
                color: "tomato",
                fontWeight: "700",
              }}
            >
              {firefighters.length}
            </h2>
            <h4 style={{ textAlign: "center", fontWeight: "700" }}>
              Firefighters
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
                <h4 style={{ fontWeight: "500" }}>FireFighters</h4>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => {
                    handleToggle();
                  }}
                >
                  <FaPlus
                    style={{ fontWeight: "700", fontSize: 18, marginRight: 20 }}
                  />{" "}
                  Add New User
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
                            First Name
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Middle Name
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Last Name
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Phone Number
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Status
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          ></TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {firefighters
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
                                <TableCell key={row.FirstName} align="left">
                                  {row.FirstName}
                                </TableCell>
                                <TableCell key={row.MiddleName} align="left">
                                  {row.MiddleName}
                                </TableCell>
                                <TableCell key={row.LastName} align="left">
                                  {row.LastName}
                                </TableCell>
                                <TableCell key={row.PhoneNumber} align="left">
                                  {row.PhoneNumber}
                                </TableCell>
                                <TableCell key={row.active} align="left">
                                  {row.active}
                                </TableCell>
                                <TableCell key={row.id} align="left">
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    style={{ fontWeight: "700" }}
                                    onClick={() => {
                                      updateUser(row);
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
                                      setUpdateId(row.id);
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
                <h4 style={{ fontWeight: "500" }}>Adminstrators</h4>
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
                            First Name
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Middle Name
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Last Name
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Phone Number
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Status
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          ></TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {admins
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
                                <TableCell key={row.FirstName} align="left">
                                  {row.FirstName}
                                </TableCell>
                                <TableCell key={row.MiddleName} align="left">
                                  {row.MiddleName}
                                </TableCell>
                                <TableCell key={row.LastName} align="left">
                                  {row.LastName}
                                </TableCell>
                                <TableCell key={row.PhoneNumber} align="left">
                                  {row.PhoneNumber}
                                </TableCell>
                                <TableCell key={row.active} align="left">
                                  {row.active}
                                </TableCell>
                                <TableCell key={row.id} align="left">
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    style={{ fontWeight: "700" }}
                                    onClick={() => {
                                      updateUser(row);
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
                                      setUpdateId(row.id);
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
                    count={admins.length}
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
                <h4 style={{ fontWeight: "500" }}>Managers</h4>
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
                            First Name
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Middle Name
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Last Name
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Phone Number
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          >
                            Status
                          </TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          ></TableCell>
                          <TableCell
                            align="left"
                            style={{ minWidth: 200, fontWeight: "700" }}
                          ></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {managers
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
                                <TableCell key={row.FirstName} align="left">
                                  {row.FirstName}
                                </TableCell>
                                <TableCell key={row.MiddleName} align="left">
                                  {row.MiddleName}
                                </TableCell>
                                <TableCell key={row.LastName} align="left">
                                  {row.LastName}
                                </TableCell>
                                <TableCell key={row.PhoneNumber} align="left">
                                  {row.PhoneNumber}
                                </TableCell>
                                <TableCell key={row.active} align="left">
                                  {row.active}
                                </TableCell>
                                <TableCell key={row.id} align="left">
                                  <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    style={{ fontWeight: "700" }}
                                    onClick={() => {
                                      updateUser(row);
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
                                      setUpdateId(row.id);
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
                    count={managers.length}
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

export default ManageUser;
