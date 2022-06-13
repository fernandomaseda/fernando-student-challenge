export const formatPrice = (price: number) => {
  return parseFloat(String(price))
    .toFixed(2)
    .toString()
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
