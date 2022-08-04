import styles from "./Card.module.scss";
import Img from "next/image";
import Link from "next/link";
import moment from "moment";
import { useNextSanityImage } from "next-sanity-image";

import { client } from "../../lib/client";

const Card = ({ post }) => {
  // IMAGE PROPS
  const imageProps = useNextSanityImage(client, post.author.image.asset._ref);

  const { title, _updatedAt, author } = post;
  const time = moment(_updatedAt).format("ll");

  return (
    <div className={styles.main}>
      <p> {time} </p>

      <Link href={`post/${post.slug.current}`}>
        <a>
          <h4> {title}</h4>
        </a>
      </Link>

      <footer>
        <div className={styles.imgHold}>
          <Img {...imageProps} layout="responsive" />
        </div>
        <span> {author.name} </span>
      </footer>
    </div>
  );
};
export default Card;
