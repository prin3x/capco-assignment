import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../layouts/Navbar";
import userEvent from "@testing-library/user-event";
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

test("Return true if all navbar display text are present in order", () => {
  render(<Wrapper children={<Navbar />} />);
  const navItems = screen.getAllByRole("link");

  expect(navItems).toHaveLength(4);

  expect(navItems[0].textContent).toBe("News");
  expect(navItems[1].textContent).toBe("Video");
  expect(navItems[2].textContent).toBe("TV");
  expect(navItems[3].textContent).toBe("Regions");
});

const activeBG = "bg-amber-400";

test("should switch color on click", () => {
  render(<Wrapper children={<Navbar />} />);
  const navItems = screen.getAllByRole("link");

  expect(navItems).toHaveLength(4);

  const navItemChild = screen.getAllByTestId(/-link$/);

  navItems.forEach((_, idx) => {
    userEvent.click(navItems[idx]);
    expect(navItemChild[idx]?.className).toContain(activeBG);
  });
});

test("should go back to homepage when click logo", () => {
  render(<Wrapper children={<Navbar />} />);
  const logoBanner = screen.getByRole("banner");
  expect(logoBanner).toBeInTheDocument();

  userEvent.click(logoBanner);
  expect(window.location.href).toEqual("http://localhost/news");
});

test("should change pathname on click link", () => {
  render(<Wrapper children={<Navbar />} />);
  const navItems = screen.getAllByRole("link");

  navItems.forEach((_, idx) => {
    userEvent.click(navItems[idx]);
    expect(window.location.href).toEqual(
      `http://localhost/${navItems[idx].textContent?.toLowerCase()}`
    );
  });
});
