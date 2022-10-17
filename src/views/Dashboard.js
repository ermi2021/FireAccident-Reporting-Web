import React, { useEffect, useState } from "react";
// react plugin used to create charts
import { Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components

import firebase from "../API/firebase";

function Dashboard() {
  const [activeAccidents, setActiveAccidents] = useState([]);
  const [helpRequests, setHelps] = useState([]);
  const [hardAccidents, setHardAccidents] = useState([]);
  const [beingControlledAccidents, setBeingControlledAccidents] = useState([]);
  const [controlledAccidents, setControlledAccidents] = useState([]);
  const [activeFirefighter, setActiveFirefighter] = useState([]);
  const [offlineFirefighters, setOfflineFirefighter] = useState([]);
  function getBeingControlledActiveAccidents() {
    firebase
      .firestore()
      .collection("ActiveAccidents")
      .where("status", "==", "Being Controlled")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setBeingControlledAccidents(items);
      });
  }

  function getHardActiveAccidents() {
    firebase
      .firestore()
      .collection("ActiveAccidents")
      .where("status", "==", "hard")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setBeingControlledAccidents(items);
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
        setControlledAccidents(items);
      });
  }

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

  function getHelpRequests() {
    firebase
      .firestore()
      .collection("HelpRequests")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setHelps(items);
      });
  }

  function getActiveFireFighters() {
    firebase
      .firestore()
      .collection("Employees")
      .where("Role", "==", "FireFighter")
      .where("active", "==", true)
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setActiveFirefighter(items);
      });
  }
  function getOfflineFireFighters() {
    firebase
      .firestore()
      .collection("Employees")
      .where("Role", "==", "FireFighter")
      .where("active", "==", false)
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setOfflineFirefighter(items);
      });
  }
  useEffect(() => {
    getBeingControlledActiveAccidents();
  }, [beingControlledAccidents]);

  useEffect(() => {
    getControlledActiveAccidents();
  }, [controlledAccidents]);

  useEffect(() => {
    getHardActiveAccidents();
  }, [hardAccidents]);
  useEffect(() => {
    getActiveFireFighters();
  }, [activeFirefighter]);

  useEffect(() => {
    getOfflineFireFighters();
  }, [offlineFirefighters]);

  useEffect(() => {
    // setLoading(true);
    getHelpRequests();
    getActiveAccidents();
    // setLoading(false);
  }, [activeAccidents, helpRequests]);

  return (
    <>
      <div className="content">
        <Row style={{ marginTop: "5%" }}>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody
                style={{
                  height: "200px",
                  paddingTop: "10%",
                  paddingRight: "3%",
                }}
              >
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning"></div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontSize: 30,
                          }}
                        >
                          Active Accidents
                        </b>
                      </p>
                      <CardTitle tag="p">{activeAccidents.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats"></div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody
                style={{
                  height: "200px",
                  paddingTop: "10%",
                  paddingRight: "3%",
                }}
              >
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning"></div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontSize: 30,
                          }}
                        >
                          Help Requests
                        </b>
                      </p>
                      <CardTitle tag="p">{helpRequests.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats"></div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody
                style={{
                  height: "200px",
                  paddingTop: "10%",
                  paddingRight: "3%",
                }}
              >
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning"></div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontSize: 30,
                          }}
                        >
                          Closed Cases
                        </b>
                      </p>
                      <CardTitle tag="p">{}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats"></div>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <Row style={{ marginTop: "5%" }}>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody
                style={{
                  height: "200px",
                  paddingTop: "10%",
                  paddingRight: "3%",
                }}
              >
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning"></div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontSize: 30,
                          }}
                        >
                          Active FireFighters
                        </b>
                      </p>
                      <CardTitle tag="p" style={{ fontSize: 35 }}>
                        {activeFirefighter.length}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
          <Col lg="6" md="6" sm="6">
            <Card className="card-stats">
              <CardBody
                style={{
                  height: "200px",
                  paddingTop: "10%",
                  paddingRight: "3%",
                }}
              >
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning"></div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontSize: 30,
                          }}
                        >
                          Offline Firefighters
                        </b>
                      </p>
                      <CardTitle tag="p">
                        {offlineFirefighters.length}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
