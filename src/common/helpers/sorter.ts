export const stringSorter = (a, b) => {
  if (a && b) {
    return a.localeCompare(b);
  } else if (a) {
    return -1;
  } else if (b) {
    return 1;
  } else {
    return 0;
  }
};
