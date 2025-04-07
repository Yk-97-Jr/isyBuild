import React from 'react'


import type { CategoryRead } from '@/services/IsyBuildApi'
import CreatedByCard from '@/components/CreatedByCard'


type CategoryEditProps = {
  categoryData: CategoryRead | undefined // Adjust the type as necessary
}



const CategoryCreatedBy: React.FC<CategoryEditProps> = ({ categoryData }) => {
  return (
    <CreatedByCard createdBy={categoryData?.created_by} created_at={categoryData?.created_at} updated_at={categoryData?.updated_at}/>

  )
}

export default CategoryCreatedBy
