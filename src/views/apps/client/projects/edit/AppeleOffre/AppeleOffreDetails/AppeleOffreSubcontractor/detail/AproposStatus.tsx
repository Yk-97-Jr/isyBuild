import React, {useState} from "react";

// MUI Imports
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import type {SelectChangeEvent} from "@mui/material/Select";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

// Util Imports
import Chip from "@mui/material/Chip";

import {CircularProgress} from "@mui/material";

import type {ProjectLotSubcontractorRead, Status841Enum} from "@/services/IsyBuildApi";
import {getStatusProps} from "@/utils/statusHelper";
import {Status841Mapping} from "@/utils/statusEnums";
import {
  useUpdateProjectLotSubcontractorStatusMutation
} from "@/services/IsyBuildApi";

type Props = {
  projectLotSubcontractorData: ProjectLotSubcontractorRead | undefined; // Adjust the type as necessary
};

const AproposStatus: React.FC<Props> = ({projectLotSubcontractorData}) => {
  const [status, setStatus] = useState<keyof typeof Status841Mapping>(
    projectLotSubcontractorData?.status || "pending"
  );

  const [updateStatus, {isLoading}] = useUpdateProjectLotSubcontractorStatusMutation()

  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = async (event: SelectChangeEvent<keyof typeof Status841Mapping>) => {
    try {
      if (projectLotSubcontractorData) {
        const response = await updateStatus({
          projectLotSubcontractorId: projectLotSubcontractorData.id,
          projectLotSubcontractorUpdateRequest: {
            status: event.target.value as keyof typeof Status841Mapping,
          },
        });

        if (response && response.data && response.data.status) {
          setStatus(response.data.status);
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);

      // Optionally, you can show a user-friendly error message here
    } finally {
      setIsEditing(false); // Close dropdown after selection
    }
  };


  const {
    label,
    color
  } = getStatusProps<Status841Enum>(status, Status841Mapping);


  return (
    <Card>
      <CardContent className="flex flex-col gap-6">
        <Typography variant="subtitle2" fontWeight="normal">
          À Propos Status
        </Typography>
        <Grid container spacing={6} className="mbe-6">
          {projectLotSubcontractorData ? (
            <>
              <Grid item xs={12} sm={12}>
                <Box display="flex" alignItems="center">
                  <Typography className="font-medium" color="text.primary" sx={{marginRight: 2}}>
                    Status:
                  </Typography>
                  {isEditing && !isLoading ? (
                    <Select
                      value={status}
                      onChange={handleStatusChange}
                      size="small"
                      sx={{minWidth: 150}}
                    >
                      {Object.entries(Status841Mapping).map(([key, {label}]) => (
                        <MenuItem key={key} value={key}>
                          {label}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : isLoading ? <CircularProgress sx={{color: 'white'}} size={24}/> : (
                    <Chip sx={{marginLeft: 1}} variant="tonal" label={label}
                          color={color as any}/>
                  )}
                  <IconButton onClick={() => setIsEditing(!isEditing)} size="small">
                    {isEditing ? (
                      <i className="tabler-check text-green-600"/>
                    ) : (
                      <i className="tabler-edit text-blue-600"/>
                    )}
                  </IconButton>
                </Box>
              </Grid>
            </>
          ) : (
            <Typography variant="body1" color="text.secondary">
              Aucune information disponible
            </Typography>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AproposStatus;
