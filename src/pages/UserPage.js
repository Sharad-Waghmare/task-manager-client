import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Modal,
  Box,
  Link,
  InputAdornment,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Breadcrumbs,
  Grid,
  styled,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Label from "../components/label";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
import axios from "axios";

const api = "http://localhost:8010/user";

const TABLE_HEAD = [
  { id: "username", label: "Username", alignRight: false },
  { id: "email", label: "Email", alignRight: false },
  { id: "contact", label: "Contact", alignRight: false },
  { id: "role", label: "Role", alignRight: false },
  { label: "Actions", alignCenter: true },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) =>
        _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  pt: 2,
  px: 4,
  pb: 3,
};

export default function UserPage() {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("username");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  const [deleteUserId, setDeleteUserId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [editUserId, setEditUserId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${api}/allUser`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`${api}/delete/${deleteUserId}`);
      setIsDeleteModalOpen(false);
      setDeleteUserId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleOpenModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(
    data,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  const [showPassword, setShowPassword] = useState(false);

  const DetialDiv = styled("div")({
    padding: "20px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    height: "150px",
    backgroundColor:"#F3F6F9"
  });

  const activeUserLength = data.filter(
    (user) => user.role === "Active"
  ).length;
  const inactiveUserLength = data.filter(
    (user) => user.role === "Inactive"
  ).length;

  return (
    <>
      <Helmet>
        <title>User | Minimal UI</title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Typography variant="h4" gutterBottom>
            USERS LIST
          </Typography>

          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="/">
              USERS
            </Link>
            <Typography color="text.primary">List</Typography>
          </Breadcrumbs>
        </Stack>

        <Stack mb={2}>
          <Grid container>
            <Grid item xs={12} sm={6} md={3} p={1}>
              <DetialDiv style={{ backgroundColor: '#FFF7CC' }}>
                <Typography variant="h3" sx={{color:"#7B4F00"}}>{data.length}</Typography>
                <Typography variant="subtitle2" sx={{color:"#A07E43"}}>TOTAL USERS</Typography>
              </DetialDiv>
            </Grid>
            <Grid item xs={12} sm={6} md={3} p={1}>
              <DetialDiv style={{ backgroundColor: '#D2E9FC' }}>
                <Typography variant="h3" sx={{color:"#061B64"}}>{activeUserLength}</Typography>
                <Typography variant="subtitle2" sx={{color:"#40548F"}}>ACTIVE USERS</Typography>
              </DetialDiv>
            </Grid>
            <Grid item xs={12} sm={6} md={3} p={1}>
              <DetialDiv style={{ backgroundColor: '#FFE7D9' }}>
                <Typography variant="h3" sx={{color:"#7A0B2E"}}>{inactiveUserLength}</Typography>
                <Typography variant="subtitle2" sx={{color:"#7A0B2E"}}>UNACTIVE USERS</Typography>
              </DetialDiv>
            </Grid>
            <Grid item xs={12} sm={6} md={3} p={1}>
              <DetialDiv p={2}>
                <Box 
                 style={{
                  borderRadius:4,
                  backgroundColor:'#FFFFFF',
                  height:"100%"
                 }}
                 >
                </Box>
              </DetialDiv>
            </Grid>
          </Grid>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const {
                        _id,
                        username,
                        email,
                        contact,
                        role,
                        createdAt,
                      } = row;
                      const selectedUser = selected.indexOf(username) !== -1;

                      const dateObject = new Date(createdAt);
                      const options = {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      };
                      const formattedDate = dateObject.toLocaleString(
                        "en-US",
                        options
                      );

                      return (
                        <TableRow
                          hover
                          key={index}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, username)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={username} />
                              <Typography variant="subtitle2" noWrap>
                                {username}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{email}</TableCell>

                          <TableCell align="left">{contact}</TableCell>

                          <TableCell align="left">
                            <Label
                              color={
                                (role === "banned" && "error") ||
                                "success"
                              }
                            >
                              {sentenceCase(role)}
                            </Label>
                          </TableCell>

                          <TableCell align="center" style={{ width: "100px" }}>
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={handleOpenMenu}
                            >
                              <Iconify icon={"eva:more-vertical-fill"} />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            "& .MuiMenuItem-root": {
              px: 1,
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => handleOpenEditModal()}>
          <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => handleOpenModal()}
          sx={{ color: "error.main" }}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>

      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box sx={{ ...style, width: 500 }}>
          <h2>Edit</h2>
          <Stack spacing={3}>
            <TextField name="Name" label="Username" />
            <TextField name="email" label="Email address" />
            <TextField name="contact" label="Contact" />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Status"
                // onChange={handleChange}
              >
                <MenuItem value={"Active"}>Active</MenuItem>
                <MenuItem value={"Banned"}>Banned</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          <Stack p={2}></Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Update
          </LoadingButton>
        </Box>
      </Modal>

      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2>Confirm</h2>
          <p>Delete ?</p>
          <Button onClick={handleDelete}>Delete</Button>
          <Button
            onClick={() => setIsDeleteModalOpen(false)}
            style={{ marginLeft: "auto" }}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}
