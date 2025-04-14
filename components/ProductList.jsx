import styles from "../styles/ProductList.module.css";
import ProductCard from "@/components/ProductCard";

const ProductList = () => {
  return (
    <div className={styles.container}>
      <h1>Torreblanca Restaurant</h1>
      <h2>The best there is in the village</h2>
      <p className={styles.desc}>
        Order your favorite food from Torreblanca and get 20% off on minimum of
        £20
      </p>
      <div className={styles.wrapper}>
        <ProductCard
          imgNo="1"
          title="Menu - 1"
          desc="menu-1 - ingredients"
          price="11 £"
        />
        <ProductCard
          imgNo="2"
          title="Menu - 2"
          desc="menu-2 - ingredients"
          price="12 £"
        />
        <ProductCard
          imgNo="3"
          title="Menu - 3"
          desc="menu-3 - ingredients"
          price="13 £"
        />
        <ProductCard
          imgNo="4"
          title="Menu - 4"
          desc="menu-4 - ingredients"
          price="14 £"
        />
      </div>
    </div>
  );
};
export default ProductList;
