import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import { client } from "../../lib/client";
import styles from "./OnePost.module.scss";
import moment from "moment";
import ReactPlayer from "react-player";
import { CopyBlock, dracula } from "react-code-blocks";
import { useForm } from "react-hook-form";

const OnePost = ({ post, category }) => {
  // FORM HOOK
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // ON SUBMIT
  const onSubmit = (data) => console.log(data);

  const time = moment(post._updatedAt).format("ll");

  // IMAGE PROPS
  const imageProps = useNextSanityImage(client, post.mainImage.asset._ref);

  // CODE BLOCK
  const code = post.body.filter((e) => e._type == "code");

  // POST TEXT
  const p = post.body.map((arr) => {
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
      <h1> {post.title} </h1>
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

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label>
          <span> Name</span>
          <input
            {...register("name", { required: true })}
            className={styles.inputName}
            placeholder="Issac Karim"
            type="text"
          />
        </label>

        <label>
          <span> Email </span>
          <input
            {...register("email", { required: true })}
            className={styles.inputEmail}
            placeholder="you@email.com"
            type="text"
          />
        </label>

        <label>
          <span> Comment </span>
          <textarea
            {...register("comment", { required: true })}
            className={styles.textArea}
            style={{ display: "block" }}
            placeholder="Enter some long form content"
            rows="8"
          />
        </label>
        {errors.name && (
          <span className={styles.errors}> - Name is required !</span>
        )}
        {errors.email && (
          <span className={styles.errors}> - Email is required !</span>
        )}
        {errors.comment && (
          <span className={styles.errors}> - Please write your comment !</span>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default OnePost;
