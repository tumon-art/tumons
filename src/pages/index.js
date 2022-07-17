import { client } from '../lib/client'
import styles from '../styles/Home.module.scss'
import PostCarousel from '../components/PostCarousel/PostCarousel';
import ShowPost from '../components/Post/ShowPost';
import RecentPosts from '../components/RecentPosts/RecentPosts';

export default function Home({posts}) {

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
        <RecentPosts posts={recentPost} />
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
    mainImage,
    author -> {
    name,
    image
  }
  }`;

  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    }
  }
}