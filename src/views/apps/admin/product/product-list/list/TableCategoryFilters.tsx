import React, { useState, useEffect, useRef, useCallback } from 'react';

import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import CustomTextField from '@core/components/mui/TextField';
import { useCategoriesListQuery } from '@/services/IsyBuildApi';

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

const TableCategoryFilters = ({
  setCategoryId,
  categoryId,
}: {
  setCategoryId: React.Dispatch<React.SetStateAction<string | ''>>;
  categoryId: string | '';
}) => {
  const [page, setPage] = useState(1); // Track current page
  const [categories, setCategories] = useState<any[]>([]); // Store fetched categories
  const [selectedCategory, setSelectedCategory] = useState<string>(String(categoryId));
  const observer = useRef<IntersectionObserver | null>(null); // For infinite scrolling

  const { data: categoriesData, isLoading, error } = useCategoriesListQuery({
    page,
    pageSize: 10, // Fetch 10 items per page
  });

  useEffect(() => {
    if (categoriesData?.results) {
      setCategories((prev) => [...prev, ...categoriesData.results]);
    }
  }, [categoriesData]);

  const lastCategoryRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && categoriesData?.next) {
          setPage((prevPage) => prevPage + 1); // Load next page
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, categoriesData]
  );

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    setSelectedCategory(value);

    setCategoryId(value === '' ? '' : String(value));
  };

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid item xs={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            id="category-select"
            value={selectedCategory || ''}
            onChange={handleCategoryChange}
            SelectProps={{ MenuProps,
              displayEmpty:true
            }}
            disabled={isLoading}
            error={!!error}
            helperText={error ? 'Erreur lors du chargement des Catégories' : ''}
          >
            <MenuItem value="">Toutes les Catégories</MenuItem>

            {categories.map((category, index) => (
              <MenuItem
                key={category.id}
                value={category.id}
                ref={index === categories.length - 1 ? lastCategoryRef : null} // Attach ref to the last item
              >
                <Typography>{category.name}</Typography>
              </MenuItem>
            ))}

            {isLoading && (
              <MenuItem disabled>
                <CircularProgress size={24} />
              </MenuItem>
            )}
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  );
};

export default TableCategoryFilters;
