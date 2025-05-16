import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import Slider from "@/components/Slider";
import ProductList from "@/components/ProductList";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import Add from "@/components/Add";
import AddButton from "@/components/AddButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({ productList, admin }) {
  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Torreblanca Restaurant</title>
        <meta name="description" content="Best restaurant in Torreblanca" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {admin && <AddButton setClose={setClose} />}
      <ProductList productList={productList} />
      {!close && <Add setClose={setClose} />}

      {/* {!close && <span>Hello</span>} */}
      <Slider />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  }
  try {
    const res = await axios.get("http://localhost:3000/api/products");
    return {
      props: {
        productList: res.data,
        admin,
      },
    };
  } catch (err) {
    console.error("getServerSideProps error:", err.message);
    return {
      props: {
        productList: [],
      },
    };
  }
};
