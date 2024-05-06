import { Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Iconify from 'src/components/iconify/Iconify'
import CategoryList from 'src/sections/@dashboard/project/ProjectList'

const ProjectPage = () => {

  return (
    <>
    <Container>
    <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4">Project</Typography>

        <Link to="/dashboard/project/create">
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Add Project
          </Button>
          </Link>
        </Stack>

        <CategoryList/>
    </Container>
    </>
  )
}

export default ProjectPage