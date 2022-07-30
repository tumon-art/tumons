import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import { client } from "../../lib/client";
import styles from "./OnePost.module.scss";

const OnePost = ({ post, category }) => {
  const { body, title, mainImage } = post;

  console.log(post.author)

  // IMAGE PROPS
  const imageProps = useNextSanityImage(client, mainImage.asset._ref);

  const p = body.map((body) =>
    body.children.map((child) => child.text).join("")
  );

  return (
    <div className={styles.main}>
      <h1> {title} </h1>

      <span></span>
      <div className={styles.imgHold}>
        <Img {...imageProps} layout="responsive" />
      </div>

      <span> # {category[0].title} </span>
      <p> {p} </p>

    </div>
  );
};
export default OnePost;
