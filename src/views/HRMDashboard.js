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
    // setLoading(true);
    getHelpRequests();
    getActiveAccidents();
    // setLoading(false);
  }, [activeAccidents, helpRequests]);

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-globe text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b>Active Accidents</b>
                      </p>
                      <CardTitle tag="p">{activeAccidents.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" />
                  Now
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b>Help Requests</b>
                      </p>
                      <CardTitle tag="p">{helpRequests.length}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="4" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">
                        <b>Closed Cases</b>
                      </p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> Today
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row style={{ backgroundColor: "white", marginTop: 50, padding: 30 }}>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Active Accident Status</CardTitle>
                <p className="card-category">Current Updates</p>
              </CardHeader>
              <CardBody style={{ height: "266px" }}>
                {/* <Pie
                  data={{
                    labels: ["Hard", "Being Controlled", "Under Control"],
                    datasets: [
                      {
                        label: "Active Accidents Current Status",
                        data: [20, 30, 40],
                        backgroundColor: ["#f6f6f6", "red", "green"],
                      },
                    ],
                    
                  }}
                  height={100}
                  width={100}
                  */}
                <h6 style={{ marginTop: 20 }}>
                  {" "}
                  {hardAccidents.length} Fire Accident with Hard Status!!{" "}
                </h6>
                <h6 style={{ marginTop: 20 }}>
                  {" "}
                  {beingControlledAccidents.length} Fire Accident with Being
                  Controlled Status!!{" "}
                </h6>
                <h6 style={{ marginTop: 20 }}>
                  {" "}
                  {controlledAccidents.length} Fire Accident with controlled
                  Status!!{" "}
                </h6>
              </CardBody>
              {/* <CardFooter>
                <div className="legend">
                  <i className="fa fa-circle text-primary" /> Opened{" "}
                  <i className="fa fa-circle text-warning" /> Read{" "}
                  <i className="fa fa-circle text-danger" /> Deleted{" "}
                </div>
                <hr />
              </CardFooter> */}
            </Card>
          </Col>
          <Col md="8">
            {/* <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">NASDAQ: AAPL</CardTitle>
                <p className="card-category">Line Chart with Points</p>
              </CardHeader>
              <CardBody>
                <Line
                  data={dashboardNASDAQChart.data}
                  options={dashboardNASDAQChart.options}
                  width={400}
                  height={100}
                />
              </CardBody>
              <CardFooter>
                <div className="chart-legend">
                  <i className="fa fa-circle text-info" /> Tesla Model S{" "}
                  <i className="fa fa-circle text-warning" /> BMW 5 Series
                </div>
                <hr />
                <div className="card-stats">
                  <i className="fa fa-check" /> Data information certified
                </div>
              </CardFooter>
  </Card>*/}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
