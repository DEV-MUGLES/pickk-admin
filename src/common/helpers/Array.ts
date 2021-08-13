export const isEqualArray = <T = unknown>(
  a: T[],
  b: T[],
  compare?,
): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) {
    return false;
  }
  return a.every((_, i) => (compare ? compare(a[i], b[i]) : a[i] === b[i]));
};
