import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Card, Container, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, Slide, Stack, Switch, TextField, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateProject = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    leader: "",
    projectType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const res = await axios.post("http://localhost:8010/project/addproject", formData);
      if (res.data) {
        setOpen(true);
        setFormData({
          name: "",
          leader: "",
          projectType: "",
        });
      } else {
        alert("Project Not Added");
      }
      // console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">
            {" "}
            <Button sx={{ marginTop: "-5px", marginRight: "10px", marginLeft: "-5px" }} onClick={handleGoBack}>
              <KeyboardBackspaceIcon />
            </Button>
            Create a new Project
          </Typography>
        </Stack>

        <Box>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Stack>
                <Typography variant="h6">Details</Typography>
                <Typography variant="subtitle2" noWrap sx={{ color: "grey", fontWeight: "light" }}>
                  Project name, leader, type...
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
                    name="leader"
                    label="Leader"
                    fullWidth
                    value={formData.leader}
                    onChange={handleChange}
                  />
                  <TextField
                    name="projectType"
                    label="Type"
                    fullWidth
                    value={formData.projectType}
                    onChange={handleChange}
                  />

                  <LoadingButton size="large" variant="contained" onClick={handleClick}>
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
          Project Created Successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateProject;
