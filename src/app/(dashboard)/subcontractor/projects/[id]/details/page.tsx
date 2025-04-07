// React Imports
import type {ReactElement} from 'react'

// Next Imports
import dynamic from 'next/dynamic'

import ProjectDetails from '@/views/apps/subcontractor/projects/showcase/ProjectDetails'

const Showcase = dynamic(() => import('@/views/apps/subcontractor/projects/showcase/ShowcaseData'))







// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
   showcase: <Showcase/>,

 categorylist: <Showcase/>,


})

const ProductPage = () => {
 return <ProjectDetails tabContentList={tabContentList()}/>
}

export default ProductPage