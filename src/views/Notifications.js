import React, { useState, useEffect } from "react";

import NotificationAlert from "react-notification-alert";
import InputLabel from "@material-ui/core/InputLabel";
import {
  UncontrolledAlert,
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { Pie } from "react-chartjs-2";
import firebase from "../API/firebase";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
function Notifications() {
  const notificationAlert = React.useRef();
  const [active, setActives] = useState([]);
  const [offline, setOffline] = useState([]);
  const [hard, setHards] = useState([]);
  const [beingControlled, setBeingControlled] = useState([]);
  const [controlled, setControlled] = useState([]);
  const [range, setRange] = useState("");

  function getActiveFiremans() {
    firebase
      .firestore()
      .collection("Employees")
      .where("active", "==", true)
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setActives(items);
      });
  }

  function getOfflineFiremans() {
    firebase
      .firestore()
      .collection("Employees")
      .where("active", "==", false)
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setOffline(items);
      });
  }

  function getHardActiveAccidents() {
    firebase
      .firestore()
      .collection("ActiveAccidents")
      .where("status", "==", "Hard")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setHards(items);
      });
  }

  function getBeingControlledActiveAccidents() {
    firebase
      .firestore()
      .collection("ActiveAccidents")
      .where("status", "==", "Being Controlled")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setBeingControlled(items);
      });
  }

  function getControlledActiveAccidents() {
    firebase
      .firestore()
      .collection("ActiveAccidents")
      .where("status", "==", "Controlled")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setControlled(items);
      });
  }

  useEffect(() => {
    getActiveFiremans();
    getOfflineFiremans();
    getBeingControlledActiveAccidents();
    getHardActiveAccidents();
    getOfflineFiremans();
    getControlledActiveAccidents();
  }, []);

  const handleChange = (event) => {
    setRange(event.target.value);
  };
  return (
    <>
      <div className="content">
        <NotificationAlert ref={notificationAlert} />
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h3">Reports</CardTitle>
              </CardHeader>
              <CardBody style={{ paddingLeft: "20%" }}>
                <Row>
                  <FormControl style={{ width: "70%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Enter Report Range To be Generated
                    </InputLabel>
                    <Select
                      variant="filled"
                      value={range}
                      onChange={handleChange}
                      placeholder="Enter Report Range"
                    >
                      <MenuItem value="3">Last 3 Month Report</MenuItem>
                      <MenuItem value={"6"}>Last 6 Month Report</MenuItem>
                      <MenuItem value={"12"}>Annual Report</MenuItem>
                      <MenuItem value={"1"}>This Weeks Report</MenuItem>
                    </Select>
                  </FormControl>
                </Row>
                <Row style={{ marginTop: "5%" }}>
                  <Col md="6">
                    <Card className="card-plain">
                      <CardHeader>
                        <CardTitle
                          tag="h5"
                          style={{
                            fontWeight: "600",
                            textAlign: "left",
                            marginLeft: 20,
                          }}
                        >
                          Firefighters Current Status
                        </CardTitle>
                      </CardHeader>
                      <CardBody
                        style={{ height: "45%", width: "55%", paddingTop: 20 }}
                      >
                        <Pie
                          data={{
                            labels: ["Active", "Offline"],
                            datasets: [
                              {
                                label: "Firefighters Status",
                                data: [active.length, offline.length],
                                backgroundColor: ["green", "red"],
                              },
                            ],
                          }}
                          height={100}
                          width={100}
                        ></Pie>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col md="6">
                    <Card className="card-plain">
                      <CardHeader>
                        <CardTitle
                          tag="h5"
                          style={{
                            fontWeight: "600",
                            textAlign: "left",
                            marginLeft: 70,
                          }}
                        >
                          Active Accidents
                        </CardTitle>
                      </CardHeader>
                      <CardBody
                        style={{ height: "45%", width: "55%", paddingTop: 20 }}
                      >
                        <Pie
                          data={{
                            labels: ["Hard", "Being Controlled", "Controlled"],
                            datasets: [
                              {
                                label: "Active Accidents Current Status",
                                data: [
                                  hard.length,
                                  beingControlled.length,
                                  controlled.length,
                                ],
                                backgroundColor: [
                                  "#ff3547",
                                  "#fec10b",
                                  "#6dce44",
                                ],
                              },
                            ],
                          }}
                          height={100}
                          width={100}
                        ></Pie>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Notifications;
