import { Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Iconify from 'src/components/iconify/Iconify'
import TaskList from 'src/sections/@dashboard/task/TaskList'

const TaskPage = () => {

  return (
    <>
    <Container>
    <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Task</Typography>

        <Link to="/dashboard/task/create">
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Task
          </Button>
          </Link>
        </Stack>

        <TaskList/>
    </Container>
    </>
  )
}

export default TaskPage