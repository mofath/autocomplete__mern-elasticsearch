import { useState, useEffect, useCallback } from "react";
import { filterProductsService } from "../../_service";
import { loadProducts } from "../../graphql/requests"


const INTIAL_FILTER = {
  categories: [],
  brands: [],
  price: [],
};

const useFetch = (props) => {
  // states
  const [Products, setProducts] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [Filters, setFilters] = useState({ ...INTIAL_FILTER });

  // methods
  const getProducts = useCallback(async () => {
    const { error, data } = await loadProducts();
    !error && setProducts([...data.products]);
  }, []);


  const filterProducts = useCallback(async (queryParams) => {
    const { results, msgError } = await filterProductsService(
      queryParams
    ).read();
    !msgError && setProducts([...results]);
  }, []);

  const handleFilters = useCallback(
    (filter, newCheckedItem) => {
      const newFilters = { ...Filters };
      newFilters[filter] = newCheckedItem;
      setFilters(newFilters);
      const newQueryParams = {
        ...{
          filters: newFilters,
        },
      };
      filterProducts(newQueryParams);
    },
    [Filters, filterProducts]
  );

  const handleSearch = (newSearchTerm) => {
    const newQueryParams = {
      filters: { ...Filters },
      searchTerm: newSearchTerm,
    };
    filterProducts(newQueryParams);
  };

  // effects
  useEffect(getProducts, [getProducts]);

  useEffect(() => {
    const brands = [...new Set(Products.map((product) => product.brand))];
    const categories = [
      ...new Set(Products.map((product) => product.category.name)),
    ];
    setBrands(() => [...brands]);
    setCategories(() => [...categories]);
  }, [Products]);

  return {
    Products,
    Brands,
    Categories,
    handleFilters,
    handleSearch,
  };
};

export default useFetch;
