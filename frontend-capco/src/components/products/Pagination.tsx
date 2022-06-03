import { useMemo } from "react";

type Props = {
  page: number;
  totalItems: number;
  onChangePage: (page: number) => void;
  currentPage: number;
};

function Pagination({ page, totalItems, onChangePage, currentPage }: Props) {
  const totalPage = useMemo(() => {
    return Math.ceil(totalItems / 10) + 1;
  }, [page, totalItems]);
  return (
    <div className="w-full flex justify-end" data-testid='pagination'>
      {totalPage > 1 && (
        <ul className="inline-flex items-center -space-x-px ">
          <li
            className="cursor-pointer"
            onClick={() => onChangePage(currentPage - 1)}
          >
            <div className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </li>
          {Array.from(Array(totalPage || 1).keys())
            .slice(1)
            .map((pageNumber) => (
              <li
                key={pageNumber}
                className="cursor-pointer"
                onClick={() => onChangePage(pageNumber)}
              >
                <div
                  className={`${
                    currentPage === pageNumber ? "bg-slate-100" : "bg-white"
                  } py-2 px-3 leading-tight text-gray-500 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                  data-testid="page-number"
                >
                  {pageNumber}
                </div>
              </li>
            ))}
          <li
            className="cursor-pointer"
            onClick={() =>
              onChangePage(
                currentPage + 1 >= totalPage ? currentPage : currentPage + 1
              )
            }
          >
            <div className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Pagination;
