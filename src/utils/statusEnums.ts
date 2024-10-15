// statusEnums.ts

import type {Status841Enum} from "@/services/IsyBuildApi";

export const Status841Mapping: Record<Status841Enum, { label: string, color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning' }> = {
  pending: { label: 'Pending', color: 'warning' },
  in_progress: { label: 'In Progress', color: 'primary' },
  completed: { label: 'Completed', color: 'success' },
  not_responding: { label: 'Not Responding', color: 'error' },
  canceled: { label: 'Canceled', color: 'secondary' },
};

export type Status900Enum = 'open' | 'closed' | 'under_review';

export const Status900Mapping: Record<Status900Enum, { label: string, color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning' }> = {
  open: { label: 'Open', color: 'primary' },
  closed: { label: 'Closed', color: 'error' },
  under_review: { label: 'Under Review', color: 'warning' },
};
