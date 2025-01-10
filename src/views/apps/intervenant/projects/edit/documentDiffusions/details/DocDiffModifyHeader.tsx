'use client';

import React from 'react';

import Typography from '@mui/material/Typography';

const DocDiffModifyHeader = () => {


  return (
    <div className="flex flex-wrap items-center justify-between gap-6 sm:items-center max-sm:flex-col">
      <Typography variant="h4" className="mbe-1">
        Informations de Diffusion du Document
      </Typography>
    </div>
  );
};

export default DocDiffModifyHeader;
