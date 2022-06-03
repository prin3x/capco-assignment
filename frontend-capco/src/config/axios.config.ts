import axios from "axios";
import appConfig from "./app.config";

axios.interceptors.request.use(async (config: any) => {
  config.baseURL = appConfig.API_BASE_URL;
  return config;
});


export default axios;