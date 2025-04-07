import React, {useState} from 'react'

import Typography from "@mui/material/Typography";
import {Chip, Stack} from "@mui/material";

import type {SuiviAdministrativeStepRead, Status3BfEnum} from "@/services/IsyBuildApi";
import {formatDate} from "@/utils/formatDate";
import {Status3BfMapping} from "@/utils/statusEnums";
import {getStatusProps} from "@/utils/statusHelper";


function DetailsSection({step}: { step: SuiviAdministrativeStepRead | undefined }) {
  const [status] = useState<keyof typeof Status3BfMapping>(
    step?.status || "not_started"
  );

  const {
    label,
    color
  } = getStatusProps<Status3BfEnum>(status, Status3BfMapping);


  return (
    <div>

      {step && (
        <Stack spacing={8} sx={{
          minHeight: '434px', // Set your desired minimum height
          minWidth: '430px', // Set your desired minimum height
          overflowY: 'auto', // Allow scrolling if content exceeds the dialog height
        }}>
          <Typography className="font-medium" color="text.primary">
            Step Name:
            <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
              {step.step_name}
            </Typography>
          </Typography>

          {step.order !== undefined && (
            <Typography className="font-medium" color="text.primary">
              Order:
              <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
                {step.order}
              </Typography>
            </Typography>
          )}

          <Typography className="font-medium" color="text.primary">
            Number of Days:
            <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
              {step.nbr_of_days}
            </Typography>
          </Typography>

          {step.target_date && (
            <Typography className="font-medium" color="text.primary">
              Target Date:
              <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
                {formatDate(step.target_date)}
              </Typography>
            </Typography>
          )}

          {step.actual_date && (
            <Typography className="font-medium" color="text.primary">
              Actual Date:
              <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
                {formatDate(step.actual_date)}
              </Typography>
            </Typography>
          )}

          {step.status && (
            <Typography className="font-medium" color="text.primary">
              Status:
              <Chip sx={{marginLeft: 1}} variant="tonal" label={label}
                    color={color as any}/>
            </Typography>
          )}
          {step.assigned_to && (
            <Typography className="font-medium" color="text.primary">
              Assigned To:
              <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
                {step.assigned_to.intervenant.user.first_name}
              </Typography>
            </Typography>)}

          {step.created_by && (
            <Typography className="font-medium" color="text.primary">
              Created By:
              <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
                {step.created_by.first_name}
              </Typography>
            </Typography>
          )}

          {step.created_at && (
            <Typography className="font-medium" color="text.primary">
              Created At:
              <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
                {formatDate(step.created_at)}
              </Typography>
            </Typography>
          )}

          {step.updated_at && (
            <Typography className="font-medium" color="text.primary">
              Updated At:
              <Typography variant="body1" component="span" color="text.secondary" sx={{marginLeft: 1}}>
                {formatDate(step.updated_at)}
              </Typography>
            </Typography>
          )}
        </Stack>
      )}
    </div>

  )
}

export default DetailsSection
