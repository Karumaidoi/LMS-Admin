import Dashboard from "layouts/dashboard";
import Tables2 from "layouts/tables";
import Notifications from "layouts/notifications";
import Conductors from "layouts/user";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Course Management",
    key: "courses",
    icon: <Icon fontSize="small">book</Icon>,
    route: "/courses",
    component: <Tables2 />,
  },
  {
    type: "collapse",
    name: "Students",
    key: "students",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/students",
    component: <Conductors />,
  },

  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    icon: <Icon fontSize="small">receipt</Icon>,
    route: "/reports",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: <Profile />,
  },

  {
    key: "sign-in",
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    key: "sign-up",
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
