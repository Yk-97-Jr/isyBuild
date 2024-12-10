import React, { useEffect, useState } from 'react';

// MUI Imports
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// Component Imports
import type { UseFormRegister } from 'react-hook-form';

import CustomTextField from '@core/components/mui/TextField';
import type { CategoryRead } from '@/services/IsyBuildApi';
import { useCategoriesListQuery } from '@/services/IsyBuildApi';
import type { FormValidateProductAddType } from './schemaProductAdd';
import CustomIconButton from '@/@core/components/mui/IconButton';

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

const CategoryDropdownAdd = ({
  register,
}: {
  register: UseFormRegister<FormValidateProductAddType>;
}) => {
  const [categories, setCategories] = useState<CategoryRead[]>([]);
  const { data, refetch } = useCategoriesListQuery({ page: 1, pageSize: 100 });

  // Update categories on data change
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
  }, [refetch]);

  return (
    <div className="flex items-end gap-4">
      <CustomTextField
        select
        fullWidth
        label="Category"
        defaultValue="" // No pre-selected category for add
        {...register('category')} // Integrates with react-hook-form
        SelectProps={{
          MenuProps,
        }}
      >
        {categories.map((cat) => (
          <MenuItem key={cat.id} value={cat.id}>
            <Typography>{cat.name}</Typography>
          </MenuItem>
        ))}
        {!data?.results?.length && <MenuItem disabled>Loading categories...</MenuItem>}
      </CustomTextField>
      <CustomIconButton variant="tonal" color="primary" className="min-is-fit">
        <i className="tabler-plus" />
      </CustomIconButton>
    </div>
  );
};

export default CategoryDropdownAdd;
