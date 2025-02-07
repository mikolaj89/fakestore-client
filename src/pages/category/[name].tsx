import { getCategoryItems } from "@/apis/fakestore-api";
import { BreadCrumbs } from "@/components/Category/BreadCrumbs";
import { CategoryProductsList } from "@/components/Category/CategoryProductsList";
import { CategoryProduct } from "@/types/types";
import { capitalizeFirstLetter } from "@/utils/text-utils";
import { GetServerSideProps } from "next";
import Head from "next/head";

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
  const categoryName = capitalizeFirstLetter(name);
  return (
    <>
    <Head>
      <title>FakeStore - {categoryName} category</title>
      <meta
        name="description"
        content={`Products in ${categoryName} category`}
      />
      <meta name="robots" content="index, follow" />
      <meta
        property="og:title"
        content={`FakeStore - ${categoryName} category`}
      />
      <meta
        property="og:description"
        content={`Products in ${categoryName} category`}
      />
      <meta property="og:type" content="website" />
    </Head>
    
      <BreadCrumbs categoryName={name} />
      <header>
      <h1>
        {categoryName}: {categoryProducts.length}
      </h1>
      </header>
      <CategoryProductsList categoryProducts={categoryProducts} />
    
    </>
  );
};

export default CategoryPage;
