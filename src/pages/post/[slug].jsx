import { client } from "../../lib/client";
import OnePost from "../../components/OnePost/OnePost";

export default function Post({ post, category }) {
  return (
    <>
      <OnePost post={post} category={category} />
    </>
  );
}

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
    slug {
        current
    }
  }`;

  const allPaths = await client.fetch(query);

  const paths = allPaths.map((e) => {
    return {
      params: {
        slug: e.slug.current,
      },
    };
  });
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  // QUERY
  const onePost = `*[_type == 'post' && slug.current == '${params.slug}'][0]{
    _id,
    url,
    _updatedAt,
    slug,
    title,
    body,
    mainImage,
    categories,
    
    author -> {
    name,
    image
    },
    
    'comments': *[
    _type == "comment" && 
    post._ref == ^._id && 
    approved == true],
    
    categories[] -> {
    title
    },
  }`;

  // POST
  const post = await client.fetch(onePost);

  // CATEGORY
  const categoryQuery = `*[_type == "category"]`;
  const cat = await client.fetch(categoryQuery);
  const category = cat.filter((cat) => {
    return cat._id == post.categories[0]._ref;
  });

  console.log(category);
  return {
    props: {
      post: post,
      category: category,
    },
  };
};
