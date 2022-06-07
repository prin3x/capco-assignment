import { useContext, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

function Navbar() {
  const { onSearch, navigationState, setNavigationState } =
    useContext(SearchContext);

  let navigate = useNavigate();
  let location = useLocation();

  const debounce = (func: any) => {
    let timer: any;
    return (args: any) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func(args);
      }, 500);
    };
  };

  const onChangeCategory = (pathname: string) => {
    const foundPathname = navigationState.find((path) =>
      path.href.startsWith(pathname)
    );
    if (!foundPathname) return navigate("/404");
    const nextState = navigationState.map((nav) => {
      nav.href === pathname ? (nav.current = true) : (nav.current = false);
      return nav;
    });
    setNavigationState(nextState);
  };
  useEffect(() => {
    if (location.pathname === "/") {
      return navigate("/news");
    }
    onChangeCategory(location.pathname);
  }, [location.pathname]);

  return (
    <Disclosure as="nav" className="bg-black">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-20">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className=" flex items-center justify-between sm:items-stretch sm:justify-between w-full">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/news" role="logo">
                    <div
                      className="text-sm sm:text-4xl font-party text-white cursor-pointer ml-12 md:ml-0 font-bold"
                      onClick={() => {
                        onChangeCategory("/news");
                      }}
                      role="banner"
                    >
                      UNBRANDED ORG.
                    </div>
                  </Link>
                </div>
                <div className="relative  md:hidden">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    onChange={debounce(onSearch)}
                    type="search"
                    className="block w-[100%] md:hidden p-2 pl-8 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Title, Desc..."
                  />
                </div>
                <div className="hidden md:block sm:ml-6 h-full">
                  <div className="flex space-x-4 items-center">
                    {navigationState.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => onChangeCategory(item.href)}
                      >
                        <Link to={item.href}>
                          <div
                            data-testid={`${item.name}-link`}
                            className={`${
                              item.current
                                ? "bg-amber-400 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                            }
                          'px-3 py-2 rounded-md text-sm font-medium cursor-pointer w-20 text-center ease-in-out duration-100`}
                          >
                            {item.name}
                          </div>
                        </Link>
                      </div>
                    ))}
                    <div className="relative">
                      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                        </svg>
                      </div>
                      {
                        // eslint-disable-next-line jsx-a11y/no-redundant-roles
                      }{" "}
                      <input
                        role="textbox"
                        onChange={debounce(onSearch)}
                        type="search"
                        className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search Title, Desc..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationState.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="div"
                  onClick={() => onChangeCategory(item.href)}
                  className={`${
                    item.current
                      ? "bg-amber-400 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                    block px-3 py-2 rounded-md text-base font-medium`}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
