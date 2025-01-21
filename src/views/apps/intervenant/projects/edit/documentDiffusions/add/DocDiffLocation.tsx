'use client';

import React, { useEffect, useState } from 'react';

import { useParams, useRouter } from 'next/navigation';

// MUI Imports
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// Component Imports
import type { UseFormRegister,FieldError } from 'react-hook-form';

import { Card, CardHeader, CardContent } from '@mui/material';

import CustomTextField from '@core/components/mui/TextField';
import CustomIconButton from '@/@core/components/mui/IconButton';

import { useLocalisationsListQuery } from '@/services/IsyBuildApi';
import type { FormValidateDocDiffAddType } from './schemaDocDiffAdd';
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

const DocDiffLocation = ({
  register,
  errors,
}: {
  register: UseFormRegister<FormValidateDocDiffAddType>;
  errors: {
    localisation_id?: FieldError;
  };
}) => {
  const [docDiffLocations, setDocDiffLocations] = useState<
    { id: number; name: string }[]
  >([]);

  const { data, refetch, isLoading } = useLocalisationsListQuery({
    page: 1,
    pageSize: 500,
  });

  // Update docDiffLocations on data change
  useEffect(() => {
    if (data?.results) {
      setDocDiffLocations((prev) => [
        ...prev,
        ...data.results.filter(
          (location) => !prev.some((existing) => existing.id === location.id),
        ),
      ]);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const router = useRouter();
  const { user } = useAuth();
  const { edit } = useParams();
  const userRole = user?.role;

  const handleRedirect = () => {
    // Get the current URL

    // Construct the new URL with the query parameter
    const newUrl = `/${userRole}/locations/add?return_to=${userRole}/projects/${edit}/details/documentDiffusions/add`;

    // Redirect to the new URL
    router.push(newUrl);
  };

  return (
    <Card
      className="mbe-12"
      sx={{
        transition: "height 0.3s ease", // Smooth transition of height
        display: "flex", // Use flex layout
        flexDirection: "column", // Column layout to stack elements
      }}
    >
      <CardHeader title="Emplacement" />
      <CardContent
        sx={{
          flexGrow: 1, // Make CardContent grow to fill available space
          display: "flex", // Flex layout inside CardContent
          flexDirection: "column", // Column layout inside CardContent
        }}
      >
        <div className="flex flex-grow flex-col"></div>
        <div className="flex items-end gap-4">
          {/* Dropdown for Locations */}
          <CustomTextField
            select
            fullWidth
            label="Localisation"
            defaultValue="" // No pre-selected location
            {...register("localisation_id")} // Integrates with react-hook-form
            error={!!errors.localisation_id}
            SelectProps={{
              MenuProps,
            }}
          >
            {docDiffLocations.map((location) => (
              <MenuItem key={location.id} value={location.id}>
                <Typography>{location.name}</Typography>
              </MenuItem>
            ))}
            {isLoading && (
              <MenuItem disabled>Chargement des localisations...</MenuItem>
            )}
            {!data?.results?.length && !isLoading && (
              <MenuItem disabled>Aucune localisation disponible</MenuItem>
            )}
          </CustomTextField>

          {/* Button to Add Location */}
          <CustomIconButton
            variant="tonal"
            color="primary"
            className="min-is-fit"
            onClick={handleRedirect}
          >
            <i className="tabler-plus" />
          </CustomIconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocDiffLocation;
