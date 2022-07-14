import { client } from '../lib/client'
import styles from '../styles/Home.module.scss'
import PostCarousel from '../components/PostCarousel/PostCarousel';
import ShowPost from '../components/Post/ShowPost';

export default function Home({posts}) {


  return (
    <>
    <div className={styles.container}>
      <div>
        <PostCarousel posts={posts} />
      </div>

      <div>
        <ShowPost posts={posts} />
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