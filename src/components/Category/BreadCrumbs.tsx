import Link from "next/link";
import styles from "./BreadCrumbs.module.scss";
import { capitalizeFirstLetter } from "@/utils/text-utils";

export const BreadCrumbs = ({ categoryName }: { categoryName: string }) => (
  <div className={styles.breadCrumbs}>
    <Link className={styles.link} href="/">
      Home
    </Link>
    {" / "} <span> Category </span> {" / "}
    <span className={styles.active}>
      {capitalizeFirstLetter(categoryName)}
    </span>
  </div>
);
