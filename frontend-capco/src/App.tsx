import ProductCardsContainer from "./components/products/ProductCardsContainer";
import { SearchProvider } from "./context/SearchContext";
import LayoutHOC from "./layouts/LayoutHOC";

function App() {
  return (
    <SearchProvider>
      <LayoutHOC>
        <ProductCardsContainer />
      </LayoutHOC>
    </SearchProvider>
  );
}

export default App;
