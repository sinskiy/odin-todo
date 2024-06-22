export function getLargestID(array) {
  if (!array.length) return -1;
  const IDs = array.map((item) => item.id);
  const largestID = Math.max(...IDs);
  return largestID;
}
