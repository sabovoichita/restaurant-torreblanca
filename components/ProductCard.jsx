import styles from "../styles/ProductCard.module.css";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ product }) => {
  const rawImgUrl = product.img || "";
  const decodedImg = decodeURIComponent(rawImgUrl);
  const isExternal = decodedImg.startsWith("http");
  const fallbackImg = "/image/logo/truscai-logo.png";
  const imageSrc = isExternal
    ? decodedImg
    : `/image/menu/${rawImgUrl}${
        /\.(png|jpe?g|webp)$/i.test(rawImgUrl) ? "" : ".png"
      }`;
  // console.log("Product image:", rawImgUrl);
  // console.log("Decoded image:", decodedImg);
  return (
    <div className={styles.container}>
      <Link href={`/product/${product._id}`}>
        <Image
          src={imageSrc || fallbackImg}
          alt={product.title || "Product image"}
          width={400}
          height={400}
          unoptimized={isExternal}
        />
      </Link>
      <h1 className={styles.title}>{product.title}</h1>
      <span className={styles.price}>{product.prices[0]}</span>
      <p className={styles.desc}>{product.desc}</p>
    </div>
  );
};

export default ProductCard;
