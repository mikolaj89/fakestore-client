import { CategoryName } from "@/types/types";
import styles from "./CategoriesList.module.scss";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/utils/text-utils";

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
          <Link href={`/category/${category}`}> {capitalizeFirstLetter(category)}</Link>
        </li>
      ))}
    </ul>
  );
};
