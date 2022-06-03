import { useContext, useEffect, useState, useTransition } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import {
  EProductCategory,
  IBasicPorductQuery,
  INIT_QUERY,
  IProductQueryReply,
  Product,
  QUERY_KEY_PRODUCTS,
} from "../../models/products.model";
import Pagination from "./Pagination";
import ProductCards from "./ProductCards";
import ProductCardsLoader from "./ProductCardsLoader";
import ProductModal from "./ProductModal";
import * as queryStringMethod from "query-string";
import { _fetchProducts } from "../../services/products.service";
import FullScreenLoader from "../loader/FullScreenLoader";
import { SearchContext } from "../../context/SearchContext";

function ProductCardsContainer() {
  const { searchString, navigationState } = useContext(SearchContext);
  let location = useLocation();
  const [query, setQuery] = useState<IBasicPorductQuery>(INIT_QUERY);
  const [isFirstLoadPage, setIsFirstLoadPage] = useState(true);
  const { data, isLoading, isSuccess } = useQuery(
    [QUERY_KEY_PRODUCTS, { ...query }],
    () => getProducts(query)
  );
  const [selectedProduct, setSelectedProduct] = useState({
    product: {} as Product,
    isModalVisible: false,
  });

  const onSelectProduct = (productId: string) => {
    if (!data?.items?.[0]) return;
    const product = data?.items?.find(
      (productDetail: Product) => productDetail._id === productId
    );
    if (!product) return;
    setSelectedProduct({ product, isModalVisible: true });
  };

  const onCloseModal = () => {
    setSelectedProduct({ ...selectedProduct, isModalVisible: false });
  };

  const onChangePage = (page: number) => {
    let nextPage = page < 1 ? 1 : page;
    setQuery({ ...query, page: nextPage });
  };

  const getProducts = async (
    queryInterface: IBasicPorductQuery | undefined = undefined
  ) => {
    let data: IProductQueryReply = {} as IProductQueryReply;
    let queryString: string = "";
    if (!!queryInterface) {
      queryString = queryStringMethod.stringify(queryInterface);
    }

    try {
      data = await _fetchProducts(queryString);
    } catch (error) {
      console.log(error);
    }

    return data;
  };

  useEffect(() => {
    const prevQuery = Object.assign({}, query);
    prevQuery.category =
      navigationState.find((_nav) => _nav.current)?.category ||
      navigationState[0].category;

    setQuery(prevQuery);
  }, [navigationState]);

  useEffect(() => {
    setQuery({ ...query, search: searchString });
  }, [searchString]);

  useEffect(() => {
    if (isFirstLoadPage && !isLoading && isSuccess) {
      setIsFirstLoadPage(false);
      return;
    }
  }, [isLoading, isSuccess]);

  if (isFirstLoadPage && isLoading && !isSuccess) {
    return <FullScreenLoader />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-slate-100">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 sm:min-h-screen">
          <h1
            className="text-4xl font-extrabold tracking-tight text-gray-900 uppercase"
            data-testid="header"
            role="heading"
          >
            {location.pathname.split("/")[1] || "News"}
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {isLoading ? (
              <ProductCardsLoader total={4} />
            ) : isSuccess ? (
              data.items.map((product, index) => (
                <ProductCards
                  key={product._id}
                  product={product}
                  index={index}
                  onSelectProduct={onSelectProduct}
                />
              ))
            ) : null}
          </div>
        </div>
      </div>

      <Pagination
        page={query.page || 1}
        totalItems={data?.total || 0}
        onChangePage={onChangePage}
        currentPage={data?.page || 1}
      />
      <ProductModal
        product={selectedProduct.product}
        isVisible={selectedProduct.isModalVisible}
        onClose={onCloseModal}
      />
    </div>
  );
}

export default ProductCardsContainer;
