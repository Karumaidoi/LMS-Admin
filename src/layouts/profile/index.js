// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import { useCurrentUser } from "hooks/useCurrentUser";
import { useUsers } from "hooks/useUsers";
import { Spinner } from "@material-tailwind/react";

function Overview() {
  const { currentUser, isLoading } = useCurrentUser();
  const { users, isLoadingUsers } = useUsers();

  const currentUserInfo = users?.filter((user) => user?.email === currentUser?.user?.email);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />

      {isLoading || isLoadingUsers ? (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      ) : (
        <>
          <Header image={currentUserInfo?.at(0).avatar ?? ""}>
            <MDBox mt={5} mb={3}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                  <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                  <ProfileInfoCard
                    title="profile information"
                    description={currentUserInfo?.at(0).description}
                    info={{
                      fullName: currentUserInfo?.at(0).userName,
                      mobile: currentUserInfo?.at(0).phone,
                      email: currentUserInfo?.at(0).email,
                      walletNo: "#231GBS",
                      location: "🇰🇪 KE",
                    }}
                    action={{ route: "", tooltip: "Edit Profile" }}
                    shadow={false}
                  />
                  <Divider orientation="vertical" sx={{ mx: 0 }} />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <PlatformSettings />
                </Grid>
              </Grid>
            </MDBox>
          </Header>
          <Footer />
        </>
      )}
    </DashboardLayout>
  );
}

export default Overview;
