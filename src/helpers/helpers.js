export const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const getPagesCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export const createPages = (pages, totalPages) => {
  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }
};
