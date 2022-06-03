import {
  createContext,
  Dispatch,
  ReactNode,
  useState,
  useTransition,
} from "react";
import { EProductCategory } from "../models/products.model";

export interface ISearchContext {
  onSearch: (event: any) => void;
  searchString: string;
  isPendingSearch: boolean;
  navigationState: INavigationState[];
  setNavigationState: Dispatch<INavigationState[]>;
}

export interface INavigationState {
  name: string;
  href: string;
  category: EProductCategory;
  current: boolean;
}

export const navigation: INavigationState[] = [
  {
    name: "News",
    href: "/news",
    category: EProductCategory.NEWS,
    current: true,
  },
  {
    name: "Video",
    href: "/video",
    category: EProductCategory.VIDEO,
    current: false,
  },
  { name: "TV", href: "/tv", category: EProductCategory.TV, current: false },
  {
    name: "Regions",
    href: "/regions",
    category: EProductCategory.REGIONS,
    current: false,
  },
];

export const SearchContext = createContext<ISearchContext>(
  {} as ISearchContext
);

type Props = {
  children: ReactNode;
};
export function SearchProvider({ children }: Props) {
  const [navigationState, setNavigationState] =
    useState<INavigationState[]>(navigation);
  const [isPending, startTransition] = useTransition();
  const [searchString, setSearchString] = useState("");

  const onSearch = (event: any) => {
    startTransition(() => {
      setSearchString(event.target.value);
    });
  };

  return (
    <SearchContext.Provider
      value={{
        onSearch,
        searchString,
        isPendingSearch: isPending,
        navigationState,
        setNavigationState,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
