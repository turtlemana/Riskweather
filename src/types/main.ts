import { StaticImageData } from "next/image";

export interface Colors {
  [index: string]: string;
  Low: string;
  Moderate: string;
  High: string;
  VeryHigh: string;
}

export interface Card {
  id: number;
  name: string;
  subName: string;
  risk: string;
  maximumLoss: number;
  weather: string;
  price?: number;
  weatherIcon: string;
  image?: StaticImageData;
  chartImage?: StaticImageData;
  date?: string;
  priceChange?: string;
}

export interface Menus {
  id: number;
  title: string;
  list: Card[];
}

export interface News {
  id: number;
  image: StaticImageData;
  title: string;
  subTitle: string;
  date: string;
}
