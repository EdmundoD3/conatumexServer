const nonMatchingDates = (array1, array2) =>
  array2.filter(
    (obj2) => !array1.some((obj1) => obj1.date.getTime() == obj2.date.getTime())
  );

export { nonMatchingDates };
