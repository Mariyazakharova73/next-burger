export const CARD_BUN = {
  name: "Флюоресцентная булка R2-D3",
  fat: 26,
  proteins: 44,
  carbohydrates: 85,
  calories: 643,
  image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
};

export const CARD_FILLING = {
  name: "Кристаллы марсианских альфа-сахаридов",
  fat: 432,
  proteins: 234,
  carbohydrates: 111,
  calories: 30,
  image_large: "https://code.s3.yandex.net/react/code/core-large.png",
};

export const INGREDIENT_SAUSE = {
  _id: "643d69a5c3f7b9001cfa0943",
  name: "Соус фирменный Space Sauce",
  type: "sauce",
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: "https://code.s3.yandex.net/react/code/sauce-04.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
  __v: 0,
};

export const INGREDIENT_MAIN = {
  _id: "643d69a5c3f7b9001cfa0948",
  name: "Кристаллы марсианских альфа-сахаридов",
  type: "main",
  proteins: 234,
  fat: 432,
  carbohydrates: 111,
  calories: 14,
  price: 189,
  image: "https://code.s3.yandex.net/react/code/core.png",
  image_mobile: "https://code.s3.yandex.net/react/code/core-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/core-large.png",
  __v: 0,
};

export const ORDER = {
  success: true,
  name: "Space люминесцентный флюоресцентный spicy бургер",
  order: {
    ingredients: [
      {
        _id: "643d69a5c3f7b9001cfa0943",
        name: "Соус фирменный Space Sauce",
        type: "sauce",
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: "https://code.s3.yandex.net/react/code/sauce-04.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa0942",
        name: "Соус Spicy-X",
        type: "sauce",
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: "https://code.s3.yandex.net/react/code/sauce-02.png",
        image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa093e",
        name: "Филе Люминесцентного тетраодонтимформа",
        type: "main",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/meat-03.png",
        image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa093d",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
      {
        _id: "643d69a5c3f7b9001cfa093d",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        __v: 0,
      },
    ],
    _id: "644543a445c6f2001be6cd7a",
    owner: {
      name: "Мария",
      email: "zakharovamaria73@yandex.ru",
      createdAt: "2023-04-17T15:57:40.962Z",
      updatedAt: "2023-04-17T15:57:40.962Z",
    },
    status: "done",
    name: "Space люминесцентный флюоресцентный spicy бургер",
    createdAt: "2023-04-23T14:41:40.725Z",
    updatedAt: "2023-04-23T14:41:40.759Z",
    number: 1244,
    price: 3134,
  },
};

export const USER = {
  name: "Мария",
  email: "zakharovamaria73@yandex.ru",
  password: "123456",
  code: "test",
};

export const WS_ORDER = {
  ingredients: [
    "643d69a5c3f7b9001cfa0943",
    "643d69a5c3f7b9001cfa0942",
    "643d69a5c3f7b9001cfa093e",
    "643d69a5c3f7b9001cfa093d",
    "643d69a5c3f7b9001cfa093d",
  ],
  _id: "644543a445c6f2001be6cd7a",
  status: "done",
  name: "Space люминесцентный флюоресцентный spicy бургер",
  number: 1244,
  createdAt: "2023-04-23T14:41:40.725Z",
  updatedAt: "2023-04-23T14:41:40.759Z",
};

export const WS_DATA = {
  success: true,
  orders: [WS_ORDER],
  total: 1,
  totalToday: 1,
};


