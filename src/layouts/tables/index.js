/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";

import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ExclamationCircleFilled } from "@ant-design/icons";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
import { Checkbox, Divider, Spin } from "antd";
import { Button, Table, Modal } from "antd";
import moment from "moment";
import { formatDistanceFromNow } from "utils/helpers";
import styled from "styled-components";
import { Radio } from "antd";
import { useForm } from "react-hook-form";
import { useCreateCourse } from "hooks/useCreateCourse";
import { useCourses } from "hooks/useCourses";
import { useDeleteCourse } from "hooks/useDeleteCourse";
import { useCreateReport } from "hooks/useCreateReport";
import { v4 as uuidv4 } from "uuid";
import { useUpdateCourse } from "hooks/useUpdateCourse";
import { updateCourse } from "services/apiCourses";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.3rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    font-size: 1.3rem;
    /* padding: 0.4rem 0.6rem; */
    margin-right: 1.2rem;
    border-radius: 4px;
    border: none;
    color: whitesmoke;
    background-color: #323232;
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: #272626;
    }
  }
`;

const { confirm } = Modal;

async function showDeleteConfirm() {
  confirm({
    title: "Are you sure you want to Delete?",
    icon: <ExclamationCircleFilled />,
    content: "Your action is permanent and cannot be reversed.",
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk() {},
    onCancel() {},
  });
}

function Tables() {
  const { createReportAPI, isLoading: isCreatingReport } = useCreateReport();
  const { courses, loadingCourses } = useCourses();
  const [open, setOpen] = useState(false);
  const [showCert, setShowCert] = useState(false);
  const [showPay, setShowPay] = useState(true);
  const { createCourseApi, isLoading: loadingCourse } = useCreateCourse();
  const [value, setValue] = useState(1);
  const { deleteCourseAPI, isLoading: isDeletingCourse } = useDeleteCourse();
  const [editCourse, setEditCourse] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const { updatingCourse, isLoading: isEditingNewCourse } = useUpdateCourse();

  const { register, handleSubmit, reset, formState } = useForm();

  const { errors } = formState;

  const actionName = isEditing ? "Edit" : "Create";

  const onChange = (e) => {
    setValue(e.target.value);
    setShowPay(e.target.value === 1);
  };

  const columnsData = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      render: (data) => (
        <a target="_blank" rel="noreferrer" href={data}>
          {data.split("-")[1]}
        </a>
      ),
    },

    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Downloads",
      dataIndex: "downloads",
      key: "downloads",
    },
    {
      title: "Edit",
      dataIndex: "courseData",
      key: "courseData",
      render: (courseData) => (
        <Button
          onClick={() => {
            console.log(courseData);
            setIsEditing(true);
            setEditCourse(courseData);
            setOpen(true);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <Button
          danger
          style={{ color: "red" }}
          onClick={() => deleteCourseAPI(id)}
          disabled={isDeletingCourse}
        >
          Delete
        </Button>
      ),
    },
  ];

  const data = courses?.map((course, index) => ({
    key: index,
    id: course?.id,
    courseData: course,
    title: course?.title,
    category: course?.category,
    file: course?.courseFile,
    createdAt: formatDistanceFromNow(moment(course?.created_at).format("YYYY-MM-DDTHH:mm:ss")),
    description: course?.description,
    downloads: course?.downloads,
  }));

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleToggle(e) {
    setShowCert(e.target.checked);
  }

  function handleClose() {
    reset();
    setOpen(false);
    setEditCourse({});
    setIsEditing(false);
  }

  function onSubmit(data) {
    console.log(isEditing);
    if (!isEditing) {
      const newCourse = {
        ...data,
        courseFile: data.courseFile[0],
        cert: data?.cert?.length === 0 || data?.cert === undefined ? { name: "" } : data?.cert[0],
        downloads: 0,
        User: 1,
      };
      createCourseApi(newCourse, {
        onSettled: () => {
          reset();
          createReportAPI({
            title: `${newCourse?.title} Course`,
            desc: `Admin created - ${newCourse?.description}`,
            reportNumber: uuidv4(),
            status: true,
            User: 2,
          });
          setOpen(false);
        },
      });
    } else {
      const newEditCourse = {
        id: editCourse?.id,
        title: data?.title,
        description: data?.description,
        category: data?.category,
        amount: data?.amount,
      };

      updatingCourse(newEditCourse, {
        onSettled: () => {
          reset();
          setOpen(false);
          setIsEditing(false);
          setEditCourse({});
        },
      });
    }
  }

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox pt={6} pb={3}>
          <MDButton
            style={{ marginBottom: "23px", display: "flex", alignItems: "flex-end" }}
            onClick={handleClickOpen}
          >
            Add Course
          </MDButton>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <Table dataSource={data} columns={columnsData} />
            </Grid>
          </Grid>
        </MDBox>

        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>{isEditing ? "Edit a course" : "Create a course"} </DialogTitle>
          <DialogContent>
            <DialogContentText>Enter the information below to upload a course.</DialogContentText>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                {...register("title", { required: "This field is required" })}
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                style={{ marginTop: "1rem" }}
              />

              <div>
                <h5 style={{ marginTop: "1rem" }}>Description</h5>
                <textarea
                  style={{
                    width: "100%",
                    border: "1px solid black",
                    borderRadius: "4px",
                    minHeight: "4rem",
                  }}
                  {...register("description", { required: "This field is required" })}
                />
              </div>

              <div style={{ display: "flex-column", marginTop: "1.5rem" }}>
                <h5 style={{ marginTop: "1rem" }}>Category*</h5>
                <select style={{ width: "80%" }} {...register("category")}>
                  <option>Education</option>
                  <option>Science</option>
                  <option>Fiction</option>
                </select>
              </div>
              <Divider />
              <div>
                <h5 style={{ marginTop: "1rem" }}>Pricing</h5>
                <Radio.Group onChange={onChange} value={value}>
                  <Radio value={1}>Paid</Radio>
                  <Radio value={2}>Free</Radio>
                </Radio.Group>
              </div>

              {showPay && (
                <TextField
                  {...register("amount")}
                  margin="dense"
                  id="amount"
                  label="Amount(KES)"
                  type="number"
                  fullWidth
                  variant="outlined"
                  style={{ marginTop: "1rem" }}
                />
              )}

              {!isEditing && (
                <div style={{ marginTop: "1.5rem" }}>
                  <FileInput id="image" accept="*" {...register("courseFile")} />
                </div>
              )}

              {!isEditing && (
                <div style={{ marginTop: "1.5rem" }}>
                  <Checkbox onChange={(e) => handleToggle(e)}>
                    Include a certificate at the end of the course
                  </Checkbox>

                  {showCert && (
                    <div style={{ marginTop: "1.5rem" }}>
                      <FileInput id="image" accept="*" {...register("cert")} />
                    </div>
                  )}
                </div>
              )}
            </form>
          </DialogContent>
          <DialogActions>
            <MDButton onClick={handleClose}>Cancel</MDButton>
            <MDButton onClick={handleSubmit(onSubmit)}>
              {loadingCourse || isEditingNewCourse ? <Spin /> : actionName}
            </MDButton>
          </DialogActions>
        </Dialog>
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default Tables;
