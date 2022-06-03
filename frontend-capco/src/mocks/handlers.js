// src/mocks/handlers.js
import { rest } from "msw";
import jsonMock from "./productData";

export const handlers = [
  //   This handler responds to requests to http://localhost:8080/api/v1/products
  rest.get("http://127.0.0.1:8080/api/v1/products", (req, res, ctx) => {
    const category = req.url.searchParams.get("category");
    let page = req.url.searchParams.get("page");
    let limit = req.url.searchParams.get("limit");

    limit = +limit || 10;
    page = +page || 1;

    const offset = (page - 1) * limit;

    const jsonResponse = {};

    if (category) {
      jsonResponse.items = jsonMock.filter(
        (item) => item.category === category
      );
    }

    jsonResponse.total = jsonResponse.items.length;
    jsonResponse.page = page;
    jsonResponse.items = jsonResponse.items.slice(offset, offset + limit);

    return res(ctx.status(200), ctx.json(jsonResponse));
  }),
];
