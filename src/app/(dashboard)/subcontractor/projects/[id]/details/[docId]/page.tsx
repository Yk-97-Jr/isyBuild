// React Imports
import type {ReactElement} from 'react'

// Next Imports
import dynamic from 'next/dynamic'

import ProjectDetails from '@/views/apps/subcontractor/projects/showcase/ProjectDetails'

const LotDataShow = dynamic(() => import('@/views/apps/subcontractor/projects/showcase/project-lots/LotDataShow'))







// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
   showcase: <LotDataShow/>,

 categorylist: <LotDataShow/>,


})

const ProductPage = () => {
 return <ProjectDetails tabContentList={tabContentList()}/>
}

export default ProductPage