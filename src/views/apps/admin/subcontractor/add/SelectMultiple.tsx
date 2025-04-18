'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

// MUI Imports
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// Component Imports
import type { SelectChangeEvent } from '@mui/material';
import type { UseFormRegister } from 'react-hook-form';

import CustomTextField from '@core/components/mui/TextField';
import type { FormValidateSubcontractorAddType } from './SchemaSubcontractorAdd';

import { useLotsRetrieveQuery } from '@/services/IsyBuildApi';

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
  register,
}: {
  register: UseFormRegister<FormValidateSubcontractorAddType>;
}) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [selectedLotNames, setSelectedLotNames] = useState<string[]>([]);
  const [lots, setLots] = useState<any[]>([]);
  const { data, refetch } = useLotsRetrieveQuery({ page, pageSize });

  // Ref to track the observer for infinite scrolling
  const observer = useRef<IntersectionObserver | null>(null);

  const lastLotRef = useCallback(
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
      const newLots = data.results.map((lot) => ({
        ...lot,
        uniqueKey: `${lot.id}-${Math.random().toString(36).substring(2, 9)}`, // Appends a random string to each id
      }));

      setLots((prevLots) => [...prevLots, ...newLots]);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page, pageSize, refetch]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedNames = event.target.value as string[];

    setSelectedLotNames(selectedNames);
  };

  const handleDelete = (lotId: string) => {
    setSelectedLotNames((prev) => prev.filter((id) => id !== lotId));
  };

  return (
    <div className="flex gap-4 flex-col mbe-6">
      <CustomTextField
        select
        fullWidth
        label="Lots"
        value={selectedLotNames}
        id="lots_ids"
        {...register('lots_ids')}
        SelectProps={{
          multiple: true,
          MenuProps,
          onChange: handleChange,
          renderValue: (selected) => (
            <div className="flex flex-wrap gap-1">
              {(selected as string[]).map((value) => {
                const lot = lots.find((lot) => lot.id === value);

                
return lot ? (
                  <Chip
                    key={value}
                    label={lot.name}
                    size="small"
                    clickable
                    onMouseDown={(event) => event.stopPropagation()}
                    onDelete={() => handleDelete(value)}
                  />
                ) : null;
              })}
            </div>
          ),
        }}
      >
        {lots.map((lot, index) => (
          <MenuItem
            key={lot.uniqueKey}
            value={lot.id}
            ref={index === lots.length - 1 ? lastLotRef : null} // Attach ref to last item
          >
            <Typography>{lot.name}</Typography>
          </MenuItem>
        ))}
        {!data?.results?.length && <MenuItem disabled>Loading lots...</MenuItem>}
      </CustomTextField>
    </div>
  );
};

export default SelectMultiple;
