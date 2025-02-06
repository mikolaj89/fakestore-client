import "@/styles/globals.css";
import type { AppProps } from "next/app";

import styles from "../styles/layout.module.scss";
import { CartProvider } from "@/providers/CartProvider";

import { Navbar } from "@/components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Navbar/>
      <div className={styles.container}>
        
        <Component {...pageProps} />
      </div>
    </CartProvider>
  );
}
