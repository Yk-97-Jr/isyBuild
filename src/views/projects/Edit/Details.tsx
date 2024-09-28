import React from 'react'

import { Card } from '@mui/material'

import { EditorContent } from '@tiptap/react'

import { useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'

function Details() {
    
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Write some notes'
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],

    content: ''
  })

  return (
    <Card className='p-5'>
      <p className='text-xl '>Detials</p>
      <div className='py-2'>
        <EditorContent
          editor={editor}
          className='bs-[135px] overflow-y-auto flex border rounded-md '
          placeholder='Description'
        />
      </div>
    </Card>
  )
}

export default Details
