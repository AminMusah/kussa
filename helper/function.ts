import dayjs from "dayjs";

const FORMAT = "dddd, MMMM D, YYYY h:mm A";

const calculateTotal = (items: any) => {
  return items.reduce((acc: any, curr: any) => acc + curr.price, 0);
};

// 2 decimal places
const twoDecimalPlaces = (value: number) => {
  return parseFloat(value?.toFixed(2)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const dateConverter = (date: any) => {
  return dayjs(date).format(FORMAT);
};

export { twoDecimalPlaces, calculateTotal, dateConverter };
