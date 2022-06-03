import { render, waitFor, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../App";
import { SearchProvider } from "../context/SearchContext";
import productData from "../mocks/productData";

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

test("First Load", async () => {
  render(<Wrapper children={<App />} />);
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
});

test("Change category and load items", async () => {
  render(<Wrapper children={<App />} />);
  const navItems = screen.getAllByRole("link");

  expect(navItems).toHaveLength(4);

  expect(navItems[0].textContent).toBe("News");
  expect(navItems[1].textContent).toBe("Video");
  expect(navItems[2].textContent).toBe("TV");
  expect(navItems[3].textContent).toBe("Regions");

  fireEvent.click(navItems[1]);

  await waitFor(async () => {
    const products = await screen.findAllByRole("img");

    const productTitles = products.map(
      (product) => (product as HTMLInputElement).alt
    );

    expect(productTitles).toEqual(
      productData
        .filter((item) => item.category === "video")
        .slice(0, 10)
        .map((data) => data.title)
    );
  });
});

test("Return search items", async () => {
  render(<Wrapper children={<App />} />);
  const products = screen.queryAllByRole("img");

  expect((products[0] as HTMLInputElement).alt).toEqual(
    "Independence Contract Drilling, Inc."
  );

  const searchInput = screen.getByRole("textbox");

  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: "fintech" } });

  await waitFor(
    () => expect((searchInput as HTMLInputElement).value).toEqual("fintech"),
    { timeout: 1000 }
  );

  const newProducts = await screen.findAllByAltText(/FinTech/i);

  const productTitles = newProducts.map(
    (product) => (product as HTMLInputElement).alt
  );

  expect(productTitles[0]).toContain("FinTech");
});


test('Dialog on click item', async () => {
  render(<Wrapper children={<App />} />);
  
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

  const products = screen.queryAllByRole("img");

  expect(products[0]).toBeInTheDocument();



})