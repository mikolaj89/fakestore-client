import Link from "next/link";
import styles from "../styles/layout.module.scss";
import Image from "next/image";
import CartIcon from "../../public/cart-icon.svg";
import { useCart } from "@/providers/CartProvider";

export const Navbar = () => {
  const { cartItemsCount} = useCart();
  
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <Link href="/">Home</Link>
        <Link className={styles.cartLink} href="/cart">
          <Image
            className={styles.cartIcon}
            src={CartIcon}
            alt="Shopping cart"
          /> 
          {cartItemsCount > 0 && <span>{cartItemsCount}</span>}
        </Link>
      </div>
    </nav>
  );
};
