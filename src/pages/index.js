import { client } from '../lib/client'
import styles from '../styles/Home.module.scss'
import PostCarousel from '../components/PostCarousel/PostCarousel';
import ShowPost from '../components/AllPost/ShowPost';
import RecentPosts from '../components/RecentPosts/RecentPosts';
import Category from '../components/CategoryCard/Category';

export default function Home({posts,category}) {

  const recentPost = posts.slice(0,3)
  const showPost = posts.slice(0,4)

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
        <Category category={category} />
       </div>
      </div>
    </div>
    </>
  )
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
  }
  }`;

  const category = `*[_type == "category"]{
    title,}`;

  const posts = await client.fetch(query);
  const cat = await client.fetch(category);
  return {
    props: {
      posts : posts,
      category: cat
    }
  }
}
