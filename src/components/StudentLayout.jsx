import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'


function StudentLayout() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f6fa' }}>
      <Navbar />

      <Box sx={{ display: 'flex' }}>
        

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            minWidth: 0,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default StudentLayout