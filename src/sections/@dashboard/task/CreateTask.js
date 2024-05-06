import React, { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Snackbar,
  Slide,
  Stack,
  TextField,
  Typography,
  Select,
  InputLabel,
  MenuItem
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateTask = () => {
  const navigate = useNavigate();

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
    subtasks: [],
    projectId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handling changes in subtasks
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
      const res = await axios.post(
        "http://localhost:8010/task/addTask",
        formData
      );
      if (res.data) {
        setOpen(true);
        setFormData({
          name: "",
          description: "",
          assignee: "",
          dueDate: "",
          priority: "",
          status: "",
          subtasks: [],
          projectId: "",
        });
      } else {
        alert("Project Not Added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
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
              sx={{ marginTop: "-5px", marginRight: "10px", marginLeft: "-5px" }}
              onClick={handleGoBack}
            >
              <KeyboardBackspaceIcon />
            </Button>
            Create a new Task
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

                  <InputLabel id="projectId-label">Select ProjectId</InputLabel>
                  <Select
                    labelId="projectId-label"
                    id="projectId-select"
                    value={formData.projectId}
                    onChange={handleChange}
                    name="projectId"
                    label="projectId"
                  >
                    {projectData.map((elem) => (
                      <MenuItem key={elem._id} value={elem._id}>
                        {elem.name}
                      </MenuItem>
                    ))}
                  </Select>

                  <LoadingButton
                    size="large"
                    variant="contained"
                    onClick={handleClick}
                  >
                    Create
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={Slide}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", backgroundColor: "green", color: "#fff" }}
        >
          Task Created Successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateTask;
