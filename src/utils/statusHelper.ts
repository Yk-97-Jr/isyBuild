// utils/statusHelper.ts

export const getStatusProps = <T extends string>(
  status: T | undefined,
  statusMapping: Record<T, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning'| 'info' }>
) => {
  if (!status) {
    return { label: 'Unknown', color: 'default' };
  }


  return statusMapping[status] || { label: 'Unknown', color: 'default' };
};

export const getStatus = <T extends string>(
  status: T | undefined,
  statusMapping: Record<
    T,
    {
      label: string;
      color:
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "success"
        | "warning"
        | "info";
    }
  >,
): {
  label: string;
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning"
    | "info";
} => {
  if (!status || !statusMapping[status]) {
    return { label: "Unknown", color: "default" };
  }

  return statusMapping[status];
};
