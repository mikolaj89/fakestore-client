import { CategoryProduct } from "@/types/types";
import styles from "./CategoryProductsList.module.scss";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/utils/text-utils";
import { useCart } from "@/providers/CartProvider";
import { addToCartPOST } from "@/apis/fakestore-api";

const DEFAULT_QUANTITY = 1;

const ProductItem = ({ product }: { product: CategoryProduct }) => {
  const cartState = useCart();

  const onAddToCart = async (product: CategoryProduct) => {
    try {

      //  API request is just to show intent (here it doesn't persist data in BE). In real life scenario, after successful POST, we would:
      // 1. trigger FETCH_SUCCESS state action
      // 2. re-fetch fresh cart from API (if not returned from this response)
      // 3. trigger a state update such UPDATE_CART
      await addToCartPOST(product.id, DEFAULT_QUANTITY);
      cartState.addToCart(product, DEFAULT_QUANTITY);
      alert("Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart. Please try again.");
    }
  };

  return (
    <li className={styles.productItem}>
      <Link
        className={styles.imageWrapper}
        href={`/product/${product.id}`} //TODO: Add product page https://fake-jira-issue.com
      >
        <Image
          width={200}
          height={200}
          src={product.image}
          alt={product.title}
          className={styles.productImage}
        />
      </Link>
      <p className={styles.productTitle}>{product.title}</p>
      <p className={styles.price}>{formatPrice(parseInt(product.price))}</p>
      <button
        type="button"
        className={styles.addToCartBtn}
        onClick={() => onAddToCart(product)}
      >
        Add to cart
      </button>
    </li>
  );
};

export const CategoryProductsList = ({
  categoryProducts,
}: {
  categoryProducts: CategoryProduct[];
}) => {
  return (
    <ul className={styles.categoryProductsList}>
      {categoryProducts.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </ul>
  );
};
