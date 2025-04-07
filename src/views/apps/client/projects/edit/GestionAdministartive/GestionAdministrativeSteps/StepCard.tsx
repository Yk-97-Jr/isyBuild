import React, {useState} from 'react'

import {useParams, useRouter} from "next/navigation";

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  CardHeader,
  Box,
} from '@mui/material'


import {Status3BfMapping} from "@/utils/statusEnums";
import {getStatusProps} from "@/utils/statusHelper";
import type {Status3BfEnum, SuiviAdministrativeStepRead} from "@/services/IsyBuildApi";
import {formatDate} from "@/utils/formatDate";
import OptionMenu from "@core/components/option-menu";
import {useAuth} from "@/contexts/AuthContext";


const StepCard: React.FC<{
  step: SuiviAdministrativeStepRead,
  setOpenAdd: (open: boolean) => void,
  setStep: (step: SuiviAdministrativeStepRead) => void,
  openAdd: boolean,
}> = ({step, setStep, setOpenAdd, openAdd}) => {

  const [status] = useState<keyof typeof Status3BfMapping>(
    step?.status || "not_started"
  );

  const router = useRouter();

  const {user} = useAuth();  // Get the user from AuthContext
  const userRole = user?.role
  const {edit: projectId} = useParams();  // Renamed the route parameter variable
  const {id: gestionAdministrativeId} = useParams();


  //
  // const handleStatusChange = (event: SelectChangeEvent<keyof typeof Status3BfMapping>) => {
  //   setStatus(event.target.value as keyof typeof Status3BfMapping);
  //   setIsEditing(false); // Close dropdown after selection
  // };

  const handleToggle = () => {
    setOpenAdd(!openAdd); // Toggle state
    setStep(step)
  };


  const handleToggleFolder = () => {
    if (step) {
      router.push(`/${userRole}/projects/${projectId}/details/gestionAdministrative/${gestionAdministrativeId}/steps/${step.id}`);
    }
  };

  const {
    label,
    color
  } = getStatusProps<Status3BfEnum>(status, Status3BfMapping);

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: 3
        }
      }}
    >
      <CardHeader
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between', // Space between title and actions
        }}
        action={
          <Box display="flex" alignItems="center" gap={2}>
            <Chip sx={{marginLeft: 1}} variant="tonal" label={label}
                  color={color as any}/>
            <OptionMenu
              iconButtonProps={{size: 'medium'}}
              iconClassName='text-textSecondary'
              options={[
                {
                  text: 'Details',
                  icon: 'tabler-edit',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: handleToggle
                  }
                },
                {
                  text: 'Documents',
                  icon: 'tabler-folders',
                  menuItemProps: {
                    className: 'flex items-center gap-2 text-textSecondary',
                    onClick: handleToggleFolder
                  }
                }
              ]}
            />

          </Box>
        }
        title={step.step_name}
      />
      <CardContent sx={{flex: 1}}>
        <Stack spacing={1}>
          <Typography variant="body2" color="text.secondary">
            Order: {step.order}
          </Typography>
          {step.target_date && (
            <Typography variant="body2" color="text.secondary">
              Target Date: {formatDate(step.target_date)}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Days Allocated: {step.nbr_of_days}
          </Typography>
          {step.actual_date && (
            <Typography variant="body2" color="text.secondary">
              Actual Date: {formatDate(step.actual_date)}
            </Typography>
          )}
          {/*{step.assigned_to && (*/}
          {/*  <Typography variant="body2" color="text.secondary">*/}
          {/*    Assigned To: {step.assigned_to}*/}
          {/*  </Typography>*/}
          {/*)}*/}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default StepCard
