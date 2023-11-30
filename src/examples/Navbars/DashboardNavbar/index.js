/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link, useNavigate } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

import { ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Card, Modal, Space } from "antd";
const { confirm } = Modal;

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { Spin } from "antd";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";
import { useAppState } from "context/manageState";
import { Divider } from "@mui/material";
import MDButton from "components/MDButton";
import { message } from "antd";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useLogOut } from "hooks/useLogOut";
import { useUsers } from "hooks/useUsers";

function DashboardNavbar({ absolute, light, isMini, showButton, showBalance, balance }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const { logOutUser, isLoading: isLoggingOut } = useLogOut();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const route = useLocation().pathname.split("/").slice(1);

  const { getWalletBalance, walletLoading } = useAppState();

  const { currentUser, isLoading } = useCurrentUser();
  const { users, isLoadingUsers } = useUsers();

  const currentUserInfo = users?.filter((user) => user?.email === currentUser?.user.email).at(0);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);

  const handleCloseMenu = () => setOpenMenu(false);

  async function showDeleteConfirm() {
    confirm({
      title: "Are you sure to Log Out?",
      icon: <ExclamationCircleFilled />,
      content: "Your LMS Account will be temporary disabled.",
      okText: "Log Out",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        logOutUser();
      },
      onCancel() {},
    });
  }

  async function handleLogOut() {
    handleCloseMenu();
    showDeleteConfirm();
  }

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem
        icon={<Icon>account_circle</Icon>}
        title={isLoading ? "" : currentUserInfo?.userName}
      />
      <a href={`mailto:${currentUserInfo?.email}`} type="mail">
        <NotificationItem
          icon={<Icon>email</Icon>}
          title={isLoading ? "" : currentUserInfo?.email}
        />
      </a>
      <a href={`tel:${currentUserInfo?.phone}`} type="tel">
        <NotificationItem icon={<Icon>call</Icon>} title={currentUserInfo?.phone} />
      </a>
      <Divider></Divider>
      <NotificationItem icon={<Icon>logout</Icon>} title="Log Out" onClick={handleLogOut} />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  async function getBalance() {
    var status = await getWalletBalance();
    if (status == true) {
      success("Wallet balance updated");
    } else {
      error();
    }
  }
  let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <>
      <AppBar
        position={absolute ? "absolute" : navbarType}
        color="inherit"
        sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
      >
        <Toolbar sx={(theme) => navbarContainer(theme)}>
          <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
            <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
          </MDBox>
          {isMini ? null : (
            <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
              <div
                style={{
                  marginRight: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {showBalance && (
                  <Card
                    style={{
                      padding: "",
                      height: "2.8rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "w600",
                    }}
                  >
                    KES {dollarUSLocale.format(balance)}.00
                  </Card>
                )}

                {showButton && (
                  <MDButton onClick={getBalance}>{walletLoading ? <Spin /> : "Refresh"}</MDButton>
                )}
              </div>

              <MDBox color={light ? "white" : "inherit"}>
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  aria-controls="notification-menu"
                  aria-haspopup="true"
                  variant="contained"
                  onClick={handleOpenMenu}
                >
                  <Icon sx={iconsStyle}>account_circle</Icon>
                </IconButton>
                {renderMenu()}
              </MDBox>
            </MDBox>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
  showButton: false,
  showBalance: false,
  balance: "0",
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
  showButton: PropTypes.bool,
  showButton: PropTypes.bool,
  balance: PropTypes.string,
};

export default DashboardNavbar;
