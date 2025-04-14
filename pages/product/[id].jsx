import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Product.module.css";

const Product = () => {
  const [size, setSize] = useState(0);
  const product = {
    id: 1,
    img: "/image/menu/1.png",
    name: "Cake",
    price: [20, 30, 40],
    desc: "Carrot Cake. Contains real carrot flavour.",
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={product.img}
            objectFit="contain"
            layout="fill"
            alt="product"
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.name}</h1>
        <span className={styles.price}>£{product.price[size]}</span>
        <p className={styles.desc}>{product.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src="/image/menu/1.png" layout="fill" alt="size-1" />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src="/image/menu/1.png" layout="fill" alt="size-2" />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <Image src="/image/menu/1.png" layout="fill" alt="size-3" />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          <div className={styles.option}>
            <input
              type="checkbox"
              id="double"
              name="double"
              className={styles.checkbox}
            />
            <label htmlFor="double">Double Ingredients</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="chocolate"
              name="chocolate"
            />
            <label htmlFor="chocolate">Extra chocolate</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="fruits"
              name="fruits"
            />
            <label htmlFor="spicy">Extra Fruits</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="candles"
              name="candles"
            />
            <label htmlFor="candles">Extra Candles</label>
          </div>
        </div>
        <div className={styles.add}>
          <input type="number" defaultValue={1} className={styles.quantity} />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
