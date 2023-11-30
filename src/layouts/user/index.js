// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { Table, Button } from "antd";
import { useUsers } from "hooks/useUsers";
import { formatDistanceFromNow } from "utils/helpers";
import moment from "moment";
import { useDeleteUser } from "hooks/useDeleteUser";

export default function Conductors() {
  const { users, isLoadingUsers } = useUsers();
  const { deleteUserAPI, isLoading } = useDeleteUser();

  const allUsers = users?.filter((user) => user?.isAdmin === false);

  const data = allUsers?.map((user, index) => ({
    key: index,
    id: user?.id,
    name: user.userName,
    emailAddress: user.email,
    phone: user.phone,
    date: formatDistanceFromNow(moment(user?.created_at).format("YYYY-MM-DDTHH:mm:ss")),
    address: user?.address ?? "Not Found",
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Date Joined",
      dataIndex: "date",
      key: "date",
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          danger
          style={{ color: "red" }}
          onClick={() => deleteUserAPI(id)}
          disabled={isLoading}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Table dataSource={data} columns={columns} />
            </Grid>
          </Grid>
        </MDBox>

        <Footer />
      </DashboardLayout>
    </>
  );
}
