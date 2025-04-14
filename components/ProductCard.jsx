import styles from "../styles/ProductCard.module.css";
import Image from "next/image";

const ProductCard = ({ imgNo, title, desc, price }) => {
  return (
    <div className={styles.container}>
      <Image
        src={`/image/menu/${imgNo}.png`}
        alt={title}
        width="500"
        height="500"
      />
      <h1 className={styles.title}>{title}</h1>
      <span className={styles.price}>{price}</span>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
};
export default ProductCard;
