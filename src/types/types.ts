import { ChangeEvent, FormEvent, ReactElement, ReactNode, Ref } from "react";
import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../services";
import { IWSOrder } from "./wsTypes";

type TVoidFunc = () => void;

export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  dragId?: string;
  count?: number;
}

export type TIngredientDetails = Omit<
  IIngredient,
  "_id" | "type" | "price" | "image_mobile" | "image" | "__v"
>;

export interface ICardProps {
  item: IIngredient;
}

export interface IModalProps {
  onClose: TVoidFunc;
  children: ReactNode;
  title?: string;
  selectedCard?: IIngredient | {};
}

export type TModalOverlayProps = Omit<IModalProps, "title" | "selectedCard" | "children">;

export interface IBurgerConstructorProps {
  handleOpenOrder: TVoidFunc;
}

export interface ICardListProps {
  arr: IIngredient[];
  title: string;
  ref: Ref<HTMLHeadingElement>;
}

export interface IOrderedIngredientProps {
  item: IIngredient;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

export interface IOrder {
  name?: string;
  order?: {
    number: number;
  };
  success?: boolean;
}

export interface IOrderDetailsProps {
  order: IOrder;
}

export enum cardActionTypes {
  GET_CARD = "GET_CARD",
  DELETE_CARD = "DELETE_CARD",
}

export enum orderActionTypes {
  GET_ORDER_DETAILS = "GET_ORDER_DETAILS",
}

export enum burgerActionTypes {
  ADD_INGREDIENT = "ADD_INGREDIENT",
  DELETE_INGREDIENT = "DELETE_INGREDIENT",
  UPDATE_LIST = "UPDATE_LIST",
  SET_CURRENT_BUN = "SET_CURRENT_BUN",
}

export enum requestActionTypes {
  GET_DATA_REQUEST = "GET_DATA_REQUEST",
  GET_DATA_FAILED = "GET_DATA_FAILED",
}

export interface IOptions {
  [key: string]: boolean;
}

export interface IFormProps {
  title: string;
  buttonText: string;
  handleSubmit: (evt: FormEvent) => void;
  isValid: boolean;
  errors: IErrors;
  values: IUser;
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

export interface IUser {
  name?: string;
  email?: string;
  password?: string;
  code?: string;
}

export enum updateUserActionTypes {
  UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST",
  UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS",
  UPDATE_USER_FAILED = "UPDATE_USER_FAILED",
}

export interface ICookieProps {
  path?: string;
  expires?: Date | string | number | any;
  [propName: string]: any;
}

export interface IProtectedRouteProps {
  onlyUnAuth?: boolean;
  children: ReactElement;
  background?: Location;
}

export interface IIngredientDetailsPageProps {
  children: ReactNode;
}

export interface IErrors {
  [key: string]: string;
}

export enum orderItemActionTypes {
  GET_ORDER_ITEM = "GET_ORDER_ITEM",
  DELETE_ORDER_ITEM = "DELETE_ORDER_ITEM",
}

export interface IOrderCardProps {
  item: IWSOrder;
  status?: any;
}

export interface ICount {
  [key: string]: number;
}

export type TNewIngredient = IIngredient & { count: number };

export type ThunkActionType = ThunkAction<void, RootState, unknown, AnyAction>;
