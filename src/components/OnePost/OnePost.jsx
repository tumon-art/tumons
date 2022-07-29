import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import { client } from "../../lib/client";
import styles from "./OnePost.module.scss";
const OnePost = ({ post }) => {
  const { body, title, mainImage } = post;

  // IMAGE PROPS
  const imageProps = useNextSanityImage(client, mainImage.asset._ref);

  const p = body.map((body) =>
    body.children.map((child) => child.text).join("")
  );
  console.log(imageProps);
  return (
    <div className={styles.main}>
      <h1> {title} </h1>

      <div className={styles.imgHold}>
        <Img {...imageProps} layout="responsive" />
      </div>

      <p> {p} </p>
    </div>
  );
};
export default OnePost;
