/* eslint-disable react/prop-types */
// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

import { useAppState } from "context/manageState";
import { useCourses } from "hooks/useCourses";

function Dashboard({ currentUser }) {
  const { sales, tasks } = reportsLineChartData;

  const { isLoading, conductors, routes } = useAppState();

  let dollarUSLocale = Intl.NumberFormat("en-US");

  const { courses, loadingCourses } = useCourses();
  const totalRevenue = courses?.reduce((acc, curr) => Number(curr?.amount) + acc, 0);

  return (
    <DashboardLayout>
      <DashboardNavbar showButton={false} currentUser={currentUser} />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="book"
                title="No of courses"
                count={loadingCourses ? "0" : courses?.length}
                percentage={{
                  color: "success",
                  amount: "0%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="bookmark-add"
                title="Active Courses"
                count={isLoading ? "0" : conductors?.length}
                percentage={{
                  color: "success",
                  amount: "0%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="assignment"
                title="Assignments"
                count={isLoading ? "0" : routes?.length}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Revenue"
                count={`KES ${loadingCourses ? "0" : `${dollarUSLocale.format(totalRevenue)}.00`}`}
                percentage={{
                  color: "success",
                  amount: "0%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3} style={{ minHeight: "330px" }}>
                <ReportsBarChart
                  color="info"
                  title="Course insights"
                  description="Performance"
                  date="Analytics done 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3} style={{ minHeight: "330px" }}>
                <ReportsLineChart
                  color="success"
                  title="daily sales(Revenue)"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3} style={{ minHeight: "330px" }}>
                <ReportsLineChart
                  color="dark"
                  title="Assignments Insights"
                  description="Variation of assignments submited overtime"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
