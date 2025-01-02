import Typography from '@mui/material/Typography'

const LabeledData = ({ label, value }: { label: string; value: string | number }) => (
    <div className='flex items-center gap-4'>
      <div className='flex flex-wrap justify-between items-center gap-x-4 gap-y-1 is-full'>
        <div className='flex flex-col'>
          <Typography className='font-medium' color='text.primary'>
            {label}
          </Typography>
        </div>
        <Typography>{value}</Typography>
      </div>
    </div>
  )

  

  export default LabeledData