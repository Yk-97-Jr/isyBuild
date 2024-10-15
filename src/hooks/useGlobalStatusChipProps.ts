// Generic hook for status chip props
export function useGlobalStatusChipProps<T extends string>(
  status: T | undefined,
  statusMapping: Record<T, { label: string; color: 'default' | 'primary' | 'secondary' | 'error' | 'success' | 'warning' }>
) {
  if (!status || !statusMapping[status]) {
    return { label: 'Unknown', color: 'default' };
  }

  return statusMapping[status];
}
