import * as yup from "yup";

import type { PhaseEnum, Type94BEnum } from "@/services/IsyBuildApi";

export const schemaDocDiffAdd = yup
  .object({
    title: yup.string().required("Le titre est requis"),
    phase: yup
      .mixed<PhaseEnum>()
      .oneOf(["design", "execution"], "Phase invalide")
      .required("La phase est requise"),
    type: yup
      .string()
      .oneOf(
        [
          "plan_technique",
          "plan_de_coffrage",
          "fiche_technique",
          "avis_technique",
          "note_de_calcul",
          "fiche_question",
          "fiche_technique_produit",
          "autre",
        ] as Type94BEnum[],
        "Type invalide",
      )
      .required("Le type est requis"),
    localisation_id: yup
      .number()
      .nullable()
      .transform((_, val) => (val !== "" ? Number(val) : null))
      .typeError("La localisation doit être un numéro"),
    subcontractor_id: yup
      .number()
      .transform((_, val) => (val !== "" ? Number(val) : null))
      .typeError("La localisation doit être un numéro"),
    project_lot: yup
      .number()
      .required("Le lot de projet est requis")
      .typeError("Le lot de projet doit être un numéro"),
  })
  .required();

export type FormValidateDocDiffAddType = yup.InferType<typeof schemaDocDiffAdd>;
