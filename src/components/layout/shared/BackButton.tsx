'use client';

// MUI Imports
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import useHandleBack from "@/hooks/useHandleBack";

const BackButton = () => {
  const handleBack = useHandleBack();


  return (
    <Tooltip title="Go Back">
      <IconButton onClick={handleBack} className="text-textPrimary">
        <i className="tabler-arrow-left"/> {/* Replace with the arrow icon of your choice */}
      </IconButton>
    </Tooltip>
  );
};

export default BackButton;
