export function toNumber(str: unknown) {
  if (typeof str === 'number') {
    return str;
  }
  return str ? parseFloat(str as string) : undefined;
}