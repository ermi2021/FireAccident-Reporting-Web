import React, { useEffect, useState, Component } from "react";
import { Link, useLocation } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from "reactstrap";
import firebase from "API/firebase";
import hrRoutes from "hrRoutes.js";
import { Redirect, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { FaUserAlt } from "react-icons/fa";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
function Header(props) {
  const history = useHistory();
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const [requests, setResourceRequest] = useState([]);
  const [openLogOutAlert, setOpenAlert] = React.useState(false);
  function getResourceRequests() {
    firebase
      .firestore()
      .collection("ResourceRequests")
      .get()
      .then((item) => {
        const items = item.docs.map((doc) => doc.data());
        setResourceRequest(items);
      });
  }
  const handleDeleteClose = () => {
    setOpenAlert(false);
  };
  useEffect(() => {
    getResourceRequests();
  }, [requests]);

  const sidebarToggle = React.useRef();
  const location = useLocation();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };
  const logOut = () => {
    localStorage.clear();
    history.push("/");
  };
  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen);
  };
  const getBrand = () => {
    let brandName = "Default Brand";
    hrRoutes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  return (
    <>
      <Dialog
        open={openLogOutAlert}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are You Sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure Of logging out!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={logOut} color="primary">
            Continue
          </Button>
          <Button onClick={handleDeleteClose} color="secondary" autoFocus>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Navbar
        color={
          props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : color
        }
        expand="lg"
        className={
          props.location.pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={sidebarToggle}
                className="navbar-toggler"
                onClick={() => openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse isOpen={isOpen} navbar className="justify-content-end">
            <Nav navbar>
              <NavItem style={{ marginRight: 50, paddingTop: 10 }}>
                <Badge badgeContent={requests.length} color="error">
                  <h6 style={{ fontSize: 16 }}>Resource Requests </h6>
                </Badge>
              </NavItem>
              {"   "}
              <NavItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={() => {
                    setOpenAlert(true);
                  }}
                >
                  <FaUserAlt style={{ marginRight: 10 }} /> Log Out
                </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
