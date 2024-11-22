import React from 'react'

import { Card, CardContent, Typography } from '@mui/material'

type ProductCreatedByProps = {
  productData: any
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  
return date.toLocaleString()
}

const ProductCreatedBy: React.FC<ProductCreatedByProps> = ({ productData }) => {
  if (!productData) return null

  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle2">Created By</Typography>
        <Typography variant="body1">{productData?.createdBy || 'Unknown'}</Typography>
        <Typography variant="subtitle2">Created At</Typography>
        <Typography>{formatDate(productData?.createdAt)}</Typography>
        <Typography variant="subtitle2">Updated At</Typography>
        <Typography>{formatDate(productData?.updatedAt)}</Typography>
      </CardContent>
    </Card>
  )
}

export default ProductCreatedBy
