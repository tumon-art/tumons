import { client } from '../lib/client'
import styles from '../styles/Home.module.scss'
import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";

export default function Home({posts}) {
  console.log(posts)

  // const imageProps = useNextSanityImage(client, posts[0].mainImage.asset._ref);
  // console.log(imageProps)
  // console.log(posts[0].mainImage.asset._ref)
  
  return (
    <>
    <div className={styles.container}>
      <div>
        {/* <Img /> */}
      </div>
    </div>
    </>
  )
}


export const getServerSideProps = async () => {

  const query = `*[_type == "post"]{
    _id,
    slug,
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