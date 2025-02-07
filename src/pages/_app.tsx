import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/providers/CartProvider";

import { Navbar } from "@/components/Navbar/Navbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Navbar />
      <main aria-label="Main content" className="container">
        <Component {...pageProps} />
      </main>
    </CartProvider>
  );
}
