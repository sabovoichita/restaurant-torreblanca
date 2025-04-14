import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import Slider from "@/components/Slider";
import ProductList from "@/components/ProductList";
import styles from "../styles/Home.module.css";
import axios from "axios";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({ productList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Torreblanca Restaurant</title>
        <meta name="description" content="Best restaurant in Torreblanca" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Slider />
      <ProductList productList={productList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      productList: res.data,
    },
  };
};
