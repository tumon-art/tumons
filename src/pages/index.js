import { useState } from "react";
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
  const setSidebar = useStore((state) => state.setSidebar);

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // RECENT POST
  const recentPost = posts.slice(0, 3);

  // SHOW POST
  const showPost = posts.filter((arr) => {
    if (whiceCat == "Home") return arr;
    else return arr.categories[0].title == whiceCat;
  });

  // ON TOUCH START
  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    if (window || sidebar) setSidebar(false);
  };

  // ON TOUCH MOVE
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // ON TOUCH END
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    // const leftSwipe = distance > 50;
    const rightSwipe = distance < -50;
    console.log(distance);

    if (rightSwipe) setSidebar(false);
  };

  return (
    <>
      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className={styles.container}
      >
        <div>
          <PostCarousel posts={posts} />
        </div>

        <div className={styles.MainContNrecentPost}>
          <ShowPost posts={showPost.slice(0, 4)} />
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
