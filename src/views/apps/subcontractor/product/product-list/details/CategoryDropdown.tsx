import React, { useEffect, useState, useRef, useCallback } from 'react';

// MUI Imports
import { useParams, useRouter } from 'next/navigation';

import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// Component Imports
import type { UseFormRegister } from 'react-hook-form';

import CustomTextField from '@core/components/mui/TextField';
import type { CategoryRead, ProductRead } from '@/services/IsyBuildApi';
import { useCategoriesListQuery } from '@/services/IsyBuildApi';
import type { FormValidateProductEditType } from './schemaProductEdit';
import CustomIconButton from '@/@core/components/mui/IconButton';
import { useAuth } from '@/contexts/AuthContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      overflowY: 'auto' as const,
    },
    sx: {
      '::-webkit-scrollbar': { display: 'none' },
      scrollbarWidth: 'none',
    },
  },
};

const CategoryDropdown = ({
  register,
  productData,
}: {
  register: UseFormRegister<FormValidateProductEditType>; // react-hook-form registration
  productData: ProductRead | undefined; // Existing product data
}) => {
  const [page, setPage] = useState(1);

  const [categories, setCategories] = useState<CategoryRead[]>([]);
  const { data, refetch } = useCategoriesListQuery({ page:1, pageSize:100 });

  const observer = useRef<IntersectionObserver | null>(null);

  const router = useRouter();
  const { id } = useParams()
  const { user } = useAuth()
  const userRole = user?.role

  const lastCategoryRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && data?.next) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [data]
  );

  // Sync selectedCategory when productData.category changes
  useEffect(() => {
    if (productData?.category) {
      // If the category is not present in the categories, add it
      const categoryExists = categories.some((cat) => cat.id === productData.category.id);

      if (!categoryExists && data?.results) {
        const matchedCategory = data.results.find((cat) => cat.id === productData.category.id);

        if (matchedCategory) {
          setCategories((prev) => [matchedCategory, ...prev]);
        }
      }
    }
  }, [productData, categories, data]);

  useEffect(() => {
    if (data?.results) {
      setCategories((prev) => [
        ...prev,
        ...data.results.filter((cat) => !prev.some((existing) => existing.id === cat.id)),
      ]);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const handleRedirect = () => {
    // Get the current URL
    

    // Construct the new URL with the query parameter
    const newUrl = `/${userRole}/product/category/add?return_to=${userRole}/product/${id}/details`;

    // Redirect to the new URL
    router.push(newUrl);
  };

  return (
    <div className="flex items-end gap-4">
      <CustomTextField
        select
        fullWidth
        label="Catégorie"
        defaultValue={productData?.category || ''} // Default value directly from productData
        {...register('category')} // Let react-hook-form handle the onChange
        SelectProps={{
          MenuProps,
        }}
      >
        {categories.map((cat, index) => (
          <MenuItem
            key={`${cat.id}-${Math.random().toString(36).substring(2, 9)}`}
            value={cat.id}
            ref={index === categories.length - 1 ? lastCategoryRef : null} // Attach infinite scroll ref to last item
          >
            <Typography>{cat.name}</Typography>
          </MenuItem>
        ))}
        {!data?.results?.length && <MenuItem disabled>Loading categories...</MenuItem>}
      </CustomTextField>
      <CustomIconButton variant="tonal" color="primary" className="min-is-fit" onClick={handleRedirect}>
        <i className="tabler-plus" />
      </CustomIconButton>
    </div>
  );
};

export default CategoryDropdown;
