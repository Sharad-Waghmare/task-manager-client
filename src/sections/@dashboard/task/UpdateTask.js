import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Grid,
  MenuItem,
  Select,
  Snackbar,
  Slide,
  Stack,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    assignee: "",
    dueDate: "",
    priority: "",
    status: "",
    subtasks: [], // Initialize as an empty array
    projectId: "",
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8010/task/singleTask/${id}`
        );
        const { name, description, assignee, dueDate, priority, status, subtasks, projectId } = res.data.data[0]; // No need for [0]
        setFormData({ name, description, assignee, dueDate, priority, status, subtasks, projectId });
      } catch (error) {
        console.log(error);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubtaskChange = (e, index, field) => {
    const newSubtasks = [...formData.subtasks];
    newSubtasks[index] = { ...newSubtasks[index], [field]: e.target.value };
    setFormData({ ...formData, subtasks: newSubtasks });
  };

  const handleAddSubtask = () => {
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, { name: "", completed: "pending" }],
    });
  };

  const handleRemoveSubtask = (index) => {
    const newSubtasks = [...formData.subtasks];
    newSubtasks.splice(index, 1);
    setFormData({ ...formData, subtasks: newSubtasks });
  };
  
  const handleClick = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8010/task/updateTask/${id}`,
        formData
      );
      console.log(res.data);
      if (res.data) {
        setOpen(true);
      } else {
        alert("Task Not Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getProject();
  }, []);

  const getUser = () => {
    axios
      .get(`http://localhost:8010/user/allUser`)
      .then((res) => {
        setUserData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProject = () => {
    axios
      .get(`http://localhost:8010/project/allproject`)
      .then((res) => {
        
        setProjectData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isLoading = !formData.name && !formData.description && !formData.assignee && !formData.dueDate && !formData.priority && !formData.status && !formData.subtasks && !formData.projectId;

  return (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">
            {" "}
            <Button
              sx={{
                marginTop: "-5px",
                marginRight: "10px",
                marginLeft: "-5px",
              }}
              onClick={handleGoBack}
            >
              <KeyboardBackspaceIcon />
            </Button>
            Update Task
          </Typography>
        </Stack>

        <Box>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Stack>
                <Typography variant="h6">Details</Typography>
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{ color: "grey", fontWeight: "light" }}
                >
                  name, description, assignee, dueDate, priority, status, subtasks, projectId
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={8}>
              <Card>
                <Stack spacing={3} p={3}>
                  <TextField
                    name="name"
                    label="Name"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <TextField
                    name="description"
                    label="Description"
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
                  />

                  <InputLabel id="assignee-label">Select Assignee</InputLabel>
                  <Select
                    labelId="assignee-label"
                    id="assignee-select"
                    value={formData.assignee}
                    onChange={handleChange}
                    name="assignee"
                    label="assignee"
                  >
                    {userData.map((elem) => (
                      <MenuItem key={elem._id} value={elem._id}>
                        {elem.username}
                      </MenuItem>
                    ))}
                  </Select>

                  <TextField
                    name="dueDate"
                    label="Due Date"
                    type="date"
                    fullWidth
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                  <TextField
                    name="priority"
                    label="Priority"
                    fullWidth
                    value={formData.priority}
                    onChange={handleChange}
                  />
                  <TextField
                    name="status"
                    label="Status"
                    fullWidth
                    value={formData.status}
                    onChange={handleChange}
                  />
                  <Box>
                    <Typography variant="h6">Subtasks</Typography>
                    {formData.subtasks.map((subtask, index) => (
                      <div key={index}>
                        <TextField
                          label={`Subtask ${index + 1}`}
                          fullWidth
                          value={subtask.name}
                          onChange={(e) => handleSubtaskChange(e, index, "name")}
                        />
                        <InputLabel id={`subtask-completed-label-${index}`}>
                          Subtask {index + 1} Status
                        </InputLabel>
                        <Select
                          labelId={`subtask-completed-label-${index}`}
                          id={`subtask-completed-select-${index}`}
                          value={subtask.completed}
                          onChange={(e) => handleSubtaskChange(e, index, "completed")}
                          fullWidth
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="in progress">In Progress</MenuItem>
                          <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                        <Button onClick={() => handleRemoveSubtask(index)}>Remove</Button>
                      </div>
                    ))}
                    <Button onClick={handleAddSubtask}>Add Subtask</Button>
                  </Box>
                  <TextField
                    name="projectId"
                    label="Project ID"
                    fullWidth
                    value={formData.projectId}
                    onChange={handleChange}
                  />
                </Stack>
              </Card>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleClick}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress size={24} /> : "Update"}
                </LoadingButton>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        TransitionComponent={Slide}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: "green",
            color: "#fff",
          }}
        >
          Task Updated Successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateTask;
