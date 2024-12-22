import * as yup from 'yup';

import type { PhaseEnum } from '@/services/IsyBuildApi';

export const schemaDocDiffUpdate = yup
  .object({
    title: yup.string().required('Le titre est requis'),
    phase: yup
      .mixed<PhaseEnum>()
      .oneOf(["design", "execution"], 'Phase invalide')
      .required('La phase est requise'),
    localisation: yup
      .number().nullable()
      .required('La localisation est requise')
      .typeError('La localisation doit être un numéro'),
  })
  .required();

export type FormValidateDocDiffUpdateType = yup.InferType<typeof schemaDocDiffUpdate>;
