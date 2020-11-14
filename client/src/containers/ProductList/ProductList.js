import { ProductCard } from "../../components";
import classes from "./ProductList.module.css";

function ProductList({ products }) {
  const RenderProductList = () =>
    products.map((product) => {
      return (
        <li key={product._id}>
          <ProductCard product={product} />
        </li>
      );
    });

  return (
    <div>
      {products.length === 0 ? (
        <h3>No products Found</h3>
      ) : (
        <ul className={classes.ProductList}>
          <RenderProductList />
        </ul>
      )}
    </div>
  );
}

export default ProductList;
