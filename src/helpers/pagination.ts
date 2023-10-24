export const paginate = ({ page, pageSize = 25 }) => {
  const offset = page * pageSize;
  const limit = pageSize;
  return {
    offset,
    limit,
  };
};
