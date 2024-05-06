import React, { useState, useEffect } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Slide,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleGoBack = () => {
    navigate(-1);
  };

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    leader: "",
    projectType: "",
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8010/project/singleProject/${id}`
        );
        const { name, leader, projectType } = res.data.data;
        setFormData({ name, leader, projectType });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProject();
  }, [id]);

  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClick = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8010/project/updateProject/${id}`,
        formData
      );
      console.log(res.data);
      if (res.data) {
        setOpen(true);
        setFormData({ name: "", leader: "", projectType: "" });
      } else {
        alert("Category Not Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = !formData.name && !formData.leader && !formData.projectType;

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
            Update Project
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
                  Title, short description, image...
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
                    label="Project Type"
                    fullWidth
                    value={formData.projectType}
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
          Category Updated Successfully
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateProject;
