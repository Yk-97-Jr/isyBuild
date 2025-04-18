'use client'

// React Imports

// MUI Imports
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import {styled} from '@mui/material/styles'
import type {BoxProps} from '@mui/material/Box'

// Third-party Imports
import {useDropzone} from 'react-dropzone'

// Component Imports

import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import AppReactDropzone from '@/libs/styles/AppReactDropzone'

type FileProp = {
  name: string
  type: string
  size: number
}

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)<BoxProps>(({theme}) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5)
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight
    }
  }
}))

type Props = {
  files: File[]; // An array of File objects
  setFiles: (files: File[]) => void; // A function that updates the files array
};

const AddFileUpload: React.FC<Props> = ({files, setFiles}) => {

  // Hooks
  const {getRootProps, getInputProps} = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      setFiles(acceptedFiles.map((file: File) => Object.assign(file)))
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)}/>
    } else {
      return <i className='tabler-file-description'/>
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)

    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp) => (
    <ListItem key={file.name} className='pis-4 plb-3'>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name font-medium' color='text.primary'>
            {file.name}
          </Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <i className='tabler-x text-xl'/>
      </IconButton>
    </ListItem>
  ))

  return (
    <Dropzone>
      {/* Title without Card */}
      <Typography variant='h5' gutterBottom>
        Fichier
      </Typography>

      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div className='flex items-center flex-col gap-2 text-center'>
          <CustomAvatar variant='rounded' skin='light' color='secondary'>
            <i className='tabler-upload'/>
          </CustomAvatar>
          <Typography variant='h4'>Drag and Drop Your Image Here.</Typography>
          <Typography color='text.disabled'>or</Typography>
          <Button variant='tonal' size='small'>
            parcourire un fichier
          </Button>
        </div>
      </div>

      {/* File list and actions */}
      {files.length ? (
        <>
          <List>{fileList}</List>
          {/*<div className='buttons'>*/}
          {/*  <Button color='error' variant='tonal' onClick={handleRemoveAllFiles}>*/}
          {/*    Remove All*/}
          {/*  </Button>*/}
          {/*  <Button variant='contained'>Upload Files</Button>*/}
          {/*</div>*/}
        </>
      ) : null}
    </Dropzone>

  )
}

export default AddFileUpload
