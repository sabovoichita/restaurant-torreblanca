import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>OH YES, WE HAVE THE BEST FOOD</h2>
          <h2 className={styles.motto}>IN THE VILLAGE</h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANT</h1>
          <p className={styles.text}>
            Torreblanca
            <br /> Calle San Antoni 1
            <br /> (34) 123456
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY - FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
        <div className={styles.item}>
          <div className={styles.imgContainer}>
            <Image
              src="/image/logo/truscai-logo.png"
              width={30}
              height={30}
              alt="background"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
