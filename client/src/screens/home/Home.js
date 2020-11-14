import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import classes from "./Home.module.css";
import { ProductList, Sidebar } from "../../containers";
import fetchHook from "./fetchHook";

const HomeScreen = ({ history }) => {
  const {
    Products,
    Brands,
    Categories,
    handleFilters,
    handleSearch,
  } = fetchHook();

  useEffect(
    () =>
      history.listen((location) => {
        handleSearch(location.search.substring(3));
      }),
    [history, handleSearch]
  );

  return (
    <div className={[classes.HomeScreen, "screen"].join(" ")}>
      <aside>
        <Sidebar
          categories={Categories}
          brands={Brands}
          handleFilters={handleFilters}
          handleSearch={handleSearch}
        />
      </aside>
      <main className="vertical-layout">
        <ProductList products={Products} />
      </main>
    </div>
  );
};

export default withRouter(HomeScreen);
