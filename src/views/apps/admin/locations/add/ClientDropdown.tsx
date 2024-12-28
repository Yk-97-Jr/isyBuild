import React, { useEffect, useState, useRef, useCallback } from 'react';

// MUI Imports


import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// Component Imports
import type { UseFormRegister } from 'react-hook-form';

import CustomTextField from '@core/components/mui/TextField';

import {  useClientsRetrieveQuery } from '@/services/IsyBuildApi';
import type { FormValidateType } from './LocationsAdd';




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

const ClientDropdown = ({
  register,
  defaultValue,
}: {
  register: UseFormRegister<FormValidateType>; // Adjust FormValidateType to match your schema
  defaultValue?: number | null;
}) => {
  const [page, setPage] = useState(1);
  const [clients, setClients] = useState<any[]>([]); // Adjust type based on client data
  const { data, refetch } = useClientsRetrieveQuery({ page, pageSize: 500 });

  const observer = useRef<IntersectionObserver | null>(null);

  const lastClientRef = useCallback(
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
      setClients((prev) => [
        ...prev,
        ...data.results.filter((client) => !prev.some((existing) => existing.id === client.id)),
      ]);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  return (
    <CustomTextField
      select
      fullWidth
      label="Client"
      defaultValue={defaultValue || ''}
      {...register('client_id')} // Match the schema field name
      SelectProps={{
        MenuProps,
      }}
    >
      {clients.map((client, index) => (
        <MenuItem
          key={`${client.id}-${Math.random().toString(36).substring(2, 9)}`}
          value={client.id}
          ref={index === clients.length - 1 ? lastClientRef : null}
        >
          <Typography>{client.name}</Typography>
        </MenuItem>
      ))}
      {!data?.results?.length && <MenuItem disabled>Loading clients...</MenuItem>}
    </CustomTextField>
  );
};

export default ClientDropdown;
