import { useState, useEffect } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { Spin, Table, Result, Button } from "antd";
import { useAppState } from "context/manageState";
import moment from "moment";
import { formatDistanceFromNow } from "utils/helpers";
import { useCourses } from "hooks/useCourses";
import { useReports } from "hooks/useReports";
import { useDeleteReport } from "hooks/useDeleteReport";

function Notifications() {
  const { courses, loadingCourses } = useCourses();
  const { reports, loadingReports } = useReports();
  const { deleteReportAPI, isDeletingReport } = useDeleteReport();
  console.log(reports);

  const totalRevenue = courses?.reduce((acc, curr) => Number(curr?.amount) + acc, 0);

  const data = reports?.map((report, index) => ({
    key: index,
    id: report?.id,
    reportNum: report?.reportNumber.split("-")[0],
    status: report?.status === true ? "Completed" : "Pending",
    title: report?.title,
    accountNumber: report?.payer_ac_number,
    createdBy: report?.Users?.userName,
    createdAt: formatDistanceFromNow(moment(report?.created_at).format("YYYY-MM-DDTHH:mm:ss")),
  }));

  const columnsData = [
    {
      title: "Report No",
      dataIndex: "reportNum",
      key: "reportNum",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          danger
          style={{ color: "red" }}
          onClick={() => deleteReportAPI(id)}
          disabled={isDeletingReport}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar showBalance={true} balance={totalRevenue} />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Table dataSource={data} columns={columnsData} />
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
