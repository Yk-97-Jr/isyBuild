// statusEnums.ts

import type {Status109Enum, Status841Enum, SuiviAdministrativeStatusEnum, Status3BfEnum} from "@/services/IsyBuildApi";

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
































export type Status900Enum = 'open' | 'closed' | 'under_review';

export const Status900Mapping: Record<Status900Enum, {
  label: string,
  color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning'
}> = {
  open: {label: 'Open', color: 'primary'},
  closed: {label: 'Closed', color: 'error'},
  under_review: {label: 'Under Review', color: 'warning'},
};
