export const getExpDate = ( daysAhead ) => {
  const date = new Date();
  return new Date(date.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
}