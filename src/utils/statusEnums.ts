// statusEnums.ts

import type {Status109Enum, Status841Enum, SuiviAdministrativeStatusEnum, Status3BfEnum, DgdStatusEnum} from "@/services/IsyBuildApi";

export const Status841Mapping: Record<Status841Enum, {
  label: string,
  color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning'
}> = {
  pending: {label: 'Pending', color: 'warning'},
  in_progress: {label: 'In Progress', color: 'primary'},
  completed: {label: 'Completed', color: 'success'},
  not_responding: {label: 'Not Responding', color: 'error'},
  canceled: {label: 'Canceled', color: 'secondary'},
};

export const Status109Mapping: Record<Status109Enum, {
  label: string;
  color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning'
}> = {
  pending: {label: 'Pending', color: 'warning'},
  in_progress: {label: 'In Progress', color: 'primary'},
  review: {label: 'Review', color: 'default'},
  completed: {label: 'Completed', color: 'success'},
  canceled: {label: 'Canceled', color: 'secondary'},
};

export const SuiviAdministrativeStatusMapping: Record<SuiviAdministrativeStatusEnum, {
  label: string,
  color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning'
}> = {
  not_started: {label: 'Non démarré', color: 'warning'},
  in_progress: {label: 'En cours', color: 'primary'},
  completed: {label: 'Terminé', color: 'success'},
};

export const Status3BfMapping: Record<Status3BfEnum, {
  label: string,
  color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning'
}> = {
  not_started: {label: 'Non commencé', color: 'default'},
  in_progress: {label: 'En cours', color: 'primary'},
  completed: {label: 'Terminé', color: 'success'},
  on_hold: {label: 'En attente', color: 'warning'},
  canceled: {label: 'Annulé', color: 'secondary'},
  rejected: {label: 'Rejeté', color: 'error'},
  temporarily_done: {label: 'Temporairement terminé', color: 'success'},
};



export const DgdStatusMapping: Record<
  DgdStatusEnum  ,
  {
    label: string ;
    color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning';
  }
> = {
  regle: { label: 'Réglé', color: 'success' },
  valide: { label: 'Validé', color: 'primary' },
  valide_bloque_jp: { label: 'Validé Bloqué JP', color: 'warning' },
  etabli_non_signe_ets: { label: 'Établi Non Signé ETS', color: 'secondary' },
  en_attente_moex: { label: 'En Attente MOEX', color: 'warning' },
  en_attente_levee_reserves: { label: 'En Attente Levée Réserves', color: 'warning' },
  valide_a_zero: { label: 'Validé à Zéro', color: 'error' },
  signe_par_ets_attente_jp: { label: 'Signé Par ETS Attente JP', color: 'primary' },
  refuse_par_amo: { label: 'Refusé Par AMO', color: 'error' },
  abandon: { label: 'Abandonné', color: 'default' },
};




export type Status900Enum = 'open' | 'closed' | 'under_review';

export const Status900Mapping: Record<Status900Enum, {
  label: string,
  color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning'
}> = {
  open: {label: 'Open', color: 'primary'},
  closed: {label: 'Closed', color: 'error'},
  under_review: {label: 'Under Review', color: 'warning'},
};
