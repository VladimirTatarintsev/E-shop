export const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export const xor = (arr, value) => {
  return arr.includes(value)
    ? arr.filter((i) => i !== value)
    : arr.concat(value);
};
export const getPagesCount = (totalCount, limit) => {
  return Math.ceil(totalCount / limit);
};

export const getFilteredBrandsToString = (arr) => {
  let str = "";
  for (let value of arr) {
    str === "" ? (str = "?brand=" + value) : (str += "&brand=" + value);
  }
  return str;
};
export const getPrice = (name, value) => {
  let str = "";
  if (name === "priceFrom" && str === "") {
    str = "price_gte=" + value;
  } else str += "price_gte=" + value;
};

export const createPages = (pages, totalPages) => {
  for (let i = 0; i < totalPages; i++) {
    pages.push(i + 1);
  }
};
