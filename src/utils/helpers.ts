import dayjs from "dayjs";
import { ICount, IIngredient, TNewIngredient } from "./../types/types";
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
require("dayjs/locale/ru");
dayjs.extend(relativeTime);
dayjs.extend(calendar);

export const calculatePrice = (arr: IIngredient[]): number => {
  return arr?.reduce((acc, curr) => {
    return acc + curr?.price;
  }, 0);
};

export const getStringDate = (date: string) => {
  return `${dayjs(date).locale("ru").calendar(null, {
    sameDay: "[Сегодня], H:mm",
    lastDay: "[Вчера], H:mm",
    lastWeek: `DD MMMM YYYY, H:mm`,
    sameElse: `DD MMMM YYYY, H:mm`,
  })}`;
};

export const calculateCount = (arr: IIngredient[]) => {
  const countItems: ICount = {};
  for (const item of arr) {
    countItems[item._id] = countItems[item._id] ? countItems[item._id] + 1 : 1;
  }
  return countItems;
};

export const getIngredientsWithCount = (obj: ICount, arr: IIngredient[]) => {
  let newIngredients: TNewIngredient[] = [];
  for (let key in obj) {
    arr.forEach((item) => {
      if (item._id === key) {
        newIngredients.push({ ...item, count: obj[key] });
      }
    });
  }
  return newIngredients;
};

export const calculateSumm = (arr: TNewIngredient[]) => {
  return arr?.reduce((acc, curr) => {
    return acc + curr?.count * curr?.price;
  }, 0);
};

export const addDataForIngredients = (IdArr: string[], ingredientsArr: IIngredient[]) => {
  let newArr: IIngredient[] = [];
  IdArr?.forEach((itemString) => {
    const dataIngredient = ingredientsArr.find((item) => {
      return item._id === itemString;
    });
    if (!dataIngredient) return;
    newArr = [...newArr, dataIngredient];
  });
  return newArr;
};
