
import React from 'react'


import type { ProductRead } from '@/services/IsyBuildApi'

import CreatedByCard from '@/components/CreatedByCard'

type  ProductCreatedByProps = {
  productData: ProductRead | undefined // Adjust the type as necessary
}

const ProductCreatedBy: React.FC<ProductCreatedByProps> = ({ productData }) => {

  return (
    <CreatedByCard createdBy={productData?.created_by} created_at={productData?.created_at} updated_at={productData?.updated_at}/>

  )
}

export default ProductCreatedBy






