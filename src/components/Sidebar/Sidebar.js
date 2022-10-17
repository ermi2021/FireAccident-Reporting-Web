import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
import Typography from "@material-ui/core/Typography";
import logo from "../../assets/img/fire_gif.gif";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color="white"
      data-active-color={props.activeColor}
    >
      <div className="logo" style={{ display: "flex", flexDirection: "row" }}>
        <img src={logo} alt="react-logo" style={{ width: 50, height: 50 }} />
        <div>
          <Typography
            variant="h5"
            color="inherit"
            style={{
              fontWeight: "700",
              marginTop: 20,
              marginBottom: 20,
              marginLeft: 20,
              textAlign: "center",
            }}
          >
            APLS <br />
            <span
              style={{
                fontSize: 13,
                fontWeight: "700",
                color: "tomato",
              }}
            >
              (Fire Accident V.)
            </span>
          </Typography>
        </div>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p style={{ fontWeight: "700", color: "black" }}>
                    {prop.name}
                  </p>
                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
