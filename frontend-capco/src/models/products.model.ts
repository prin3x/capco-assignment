export const QUERY_KEY_PRODUCTS = "query_products";

export class Product {
  public _id: string;
  public title: string;
  public description: string;
  public image: string;
  public category: string;
  public animation: string;

  constructor(
    _id: string,
    title: string,
    description: string,
    image: string,
    category: string,
    animation: string
  ) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.category = category;
    this.animation = animation;
  }
}

export interface IBasicPorductQuery {
  _id?: string;
  page: number;
  limit: number;
  category?: EProductCategory;
  search?: string;
}

export enum EProductCategory {
  NEWS = "news",
  REGIONS = "regions",
  VIDEO = "video",
  TV = "tv",
}

export interface IProductQueryReply {
  items: Product[];
  total: number;
  count: number;
  page: number;
}

export const INIT_QUERY: IBasicPorductQuery = {
  page: 1,
  limit: 10,
  category: EProductCategory.NEWS,
  search: "",
};
