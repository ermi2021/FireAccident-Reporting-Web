import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Backdrop from "@material-ui/core/Backdrop";
import firebase from "../API/firebase";
import "elements-x/dist/mapbox";
import IconButton from "@material-ui/core/IconButton";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import Button from "@material-ui/core/Button";
import { FaCircle } from "react-icons/fa";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#f6f6f6",
  },
  root: {
    flexGrow: 1,
  },

  container: {
    maxHeight: 440,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Map() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [firefighters, setFirefighters] = useState([]);
  const [theFirefighter, setFireman] = React.useState(null);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleClose = () => {
    setOpen(false);
    setLatitude();
    setLongitude();
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const showOnMap = (row) => {
    handleToggle();
    setLatitude(row.Location[0]);
    setLongitude(row.Location[1]);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function getFirefighters() {
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
  function deActivate(workerId) {
    console.log(workerId);
    firebase
      .firestore()
      .collection("Employees")
      .where("id", "==", workerId)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            try {
              firebase
                .firestore()
                .collection("Employees")
                .doc(doc.id)
                .set(
                  {
                    active: false,
                  },
                  { merge: true }
                )
                .then(() => {
                  console.log("updated");
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
  }
  function Activate(workerId) {
    console.log(workerId);
    firebase
      .firestore()
      .collection("Employees")
      .where("id", "==", workerId)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            try {
              firebase
                .firestore()
                .collection("Employees")
                .doc(doc.id)
                .set(
                  {
                    active: true,
                  },
                  { merge: true }
                )
                .then(() => {
                  console.log("updated");
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
  }
  useEffect(() => {
    // setLoading(true);

    getFirefighters();
    // setLoading(false);
  }, [firefighters]);
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
                Fireman's Current Location
              </h5>
            </Toolbar>
          </AppBar>
          <Row style={{ width: "100%", height: "90%" }}>
            <Col
              md="12"
              lg="12"
              style={{
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <Card>
                <CardHeader>
                  <CardTitle tag="h6">
                    <b>firefighter Location</b>
                  </CardTitle>
                </CardHeader>
                <CardBody style={{ height: "100%" }}>
                  <x-mapbox
                    center={longitude + "," + latitude}
                    zoom="9"
                    access-token="pk.eyJ1IjoiZXJtaTEzIiwiYSI6ImNrcjVnbXBkMjM1OTgzMW5sdzFqb3F4cDEifQ.lYHeG_Lr7l3-oMHQoga7Gg"
                  >
                    <x-marker
                      id="marker"
                      lnglat={longitude + "," + latitude}
                      center
                    >
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/firefightericon.png").default}
                        style={{ width: 70, height: 70 }}
                      />
                    </x-marker>
                  </x-mapbox>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </Backdrop>

      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5>Registerd Fire Fighters</h5>
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
                                <TableCell key={index} align="left">
                                  {row.FirstName}
                                </TableCell>
                                <TableCell key={index} align="left">
                                  {row.MiddleName}
                                </TableCell>
                                <TableCell key={index} align="left">
                                  {row.LastName}
                                </TableCell>
                                <TableCell key={index} align="left">
                                  {row.PhoneNumber}
                                </TableCell>
                                <TableCell key={index} align="left">
                                  {row.active ? (
                                    <FaCircle
                                      style={{
                                        color: "green",
                                        fontSize: 22,
                                        marginLeft: "3%",
                                      }}
                                    />
                                  ) : (
                                    <FaCircle
                                      style={{
                                        color: "red",
                                        fontSize: 22,
                                        marginLeft: "3%",
                                      }}
                                    />
                                  )}
                                </TableCell>
                                <TableCell key={index} align="left">
                                  {row.active ? (
                                    <Button
                                      variant="outlined"
                                      color="secondary"
                                      fullWidth
                                      style={{ fontWeight: "700" }}
                                      onClick={() => {
                                        deActivate(row.id);
                                      }}
                                    >
                                      Deactivate
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="outlined"
                                      color="secondary"
                                      fullWidth
                                      style={{ fontWeight: "700" }}
                                      onClick={() => {
                                        Activate(row.id);
                                      }}
                                    >
                                      Activate
                                    </Button>
                                  )}
                                </TableCell>
                                <TableCell key={index} align="left">
                                  {row.active && (
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      fullWidth
                                      style={{ fontWeight: "700" }}
                                      onClick={() => {
                                        showOnMap(row);
                                      }}
                                    >
                                      View On Map
                                    </Button>
                                  )}
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
      </div>
    </>
  );
}

export default Map;
