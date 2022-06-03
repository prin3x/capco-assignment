import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ProductCardsContainer from "../components/products/ProductCardsContainer";
import productData from "../mocks/productData";
import { Product } from "../models/products.model";
import { SearchProvider } from "../context/SearchContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const Wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <SearchProvider>{children}</SearchProvider>
    </Router>
  </QueryClientProvider>
);

describe("load page", () => {
  test("Display News Category on first landing", async () => {
    render(<Wrapper children={<ProductCardsContainer />} />);
    await waitFor(async () => {
      const categoryHeader = await screen.findByRole("heading");
      expect(categoryHeader.textContent).toBe("News");
    });
  });

  test("Load 10 initial products", async () => {
    render(<Wrapper children={<ProductCardsContainer />} />);
    await waitFor(async () => {
      const products = await screen.findAllByRole("img");

      const productTitles = products.map(
        (product) => (product as HTMLInputElement).alt
      );

      expect(productTitles).toEqual(
        productData
          .filter((item) => item.category === "news")
          .slice(0, 10)
          .map((data) => data.title)
      );
    });

    const pagination = await screen.findAllByTestId("page-number");

    expect(pagination.length).toEqual(3);
    expect(pagination[0].className).toContain("bg-slate-100");

    fireEvent.click(pagination[1]);

    await waitFor(async () => {
      const newPagination = screen.getAllByTestId("page-number");
      expect(newPagination[1].className).toContain("bg-slate-100");
    });
  });

  test("Change page load another 10 feeds", async () => {
    render(<Wrapper children={<ProductCardsContainer />} />);

    const pagination = await screen.findAllByTestId("page-number");

    expect(pagination.length).toEqual(3);
    fireEvent.click(pagination[1]);

    await waitFor(async () => {
      const products = await screen.findAllByRole("img");

      const productTitles = products.map(
        (product) => (product as HTMLInputElement).alt
      );

      expect(productTitles).toEqual(
        productData
          .filter((item) => item.category === "news")
          .slice(10, 20)
          .map((data) => data.title)
      );
    });
  });

  test("Load Last Page", async () => {
    render(<Wrapper children={<ProductCardsContainer />} />);

    const pagination = await waitFor(
      async () => await screen.findAllByTestId("page-number")
    );

    expect(pagination.length).toEqual(3);
    fireEvent.click(pagination[2]);

    await waitFor(async () => {
      const products = await screen.findAllByRole("img");

      const productTitles = products.map(
        (product) => (product as HTMLInputElement).alt
      );

      expect(productTitles).toEqual(
        productData
          .filter((item) => item.category === "news")
          .slice(20, 30)
          .map((data) => data.title)
      );
    });
  });
});
