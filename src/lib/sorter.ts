export const stringSorter = (a, b) => {
  if (a && b) {
    return a.localeCompare(b);
  } else if (a || b) {
    return -1;
  }
  return 1;
};
