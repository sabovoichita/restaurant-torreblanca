import Image from "next/image";
import styles from "../styles/Navbar.module.css";
// import { useSelector } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const quantity = useSelector((state) => state.cart.quantity);

  if (!isClient) return null;
  // const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.imgContainer}>
          <Image
            src="/image/logo/truscai-logo.png"
            alt="logo"
            width="90"
            height="90"
          />
        </div>

        <div className={styles.texts}>
          <div className={styles.text}>PLACE ORDER!</div>
          <div className={styles.text}>123456789</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href={"/"}>
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href={"/cart"}>
        <div className={styles.item}>
          <div className={styles.cart}>
            {/* <div className={styles.counter}>2</div> */}
            <Image
              src="/image/icons/icons-cart.svg"
              alt="logo"
              width="40"
              height="40"
            />
            {isClient && <div className={styles.counter}>{quantity}</div>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
