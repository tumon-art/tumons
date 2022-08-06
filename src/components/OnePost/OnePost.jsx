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
    // Check BLOCK || CODE
    if (arr._type == "block") {
      return arr.children.map((child) => child.text).join("");
    } else
      return (
        <div style={{ padding: "30px 0px" }}>
          <CopyBlock
            language="javascript"
            text={arr.code}
            theme={dracula}
            codeBlock
          />
        </div>
      );
  });

  return (
    <div className={styles.main}>
      <div className={styles.imgHold}>
        <Img {...imageProps} layout="responsive" />
      </div>

      <span className={styles.span}>
        <span># {category[0].title}</span>
        <span> {time} </span>
      </span>
      <h1> {title} </h1>
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

      <p> {p} </p>

      <hr className={styles.hr} />

      <span className={styles.enjoyed}> enjoyed this article? </span>

      <h2 className={styles.h2}> Leave a comment below!</h2>

      <hr className={styles.hr2} />

      <form className={styles.form}>
        <label>
          <span> Name</span>
          <input className={styles.inputName} placeholder="Name" type="text" />
        </label>

        <label>
          <span> Email </span>
          <input
            className={styles.inputEmail}
            placeholder="Email"
            type="text"
          />
        </label>

        <label>
          <span> Comment </span>
          <textarea
            className={styles.textArea}
            style={{ display: "block" }}
            placeholder="Comment"
            rows="8"
          />
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
};
export default OnePost;
