'use client'

import { useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'


import type { Dayjs } from 'dayjs'

import dayjs from 'dayjs'

import { DemoContainer } from '@mui/x-date-pickers/internals/demo'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { DateField } from '@mui/x-date-pickers/DateField'


// Third-party Imports
import { useEditor, EditorContent } from '@tiptap/react'

import { StarterKit } from '@tiptap/starter-kit'

import { Underline } from '@tiptap/extension-underline'

import { Placeholder } from '@tiptap/extension-placeholder'

import { TextAlign } from '@tiptap/extension-text-align'


// Components Imports
import CustomTextField from '@core/components/mui/TextField'

// Style Imports
import '@/libs/styles/tiptapEditor.css'


interface EditInformationProps {
  projectState: any
  setProjectState: any
  errors: any
}

const EditInformation = ({ projectState, setProjectState, errors }: EditInformationProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write something here...'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    content: '',
    onUpdate: ({ editor }) => {

      const updatedDescription = editor.getText()

      handleDescription(updatedDescription)
    }
  })

  useEffect(() => {
    // Display loading state if projectState is null
    if (!projectState) {
      return
    }
  }, [projectState])

  // Ensure projectState exists before accessing properties
  if (!projectState) {
    return <div>Loading....</div>
  }

  function handleCode(event: React.ChangeEvent<HTMLInputElement>) {

    const value = event.target.value

    setProjectState({
      ...projectState,
      code: value
    })
  }

  function handleDate(newValue: Dayjs | null) {
    if (newValue) {
      setProjectState({
        ...projectState,
        start_date: newValue.toISOString()
      })
    }
  }

  function handleDescription(content: string) {

    setProjectState({
      ...projectState,
      description: content
    })

    console.log(projectState.description)

  }

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {

    const value = event.target.value
    
    setProjectState((prevState: any) => ({
      ...prevState,
      name: value
    }))
    console.log(projectState.name)
  }

  return (
    <Card>
      <CardHeader title='Information des Projet' />
      <CardContent>
        <Grid container spacing={6} className='mbe-6'>
          <Grid item xs={12}>
            <CustomTextField
              fullWidth
              label='Nom de Projet'
              placeholder='Construction ADL'
              value={projectState.name || ''}
              error={!!errors.name}
              helperText={errors.name}
              onChange={handleName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Code de Projet'
              placeholder='FXSK123U'
              value={projectState.code || ''}
              onChange={handleCode}
              error={!!errors.code}
              helperText={errors.code}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateField', 'DateField']}>
                <DateField
                  value={dayjs(projectState.start_date)}
                  fullWidth
                  size='small'
                  label='Date'
                  className='mt-[13.8px]'
                  required={true}
                  onChange={handleDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Typography className='mbe-1'>Description (Optional)</Typography>
        <Card className='p-0 border shadow-none'>
          <CardContent className='p-0'>
            <EditorContent editor={editor} className='bs-[135px] overflow-y-auto flex ' placeholder='Description' />
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

export default EditInformation
