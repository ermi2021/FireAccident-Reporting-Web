import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import ActiveAccidents from "views/ActiveAccidents.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import ShowActiveDetails from "views/ShowActiveDetails";

var mrRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/hr",
  },
  {
    path: "/activeAccidents",
    name: "Manage User",
    icon: "nc-icon nc-user-run",
    component: ActiveAccidents,
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
export default mrRoutes;
