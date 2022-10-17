import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ProtectedRoute } from "ProtectedRoute";
import { ManProtected } from "ManProtected";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import HRLayout from "layouts/HR.js";
import Login from "layouts/Login.js";
import ManagerLayout from "layouts/Manager.js";
ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <ProtectedRoute path="/admin" component={AdminLayout} />
      <ManProtected path="/hr" component={HRLayout} />

      <Route path="/login" component={Login} />

      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
