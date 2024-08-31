import Pagination from '@mui/material/Pagination'
import Typography from '@mui/material/Typography'

const TablePaginationComponent = ({
                                    totalRecords,
                                    pageSize,
                                    currentPage,
                                    onPageChange
                                  }: {
  totalRecords?: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
}) => {
  const totalRecord = totalRecords || 0;
  const totalPages = Math.ceil(totalRecord / pageSize);

  // Calculate the range of records shown
  const startRecord = (currentPage - 1) * pageSize + 1
  const endRecord = Math.min(currentPage * pageSize, totalRecord)

  return (
    <div className='flex justify-between items-center flex-wrap pli-6 border-bs bs-auto plb-[12.5px] gap-2'>
      <Typography color='text.disabled'>
        {`Showing ${startRecord} to ${endRecord} of ${totalRecord} entries`}
      </Typography>
      <Pagination
        shape='rounded'
        color='primary'
        variant='tonal'
        count={totalPages}
        page={currentPage} // Use 1-based index for display
        onChange={(_, newPage) => onPageChange(newPage)} // Pass the newPage directly
        showFirstButton
        showLastButton
      />
    </div>
  )
}

export default TablePaginationComponent
