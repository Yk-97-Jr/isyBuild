import React from 'react'

// import Card from '@mui/material/Card'
import { Card, CardHeader, CardContent, Typography } from '@mui/material'

import { EditorContent, useEditor } from '@tiptap/react'


import StarterKit from '@tiptap/starter-kit'

import Placeholder from '@tiptap/extension-placeholder'

import TextAlign from '@tiptap/extension-text-align'

import Underline from '@tiptap/extension-underline'

import LinearProgress from '@mui/material/LinearProgress'

import { CircularProgress } from '@mui/material'

import type{ ProjectRead } from '@/services/IsyBuildApi'




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
        placeholder: 'Write something here...'
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
      <CardContent className='flex flex-col gap-2'>
        <Typography variant='h5' className='mt-4 text-gray-500' fontWeight='normal'>
          Client:{projectState.client.name}
        </Typography>
        <>
          <Typography variant='h5' fontWeight='normal' className='text-gray-500'>
            Status:{projectState.status}
          </Typography>
          <Typography variant='h5' fontWeight='normal' className='text-gray-500'>
            Niveau de Risque:{projectState.risk_level}
          </Typography>
          <div className='flex w-full items-center  gap-2'>
            <Typography variant='h5' fontWeight='normal' className='text-gray-500'>
              Progress:
            </Typography>
            <LinearProgress
              variant='determinate'
              className='w-1/2  mt-1'
              value={Number(projectState.percentage_complete) || 40}
            />
          </div>
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
