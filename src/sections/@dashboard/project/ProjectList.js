import React, { useEffect, useState } from "react";
import { Card, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Button, Typography, IconButton, Popover, MenuItem, Box, Modal, Backdrop, CircularProgress, Grid, Checkbox, Stack } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import Iconify from "src/components/iconify/Iconify";
import Scrollbar from "src/components/scrollbar/Scrollbar";
import ProjectListHead from "./ProjectListHead";
import ProjectListToolbar from "./ProjectListToolbar";



const api = "http://localhost:8010/project";

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "leader", label: "Leader", alignRight: false },
  { id: "projectType", label: "Type", alignRight: false },
  { label: "Actions", alignCenter: true },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  textAlign: "center",
  p: 4,
};

const ProjectList = () => {
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  useEffect(() => {
    axios
      .get(`${api}/allproject`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (deleteUserId) => {
    try {
      await axios.delete(`${api}/deleteProject/${deleteUserId}`);
      setIsDeleteModalOpen(false);
      setOpenBackdrop(true);
      setTimeout(() => {
        setOpenBackdrop(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleOpenModal = () => {
    setIsDeleteModalOpen(true);
    setOpen(false);
  };

  const handleOpenMenu = (event, id) => {
    setOpen(event.currentTarget);
    setCategoryId(id);
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
      const newSelecteds = data.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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

  const filteredCate = data.filter((category) =>
    category.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <>
      <Card>
        <ProjectListToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <ProjectListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={data.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {filteredCate
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const {
                      _id,
                      name,
                      leader,
                      projectType,
                    } = row;
                    const selectedUser = selected.indexOf(_id) !== -1;

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
                            onChange={(event) => handleClick(event, _id)}
                          />
                        </TableCell>

                        <TableCell component="th" scope="row">
                          {name}
                        </TableCell>

                        <TableCell align="left">
                          {leader}
                        </TableCell>

                        <TableCell align="left">
                          {projectType}
                        </TableCell>

                        <TableCell align="center" style={{ width: "100px" }}>
                          <IconButton
                            size="large"
                            color="inherit"
                            onClick={(event) => handleOpenMenu(event, _id)}
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
        <Link to={`/dashboard/project/update/${categoryId}`}>
          <MenuItem>
            <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
            Edit
          </MenuItem>
        </Link>

        <MenuItem
          onClick={() => handleOpenModal()}
          sx={{ color: "error.main" }}
        >
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>



      <Modal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          <Iconify icon={"eva:trash-2-outline"} sx={{ mr: 2 }} />
          <Typography variant="h4">Are you sure ?</Typography>
          <Typography variant="p">
            Are you sure you want to remove this record ?
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            m={2}
          >
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              style={{ width: "150px", margin: "auto" }}
            >
              Close
            </Button>
            <Button
              onClick={() => handleDelete(categoryId)}
              variant="contained"
              sx={{
                width: "150px",
                margin: "auto",
              }}
            >
              Yes,Delete It!
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default ProjectList;
