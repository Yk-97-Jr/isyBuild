/* eslint-disable import/no-named-as-default */

// import Card from '@mui/material/Card'
import { Card, CardHeader, CardContent, Typography, CircularProgress } from '@mui/material'

import { EditorContent, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'

import Placeholder from '@tiptap/extension-placeholder'

import TextAlign from '@tiptap/extension-text-align'

import Underline from '@tiptap/extension-underline'


import type { ProjectRead } from '@/services/IsyBuildApi'

interface DetialsProps {
  projectState: ProjectRead
  setProjectState: (value: ProjectRead) => void
  isLoading: boolean
}

function Details({ projectState, isLoading }: DetialsProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: ''
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline
    ],
    content: ''
  })

  if (!projectState || !projectState.client || isLoading) {
    return (
      <div className='flex justify-center items-center'>
        <CircularProgress />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader title='Détails De Projet' />
      <CardContent className='flex flex-col gap-3'>
        <Typography variant='h6' className='mt-4 ' fontWeight='normal'>
          <div className=' flex gap-1'>
            <strong>Client:</strong>
            {projectState.client.name}
          </div>
        </Typography>
        <>
          <Typography variant='h6' fontWeight='normal'>
            <div className='flex gap-1'>
              <strong>Status:</strong>
              {projectState.status}
            </div>
          </Typography>
          {/* <Typography variant='h6' fontWeight='normal'>
            <div className='flex gap-2'>
              <strong>Niveau de Risque:</strong>
              {projectState.risk_level}
            </div>
          </Typography>
          <div className='flex w-full items-center  gap-2'>
            <Typography variant='h6' fontWeight='normal'>
              <strong>Progress:</strong>
            </Typography>
            <div className=' w-full  px-2'>
              <LinearProgress
                variant='determinate'
                className='w-full px-4  h-3 mt-1'
                value={Number(projectState.percentage_complete) }
              />
            </div>
          </div> */}
        </>
        <div className='mt-2'>
          <Typography>Note:</Typography>
          <Card className='p-0 border shadow-none'>
            <CardContent className='p-0'>
              <EditorContent editor={editor} className='bs-[135px] overflow-y-auto flex ' placeholder='Description' />
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

export default Details
