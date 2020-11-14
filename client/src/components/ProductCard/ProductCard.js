import classes from "./ProductCard.module.css";
import { thousandsSeparators } from "../../_utils";

const ProductCard = ({ product }) => {
  const getSalePrice = (price) => {
    const salePrice = Math.floor(price * 0.85);
    return thousandsSeparators(salePrice);
  };

  return (
    <div className={classes.ProductCard}>
      <div className={classes.ImageFrame}>
        <img src={product.image} alt="" />
      </div>
      <div className={classes.CardBody}>
        <div className={classes.PriceBox}>
          <div className={classes.PriceTag}>
            <h5>
              EGP&nbsp;
              {getSalePrice(product.price)}
            </h5>
          </div>
          {product.price && product.price < 1000 && product.price > 150 && (
            <div className={[classes.SaleBox, "vertical-layout"].join(" ")}>
              <span className={classes.OriginalPrice}>
                EGP&nbsp;{thousandsSeparators(Math.floor(product.price))}
              </span>
              <span>15% off</span>
            </div>
          )}
        </div>

        <h4 className={classes.Title}>{product.name}</h4>
      </div>
    </div>
  );
};

export default ProductCard;
