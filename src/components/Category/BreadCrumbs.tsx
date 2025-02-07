import Link from "next/link";
import styles from "./BreadCrumbs.module.scss";
import { capitalizeFirstLetter } from "@/utils/text-utils";

export const BreadCrumbs = ({ categoryName }: { categoryName: string }) => (
  <div className={styles.breadCrumbs}>
    <Link className={styles.link} href="/">
      Home
    </Link>
    {" / "}
    <Link className={styles.link} href="/">
      Categories
    </Link>
    {" / "}
    <span className={styles.active}>{capitalizeFirstLetter(categoryName)}</span>
  </div>
);
