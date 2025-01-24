/* eslint-disable @typescript-eslint/no-explicit-any */
export function filterAndConvertParams<T extends Record<string, any>>(
  params: T
): Record<string, string> {
  const filteredParams: Record<string, string> = {};
  if (params) {
    (Object.keys(params) as Array<keyof T>).forEach((key) => {
      const value = params[key];
      if (value !== undefined && value !== null) {
        if (isDate(value)) {
          filteredParams[key as string] = value.toISOString(); // Convert Date to ISO string
        } else {
          filteredParams[key as string] = String(value);
        }
      }
    });
  }
  return filteredParams;
}
function isDate(value: Date): value is Date {
  return value instanceof Date;
}
