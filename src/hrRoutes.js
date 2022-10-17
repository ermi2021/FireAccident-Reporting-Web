import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import ActiveAccidents from "views/ActiveAccidents.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import ResourceRequests from "views/ResourceRequests.js";
import ManageResources from "views/ManageResources.js";
import ManageUser from "views/ManageUser.js";
import UpgradeToPro from "views/Upgrade.js";
import ShowActiveDetails from "views/ShowActiveDetails";

var hrRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/hr",
  },
  {
    path: "/ManageUser",
    name: "Manage User",
    icon: "nc-icon nc-user-run",
    component: ManageUser,
    layout: "/hr",
  },

  {
    path: "/requests",
    name: "Resource Requests",
    icon: "nc-icon nc-pin-3",
    component: ResourceRequests,
    layout: "/hr",
  },
  {
    path: "/resources",
    name: "Manage Resources",
    icon: "nc-icon nc-pin-3",
    component: ManageResources,
    layout: "/hr",
  },
  {
    path: "/notifications",
    name: "Generate Report",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/hr",
  },
];
export default hrRoutes;
