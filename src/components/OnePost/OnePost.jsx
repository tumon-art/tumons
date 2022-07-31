import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import { client } from "../../lib/client";
import styles from "./OnePost.module.scss";
import moment from "moment";

const OnePost = ({ post, category }) => {
  const { body, title, mainImage, _updatedAt } = post;
  const time = moment(_updatedAt).format("ll");

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

      <span>
        <span># {category[0].title}</span>
        <span> {time} </span>
      </span>
      <p> {p} </p>
    </div>
  );
};
export default OnePost;
