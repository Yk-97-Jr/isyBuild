"use client";

import React, { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { MenuItem, Typography } from "@mui/material";
import type { UseFormRegister, FieldErrors } from "react-hook-form";

import CustomTextField from "@core/components/mui/TextField";
import type { FormValidateDocDiffAddType } from "./schemaDocDiffAdd";
import {
  useProjectsRetrieve2Query,
  useSubcontractorsRetrieveQuery,
} from "@/services/IsyBuildApi";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      overflowY: "auto" as const,
    },
    sx: {
      "::-webkit-scrollbar": { display: "none" },
      scrollbarWidth: "none",
    },
  },
};

interface DocDiffSubcontractorProps {
  register: UseFormRegister<FormValidateDocDiffAddType>;
  errors: FieldErrors<FormValidateDocDiffAddType>;
}

const DocDiffSubcontractor: React.FC<DocDiffSubcontractorProps> = ({
  register,
  errors,
}) => {
  const params = useParams();
  const projectId = parseInt(params?.edit as string);

  const [docDiffSubcontractors, setDocDiffSubcontractors] = useState<
    { id: number; name: string }[]
  >([]);

  // Fetch the project data
  const {
    data: ProjectData,
    error: projectError,
    isLoading: isProjectLoading,
  } = useProjectsRetrieve2Query({ projectId });

  // Log ProjectData to debug its structure
  useEffect(() => {
    console.log("ProjectData:", ProjectData);
  }, [ProjectData]);

  // Get the client ID from the project data
  let clientIds = "";

  if (
    ProjectData &&
    ProjectData.client &&
    typeof ProjectData.client === "object"
  ) {
    clientIds = String(ProjectData.client.id);
    console.log("clientIds:", clientIds); // Debugging line to check clientIds
  } else {
    if (!isProjectLoading) {
      console.error("ProjectData.client is not an object or is undefined");
    }
  }

  // Fetch the subcontractors based on the client ID
  const {
    data,
    refetch,
    isLoading,
    error: subcontractorsError,
  } = useSubcontractorsRetrieveQuery(
    {
      page: 1,
      pageSize: 500,
      clientIds,
    },
    {
      skip: !clientIds, // Skip the query if clientIds is not set
    },
  );

  // Log errors if they occur
  useEffect(() => {
    if (projectError) {
      console.error("Error fetching project data:", projectError);
    }

    if (subcontractorsError) {
      console.error("Error fetching subcontractors:", subcontractorsError);
    }
  }, [projectError, subcontractorsError]);

  // Log the response from subcontractors query
  useEffect(() => {
    console.log("Subcontractors data:", data);
  }, [data]);

  // Filter the subcontractors based on the client ID
  useEffect(() => {
    if (data?.results) {
      const filteredSubcontractors = data.results.filter((subcontractor) =>
        subcontractor.clients.some(
          (client) => client.id === parseInt(clientIds),
        ),
      );

      setDocDiffSubcontractors(filteredSubcontractors);
    }
  }, [data, clientIds]);

  // Refetch the subcontractors whenever necessary
  useEffect(() => {
    if (clientIds) {
      refetch();
    }
  }, [clientIds, refetch]);

  return (
    <div className="flex items-end gap-4">
      {/* Dropdown for Subcontractors */}
      <CustomTextField
        select
        fullWidth
        label="Sous-traitant"
        defaultValue=""
        {...register("subcontractor_id")}
        error={!!errors.subcontractor_id}
        SelectProps={{ MenuProps }}
      >
        {docDiffSubcontractors.map((subcontractor) => (
          <MenuItem key={subcontractor.id} value={subcontractor.id}>
            <Typography>{subcontractor.name}</Typography>
          </MenuItem>
        ))}
        {isLoading && (
          <MenuItem disabled>Chargement des sous-traitants...</MenuItem>
        )}
        {!data?.results?.length && !isLoading && (
          <MenuItem disabled>Aucun sous-traitant disponible</MenuItem>
        )}
      </CustomTextField>
    </div>
  );
};

export default DocDiffSubcontractor;
