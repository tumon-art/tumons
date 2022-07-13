import { client } from '../lib/client'
import styles from '../styles/Home.module.scss'
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import PostCarousel from '../components/PostCarousel/PostCarousel';

export default function Home({posts}) {

  // const imageProps = useNextSanityImage(client, posts[0].mainImage.asset._ref);
  // console.log(imageProps)
  // console.log(posts[0].mainImage.asset._ref)

  return (
    <>
    <div className={styles.container}>
      <div>
        <PostCarousel posts={posts} />
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