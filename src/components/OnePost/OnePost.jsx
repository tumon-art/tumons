import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import { client } from "../../lib/client";
import styles from "./OnePost.module.scss";
import moment from "moment";
import ReactPlayer from "react-player";
import { CopyBlock, dracula } from "react-code-blocks";

const OnePost = ({ post, category }) => {
  const { body, title, mainImage, url, _updatedAt } = post;
  const time = moment(_updatedAt).format("ll");

  // IMAGE PROPS
  const imageProps = useNextSanityImage(client, mainImage.asset._ref);

  // CODE BLOCK
  const code = body.filter((e) => e._type == "code");
  // POST TEXT
  const p = body.map((arr) => {
    let post;
    if (arr._type == "block") {
      post += arr.children.map((child) => child.text).join("");
    } else
      return (
        <CopyBlock language="javascript" text={arr.code} theme={dracula} />
      );

    if (post) return post;
  });

  return (
    <div className={styles.main}>
      <h1> {title} </h1>
      <div className={styles.imgHold}>
        <Img {...imageProps} layout="responsive" />
      </div>

      <div
        className={styles.reactPlayer}
        style={{
          display: "flex",
          padding: " 50px 0 20px 0",
          justifyContent: "center",
        }}
      >
        <ReactPlayer
          height="230px"
          width="400px"
          controls={true}
          url={post.url}
        />
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
