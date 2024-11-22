import React, { useEffect, useState, useRef, useCallback } from 'react';

// MUI Imports
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// Component Imports
import type { SelectChangeEvent } from '@mui/material';
import type { UseFormRegister } from 'react-hook-form';

import CustomTextField from '@core/components/mui/TextField';
import type { FormValidateProductEditType } from './schemaProductEdit';

import type { CategoryRead} from '@/services/IsyBuildApi';
import { useCategoriesListQuery } from '@/services/IsyBuildApi';
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

const SelectMultiple = ({
  onToggleMenu,
  register,
}: {
  onToggleMenu: (open: boolean) => void;
  register: UseFormRegister<FormValidateProductEditType>;
}) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [categories, setCategories] = useState<CategoryRead[]>([]);
  const { data, refetch } = useCategoriesListQuery({ page, pageSize });

  // Ref to track the observer for infinite scrolling
  const observer = useRef<IntersectionObserver | null>(null);

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

  useEffect(() => {
    if (data?.results) {
      setCategories((prevCategories) => [...prevCategories, ...data.results]);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page, pageSize, refetch]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedValue = event.target.value as number; // Ensure the value is a number

    setSelectedCategory(selectedValue);
  };

  return (
    <div className="flex gap-4  mbe-6  items-end ">
      <CustomTextField
        select
        fullWidth
        label="sélectionner une catégorie"
        value={selectedCategory || ""} // Default to empty string if null
        
        {...register('category')}
        SelectProps={{
          multiple: false,
          MenuProps,
          onChange: handleChange,
          onOpen: () => onToggleMenu(true),
          onClose: () => onToggleMenu(false),
          renderValue: (selected) => {
            if (!selected) return <Typography>Sélectionnez une catégorie</Typography>;

            const category = categories.find((category) => category.id === selected);

            
return category ? <Chip label={category.name} size="small" /> : null;
          },
        }}
      >
        {categories.map((category, index) => (
          <MenuItem
            key={index} 
            value={category.id}
            ref={index === categories.length - 1 ? lastCategoryRef : null} // Attach ref to last item
          >
            <Typography>{category.name}</Typography>
          </MenuItem>
        ))}
        {!data?.results?.length && <MenuItem disabled>Loading categories...</MenuItem>}
      </CustomTextField>
      <CustomIconButton variant='tonal' color='primary' className='min-is-fit'>
              <i className='tabler-plus' />
            </CustomIconButton>
    </div>
  );
};

export default SelectMultiple;
