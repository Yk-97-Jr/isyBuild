'use client'

// React Imports
import { useContext, useState } from 'react'

import { useParams } from 'next/navigation'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import { useDropzone } from 'react-dropzone'

import { SnackBarContext } from '@/contexts/SnackBarContextProvider'
import type { SnackBarContextType } from '@/types/apps/snackbarType'

// Third-party Imports


// Component Imports
import CustomAvatar from '@core/components/mui/Avatar'

// Styled Component Imports
import AppReactDropzone from '@/libs/styles/AppReactDropzone'

// API Hooks Imports
import { useProductMediaCreateMutation } from '@/services/IsyBuildApi'

// Types
import type { ProductMediaRequest } from '@/services/IsyBuildApi'

// Styled Dropzone Component
const Dropzone = styled(AppReactDropzone)(({ theme }) => ({
  '& .dropzone': {
    minHeight: 'unset',
    padding: theme.spacing(12),
    [theme.breakpoints.down('sm')]: {
      paddingInline: theme.spacing(5),
    },
    '&+.MuiList-root .MuiListItem-root .file-name': {
      fontWeight: theme.typography.body1.fontWeight,
    },
  },
}))

const ProductImage = () => {
  const params = useParams()
  const id = typeof params.id === 'string' ? params.id : '' // Ensure `id` is a string

  // States
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
 
  const { setOpenSnackBar, setInfoAlert } = useContext(SnackBarContext) as SnackBarContextType

  // API Mutation
  const [productMediaCreate, { isLoading}] = useProductMediaCreateMutation()

  // Hooks for Dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]) // Only keep the first file
      }
    },
  })

  const renderFilePreview = (file: File) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    } else {
      return <i className="tabler-file-description" />
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
  }

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected.')
      
return
    }

    if (!id) {
      console.error('Product ID is missing from the URL.')
      
return
    }

    const formData = new FormData()

    formData.append('image', file)
    formData.append('product', id)

    try {
      

      const response = await productMediaCreate({
        productMediaRequest: formData as unknown as ProductMediaRequest,
      }).unwrap()

      if (response?.media.at(-1)?.image) {
        setImageUrl(URL.createObjectURL(file))
        setOpenSnackBar(true)
        setInfoAlert({ severity: 'success', message: 'uploading image successfully!' })
      }
      
    } catch ( error: any ) {
      console.error('Error uploading image:', error)



      setOpenSnackBar(true)
      setInfoAlert({
        severity: 'error',
        message: error.response?.data?.message || 'Error uploading image:'
      })
    } finally {
      
    }
  }

  return (
    <Dropzone>
      <Card>
        <CardHeader
          title="produit  Image"
          sx={{ '& .MuiCardHeader-action': { alignSelf: 'center' } }}
        />
        <CardContent>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className="flex items-center flex-col gap-2 text-center">
              <CustomAvatar variant="rounded" skin="light" color="secondary">
                <i className="tabler-upload" />
              </CustomAvatar>
              <Typography variant="h4">Faites glisser et déposez votre image ici</Typography>
              <Typography color="text.disabled">ou</Typography>
              <Button variant="tonal" size="small">
              Parcourir le image
              </Button>
            </div>
          </div>
          {file ? (
            <List>
              <ListItem key={file.name} className="pis-4 plb-3">
                <div className="file-details">
                  <div className="file-preview">{renderFilePreview(file)}</div>
                  <div>
                    <Typography className="file-name font-medium" color="text.primary">
                      {file.name}
                    </Typography>
                    <Typography className="file-size" variant="body2">
                      {Math.round(file.size / 100) / 10 > 1000
                        ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
                        : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
                    </Typography>
                  </div>
                </div>
                <IconButton onClick={handleRemoveFile}>
                  <i className="tabler-x text-xl" />
                </IconButton>
              </ListItem>
            </List>
          ) : null}
          <div className="buttons mbe-3">
            {file && (
              <Button variant="contained" onClick={handleUpload} disabled={isLoading}>
                {isLoading ? 'Uploading...' : 'Upload File'}
              </Button>
            )}
          </div>
          {imageUrl  && (
  <List>
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 1,
        p: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Image Preview */}
        <img
          src={imageUrl}
          alt="Uploaded preview"
          style={{ width: '50px', height: '50px', borderRadius: '4px' }}
        />

        {/* File Name and Size */}
        <div>
          <Typography variant="body1" fontWeight="500">
            {file?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {((file?.size ?? 0) / 1024).toFixed(1)} kb
          </Typography>
        </div>
      </div>

      {/* Remove Button */}
      <IconButton onClick={() => {
        setFile(null);
        setImageUrl(null);
      }}>
        <i className="tabler-x text-xl" />
      </IconButton>
    </ListItem>
  </List>
)}


        </CardContent>
      </Card>
    </Dropzone>
  )
}

export default ProductImage 

