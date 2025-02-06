import { CategoryName } from "@/types/types";
import styles from "../../styles/layout.module.scss";
import Link from "next/link";

export const CategoriesList = ({
  categories,
}: {
  categories: CategoryName[];
}) => {
  return (
    <ul className={styles.categoryList}>
      {/* items could be extracted to separate component if bigger */}
      {categories.map((category: string) => (
        <li key={category} className={styles.categoryItem}>
          <Link href={`/category/${category}`}>{category}</Link>
        </li>
      ))}
    </ul>
  );
};
