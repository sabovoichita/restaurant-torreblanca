"use client";
import Image from "next/image";
import styles from "../styles/Slider.module.css";
import { useState } from "react";

const Slider = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/image/menu/burger.jpg",
    "/image/menu/ciorba.jpg",
    "/image/menu/ciuletavita.jpg",
    "/image/menu/cozonac.jpg",
    "/image/menu/crochete.jpg",
    "/image/menu/peste.jpg",
    "/image/menu/pizza.jpg",
    "/image/menu/pui.jpg",
    "/image/menu/rabo.jpg",
    "/image/menu/scoici.jpg",
    "/image/menu/toast.jpg",
    "/image/menu/aperitiv.jpg",
    "/image/menu/baby.jpg",
    "/image/menu/biscuitcake.jpg",
    "/image/menu/burger1.jpg",
    "/image/menu/ciorba1.jpg",
    "/image/menu/clafoitois.jpg",
    "/image/menu/fasole.jpg",
    "/image/menu/gambas.jpg",
    "/image/menu/paella.jpg",
    "/image/menu/patatas.jpg",
    "/image/menu/salatacapra.jpg",
    "/image/menu/saratele.jpg",
    "/image/menu/sepia.jpg",
    "/image/menu/tunasalad.jpg",
    "/image/menu/tavalita.jpg",
  ];

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : images.length - 1);
    }
    if (direction === "r") {
      setIndex(index !== images.length - 1 ? index + 1 : 0);
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        <Image
          src="/image/arrows/arrow-left.svg"
          width={100}
          height={100}
          alt="arrow-left"
        />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image
              src={img}
              width={600}
              height={400}
              alt={`image-${i}`}
              id={`${i}`}
            />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <Image
          src="/image/arrows/arrow-right.svg"
          width={100}
          height={100}
          alt="arrow-right"
        />
      </div>
    </div>
  );
};
export default Slider;
