export class Product {
  _id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}
export interface IBasicPorductQuery {
  _id?: string;
  page: number;
  limit: number;
  category?: EProductCategory;
  search: string;
}

export enum EProductCategory {
  NEWS = 'news',
  REGIONS = 'regions',
  VIDEO = 'video',
  TV = 'tv',
}

export interface IProductQueryReply {
  items: Product[];
  total: number;
  page: number;
}
