import * as yup from 'yup';

import type { PhaseEnum, Type94BEnum } from '@/services/IsyBuildApi';

export const schemaDocDiffAdd = yup
  .object({
    title: yup.string().required("Le titre est requis"),
    phase: yup
      .mixed<PhaseEnum>()
      .oneOf(["design", "execution"], "Phase invalide")
      .required("La phase est requise"),
    type: yup
      .mixed<Type94BEnum>()
      .oneOf(
        [
          "plan_technique",
          "plan_de_coffrage",
          "fiche_technique",
          "avis_technique",
          "note_de_calcul",
          "fiche_question",
          "autre",
        ],
        "Type invalide",
      )
      .required("Le type est requis"),
    localisation_id: yup
      .number()
      .required("La localisation est requise")
      .typeError("La localisation doit être un numéro"),
    project_lot_id: yup
      .number()
      .required("Le lot de projet est requis")
      .typeError("Le lot de projet doit être un numéro"),
  })
  .required();

export type FormValidateDocDiffAddType = yup.InferType<typeof schemaDocDiffAdd>;
