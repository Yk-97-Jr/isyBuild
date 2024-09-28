// 'use client'

// // MUI Imports
// import Grid from '@mui/material/Grid'
// import Card from '@mui/material/Card'
// import CardHeader from '@mui/material/CardHeader'
// import CardContent from '@mui/material/CardContent'

// // Third-party Imports
// import { useEditor, EditorContent } from '@tiptap/react'
// import { StarterKit } from '@tiptap/starter-kit'
// import { Underline } from '@tiptap/extension-underline'
// import { Placeholder } from '@tiptap/extension-placeholder'
// import { TextAlign } from '@tiptap/extension-text-align'
// import { InputLabel } from '@mui/material'

// // Components Imports
// import CustomTextField from '@core/components/mui/TextField'

// // Style Imports
// import '@/libs/styles/tiptapEditor.css'

// const InformationEdit = () => {
//   const editor = useEditor({
//     extensions: [
//       StarterKit,
//       Placeholder.configure({
//         placeholder: 'Write something here...'
//       }),
//       TextAlign.configure({
//         types: ['heading', 'paragraph']
//       }),
//       Underline
//     ],
//     content: ''
//   })
//   return (
//     <Card>
//       <CardHeader title='Product Information' />
//       <CardContent>
//         <Grid container spacing={6}>
//           <Grid item xs={12} sm={6}>
//             <CustomTextField fullWidth label='Nom' placeholder='' />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <CustomTextField fullWidth label='Code' placeholder='FXSK123U' />
//           </Grid>
//         </Grid>
//         <Grid item xs={12} sm={6} className='mt-5'>
//           <CardContent className='p-0'>
//             <InputLabel>Description</InputLabel>
//             <EditorContent
//               editor={editor}
//               className='bs-[135px] overflow-y-auto flex border rounded-md '
//               placeholder='Description'
//             />
//           </CardContent>
//         </Grid>
//       </CardContent>
//     </Card>
//   )
// }

// export default InformationEdit
