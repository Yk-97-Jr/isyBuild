'use client'

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

interface ProjectInformationProps {
  Name: string
  setName: (value: string) => void
  code: string
  setCode: (value: string) => void
  date: Date
  setDate: (valeu: Date) => void
  description: string
  setDescription: (value: string) => void
  errors: any
}

const ProjectInformation = ({
  Name,
  setName,
  code,
  setCode,
  errors,
  setDate,
  description,
  setDescription
}: ProjectInformationProps) => {
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
    content: description,
    onUpdate: ({ editor }) => {
      const updatedDescription = editor.getText()

      setDescription(updatedDescription)
    }
  })

  function handleName(event: any) {
    event.preventDefault()
    setName(event.target.value)
    console.log(Name)
  }

  function handleCode(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()

    const value = event.target.value

    setCode(value.toUpperCase())
  }

  // const { isValid, error } = validateForm()

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
              error={!!errors.name}
              helperText={errors.name}
              onChange={e => handleName(e)}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <CustomTextField
              fullWidth
              label='Code de Projet'
              placeholder='FXSK123U'
              value={code}
              onChange={handleCode}
              error={!!errors.code}
              helperText={errors.code}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DateField', 'DateField']}>
                <DateField
                  defaultValue={dayjs(new Date())}
                  fullWidth
                  size='small'
                  label='Date'
                  className='mt-[13.8px]'
                  required={true}
                  onChange={(newValue: Dayjs | null) => setDate(newValue?.toDate() || new Date())}
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

export default ProjectInformation
