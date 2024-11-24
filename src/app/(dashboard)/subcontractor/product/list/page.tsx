// React Imports
import type {ReactElement} from 'react'

// Next Imports
import dynamic from 'next/dynamic'

// Component Imports 
import ProductDetails from "@views/apps/subcontractor/product/ProductDetails";

const ProductList = dynamic(() => import('@/views/apps/subcontractor/product/product-list/list/ProductList'))



const CategoryList = dynamic(() => import('@/views/apps/subcontractor/product/category-list/list/CategoryList'))




// Vars
const tabContentList = (): { [key: string]: ReactElement } => ({
    productlist: <ProductList/>,

  categorylist: <CategoryList/>,


})

const ProductPage = () => {
  return <ProductDetails tabContentList={tabContentList()}/>
}

export default ProductPage
