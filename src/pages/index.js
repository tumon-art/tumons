import { client } from "../lib/client";
import styles from "../styles/Home.module.scss";
import PostCarousel from "../components/PostCarousel/PostCarousel";
import ShowPost from "../components/AllPost/ShowPost";
import RecentPosts from "../components/RecentPosts/RecentPosts";
import Category from "../components/CategoryCard/Category";

export default function Home({ posts }) {
  const recentPost = posts.slice(0, 3);
  // ALL POST TO SHOW IN HOME
  const showPost = posts.slice(0, 4);

  // GET CATEGORY
  const LinuxPosts = posts.filter((arr) => {
    return arr.categories[0].title == "Linux";
  });

  console.log(LinuxPosts);
  // console.log(posts[0].categories[0].title);
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
