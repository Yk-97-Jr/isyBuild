'use client'

// MUI Imports
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'

import CardHeader from '@mui/material/CardHeader'

import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'

import { CircularProgress } from '@mui/material'

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

import type { ProjectRead } from '@/services/IsyBuildApi'

interface Props {
  projectState: ProjectRead
  setProjectState: (value: ProjectRead) => void
  isLoading: boolean
  errors: any
}

const EditInformation = ({ projectState, errors, setProjectState, isLoading }: Props) => {
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
    content: projectState.description,
    onUpdate: ({ editor }) => {
      const newValue = editor.getText()

      setProjectState({ ...projectState, description: newValue })
    }
  })

  if (!projectState || isLoading) {
    return (
      <div className='flex justify-center items-center'>
        {' '}
        <CircularProgress />
      </div>
    )
  }

  //function handle Change Name

  function handleName(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setProjectState({ ...projectState, name: event.target.value })
    console.log(projectState.name)
  }

  function handleCode(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setProjectState({ ...projectState, code: event.target.value.toUpperCase() })
    console.log(projectState.code)
  }

  return (
    <>
      <Card>
        <CardHeader title='Information des Projet' />
        <CardContent>
          <Grid container spacing={6} className='mbe-6'>
            <Grid item xs={12}>
              <CustomTextField
                fullWidth
                label='Nom de Projet'
                placeholder='Construction ADL'
                value={projectState.name}
                onChange={handleName}
                error={!!errors.name}
                helperText={errors.name || ''}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomTextField
                fullWidth
                label='Code de Projet'
                placeholder='FXSK123U'
                value={projectState.code}
                onChange={handleCode}
                error={!!errors.code}
                helperText={errors.code || ''}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateField', 'DateField']}>
                  {/* <InputLabel className='py-1'>Pays/country</InputLabel> */}

                  <DateField
                    size='small'
                    label='Date'
                    className='mt-[13.8px] w-full'
                    value={projectState.start_date ? dayjs(projectState.start_date) : null}
                    onChange={newValue =>
                      setProjectState({ ...projectState, start_date: newValue ? newValue.toISOString() : null })
                    }
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Typography className='mbe-1'>Description (Optional)</Typography>
          <Card className='p-0 border shadow-none'>
            <CardContent className='p-0'>
              <EditorContent
                editor={editor}
                className='bs-[135px] overflow-y-auto flex '
                placeholder='Description'
                value={projectState.description}
              />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </>
  )
}

export default EditInformation
