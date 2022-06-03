import { render, waitFor, screen } from "@testing-library/react";
import Pagination from "../components/products/Pagination";

describe("Pagiantion", () => {
  test("should return 5 pages", async () => {
    render(
      <Pagination
        page={1}
        totalItems={50}
        currentPage={1}
        onChangePage={() => null}
      />
    );
    const pagination = await waitFor(
      async () => await screen.findAllByTestId("page-number")
    );

    expect(pagination.length).toEqual(5);
  });

});
