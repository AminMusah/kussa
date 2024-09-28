export const calculateTotalPrice = (items: any) => {
  return items.reduce((acc: any, curr: any) => acc + curr.price, 0);
};
