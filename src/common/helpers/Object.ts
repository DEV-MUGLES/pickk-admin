export const isEqualObject = (a, b): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return (
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every((key) => a[key] === b[key])
  );
};

export const isEqualSizeObject = (a, b): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return Object.keys(a).length === Object.keys(b).length;
};
