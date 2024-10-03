'use client'
import { useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'

import { FormHelperText, InputLabel } from '@mui/material'

import MenuItem from '@mui/material/MenuItem'

// Components Imports

import CustomTextField from '@core/components/mui/TextField'

// Style Imports

import '@/libs/styles/tiptapEditor.css'

// const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
//   if (!editor) {
//     return null
//   }

//   return (
//     <div className='flex flex-wrap gap-x-3 gap-y-1 pbs-6 pbe-4 pli-6'>
//       <CustomIconButton
//         {...(editor.isActive('bold') && { color: 'primary' })}
//         variant='tonal'
//         size='small'
//         onClick={() => editor.chain().focus().toggleBold().run()}
//       >
//         <i className={classnames('tabler-bold', { 'text-textSecondary': !editor.isActive('bold') })} />
//       </CustomIconButton>
//       <CustomIconButton
//         {...(editor.isActive('underline') && { color: 'primary' })}
//         variant='tonal'
//         size='small'
//         onClick={() => editor.chain().focus().toggleUnderline().run()}
//       >
//         <i className={classnames('tabler-underline', { 'text-textSecondary': !editor.isActive('underline') })} />
//       </CustomIconButton>
//       <CustomIconButton
//         {...(editor.isActive('italic') && { color: 'primary' })}
//         variant='tonal'
//         size='small'
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//       >
//         <i className={classnames('tabler-italic', { 'text-textSecondary': !editor.isActive('italic') })} />
//       </CustomIconButton>
//       <CustomIconButton
//         {...(editor.isActive('strike') && { color: 'primary' })}
//         variant='tonal'
//         size='small'
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//       >
//         <i className={classnames('tabler-strikethrough', { 'text-textSecondary': !editor.isActive('strike') })} />
//       </CustomIconButton>
//       <CustomIconButton
//         {...(editor.isActive({ textAlign: 'left' }) && { color: 'primary' })}
//         variant='tonal'
//         size='small'
//         onClick={() => editor.chain().focus().setTextAlign('left').run()}
//       >
//         <i
//           className={classnames('tabler-align-left', { 'text-textSecondary': !editor.isActive({ textAlign: 'left' }) })}
//         />
//       </CustomIconButton>
//       <CustomIconButton
//         {...(editor.isActive({ textAlign: 'center' }) && { color: 'primary' })}
//         variant='tonal'
//         size='small'
//         onClick={() => editor.chain().focus().setTextAlign('center').run()}
//       >
//         <i
//           className={classnames('tabler-align-center', {
//             'text-textSecondary': !editor.isActive({ textAlign: 'center' })
//           })}
//         />
//       </CustomIconButton>
//       <CustomIconButton
//         {...(editor.isActive({ textAlign: 'right' }) && { color: 'primary' })}
//         variant='tonal'
//         size='small'
//         onClick={() => editor.chain().focus().setTextAlign('right').run()}
//       >
//         <i
//           className={classnames('tabler-align-right', {
//             'text-textSecondary': !editor.isActive({ textAlign: 'right' })
//           })}
//         />
//       </CustomIconButton>
//       <CustomIconButton
//         {...(editor.isActive({ textAlign: 'justify' }) && { color: 'primary' })}
//         variant='tonal'
//         size='small'
//         onClick={() => editor.chain().focus().setTextAlign('justify').run()}
//       >
//         <i
//           className={classnames('tabler-align-justified', {
//             'text-textSecondary': !editor.isActive({ textAlign: 'justify' })
//           })}
//         />
//       </CustomIconButton>
//     </div>
//   )
// }

interface AddressInfoProps {
  pays: string
  setPays: (value: string) => void
  RoadNumber: string
  setRoadNumber: (value: string) => void
  RoadName: string
  setRoadName: (value: string) => void
  departement: string
  setDepartement: (value: string) => void
  ville: string
  setVille: (value: string) => void
  codePostal: number
  setCodePostal: (value: number) => void
  errors: any
}

const AddressInfo = ({
  pays,
  setPays,
  RoadNumber,
  setRoadNumber,
  RoadName,
  setRoadName,
  departement,
  setDepartement,
  ville,
  
  setVille,

  // codePostal,

  setCodePostal,
  errors
}: AddressInfoProps) => {
  const handleDepartement = (event: any) => {
    const value = event.target.value

    setDepartement(value)

    console.log('Departement:', value)
  }

  const handleVille = (event: any) => {
    const value = event.target.value

    setVille(value)

    console.log('Ville:', value)
  }

  const handleCodePostal = (event: any) => {
    const value = event.target.value

    setCodePostal(Number(value))

    console.log('Code Postal:', value)
  }

  const handlePays = (event: SelectChangeEvent) => {
    event.preventDefault()

    const value = event.target.value

    setPays(value)
  }

  const handleRoadNumber = (event: any) => {
    event.preventDefault()

    const value = event.target.value

    setRoadNumber(value)
  }

  const hanleRoadName = (event: any) => {
    const value = event.target.value

    setRoadName(value)
  }

  useEffect(() => {
    console.log(pays)
  }, [pays, RoadNumber, RoadName, RoadName])

  return (
    <Card>
      <CardHeader title='Address ' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <InputLabel className='py-1'>Pays/country</InputLabel>
            <Select value={pays} onChange={handlePays} className='w-full' displayEmpty error={!!errors.pays}>
              <MenuItem value='' disabled>
                Select a country
              </MenuItem>
              <MenuItem value='FR'>France</MenuItem>
              <MenuItem value='DZ'>Algeria</MenuItem>
            </Select>
            {errors && <FormHelperText className='text-red-500'>{errors.pays}</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Numero de Rue'
              placeholder='Numero de Rue'
              onChange={handleRoadNumber}
              error={!!errors.roadNumber}
              helperText={errors.roadNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Nom de Rue'
              placeholder='Nom de Rue'
              onChange={hanleRoadName}
              error={!!errors.roadName}
              helperText={errors.roadName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Departement'
              placeholder='Departement'
              value={departement}
              onChange={handleDepartement}
              error={!!errors.departement}
              helperText={errors.departement}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Ville'
              placeholder='Ville'
              value={ville}
              onChange={handleVille}
              error={!!errors.ville}
              helperText={errors.ville}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Code Postal'
              placeholder='Code Postal'
              type='number'
              onChange={handleCodePostal}
              error={!!errors.codePostal}
              helperText={errors.codePostal}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default AddressInfo
