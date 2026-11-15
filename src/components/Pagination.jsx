
import { Pagination as MuiPagination, Box } from '@mui/material'

function Pagination({
  totalItems,
  itemsPerPage = 5,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  const handleChange = (event, value) => {
    onPageChange(value)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 3,
      }}
    >
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
      />
    </Box>
  )
}

export default Pagination
