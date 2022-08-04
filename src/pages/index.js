import { client } from "../lib/client";
import styles from "../styles/Home.module.scss";
import PostCarousel from "../components/PostCarousel/PostCarousel";
import ShowPost from "../components/AllPost/ShowPost";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import Category from "../components/CategoryCard/Category";
import useStore from "../store/mainStore";

export default function Home({ posts }) {
  // ZUSTAND
  const whiceCat = useStore((state) => state.whiceCat);
  const setWhiceCat = useStore((state) => state.setWhiceCat);

  setTimeout(() => setWhiceCat("Linux"), 5000);
  console.log(whiceCat);
  const recentPost = posts.slice(0, 3);

  const showPost = posts.filter((arr) => {
    if (whiceCat == "Home") return arr;
    else return arr.categories[0].title == whiceCat;
  });

  showPost.slice(0, 4);
  return (
    <>
      <div className={styles.container}>
        <div>
          <PostCarousel posts={posts} />
        </div>

        <div className={styles.MainContNrecentPost}>
          <ShowPost posts={showPost} />
          <div className={styles.Cards}>
            <RecentPosts posts={recentPost} />
            <Category post={posts} />
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
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
    categories[] -> {
    title
    },

  }`;

  const posts = await client.fetch(query);
  return {
    props: {
      posts: posts,
    },
  };
};
