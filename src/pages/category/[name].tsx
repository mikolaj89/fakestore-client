import { getCategoryItems } from "@/apis/fakestore-api";
import { BreadCrumbs } from "@/components/Category/BreadCrumbs";
import { CategoryProductsList } from "@/components/Category/CategoryProductsList";
import { CategoryProduct } from "@/types/types";
import { capitalizeFirstLetter } from "@/utils/text-utils";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params ?? {};
  if (!name || typeof name !== "string") {
    return { notFound: true };
  }

  let categoryProducts: CategoryProduct[];

  try {
    categoryProducts = await getCategoryItems(name);
  } catch (error) {
    console.error("Error fetching category items:", error);

    return {
      redirect: {
        destination: "/error",
        permanent: false,
      },
    };
  }

  return { props: { categoryProducts, name } };
};

const CategoryPage = ({
  categoryProducts,
  name,
}: {
  categoryProducts: CategoryProduct[];
  name: string;
}) => {
  return (
    <div>
      <BreadCrumbs categoryName={name} />
      <h1>
        {capitalizeFirstLetter(name)}: {categoryProducts.length}
      </h1>
      <CategoryProductsList categoryProducts={categoryProducts} />
    </div>
  );
};

export default CategoryPage;
