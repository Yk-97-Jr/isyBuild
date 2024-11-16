// utils/statusHelper.ts

export const getStatusProps = <T extends string>(
  status: T | undefined,
  statusMapping: Record<T, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning' }>
) => {
  if (!status) {
    return { label: 'Unknown', color: 'default' };
  }

  console.log(status)

  return statusMapping[status] || { label: 'Unknown', color: 'default' };
};
