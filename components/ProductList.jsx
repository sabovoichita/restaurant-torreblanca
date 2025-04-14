import styles from "../styles/ProductList.module.css";
import ProductCard from "@/components/ProductCard";

const ProductList = ({ productList }) => {
  return (
    <div className={styles.container}>
      <h1>Torreblanca Restaurant</h1>
      <h2>The best there is in the village</h2>
      <p className={styles.desc}>
        Order your favorite food from Torreblanca and get 20% off on minimum of
        £20
      </p>
      <div className={styles.wrapper}>
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default ProductList;
