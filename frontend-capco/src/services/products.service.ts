import axios from "axios";
import appConfig from "../config/app.config";
import { IProductQueryReply } from "../models/products.model";

export async function _fetchProducts(queryString: string = ""): Promise<IProductQueryReply> {
  const response = await axios.get(`${appConfig.API_BASE_URL}/products${queryString ? '?' + queryString : ''}`);
  return response.data;
}