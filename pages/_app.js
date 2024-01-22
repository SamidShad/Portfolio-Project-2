import "@/styles/globals.css";
import Navbar from "./Components/Navbar/Navbar";
import Head from "next/head";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <Head>
        <title>TheBlogist - Short Blogs for Quick Insights</title>
        <link rel="icon" href="/logo.png" />
        <meta
          name="description"
          content="Discover concise and insightful short blogs on various topics. Stay informed and entertained with our quick-read articles."
        />
        <meta
          name="keywords"
          content="short blogs, quick insights, brief articles, concise information"
        />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Navbar setSearchText={setSearchText} searchText={searchText} />
      <Component {...pageProps} searchText={searchText} />
      <Footer />
    </>
  );
}
