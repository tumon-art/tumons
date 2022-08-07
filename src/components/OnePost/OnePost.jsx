import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import { client } from "../../lib/client";
import styles from "./OnePost.module.scss";
import moment from "moment";
import ReactPlayer from "react-player";
import { CopyBlock, dracula } from "react-code-blocks";
import { useForm } from "react-hook-form";
import { useState } from "react";

const OnePost = ({ post, category }) => {
  const [submitted, setSubmitted] = useState(false);
  // FORM HOOK
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ON SUBMIT
  const onSubmit = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => setSubmitted(true))
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  const time = moment(post._updatedAt).format("ll");

  // IMAGE PROPS
  const imageProps = useNextSanityImage(client, post.mainImage.asset._ref);

  // CODE BLOCK
  const code = post.body.filter((e) => e._type == "code");

  // POST TEXT
  const p = post.body.map((arr, i) => {
    // Check BLOCK || CODE
    if (arr._type == "block") {
      return arr.children.map((child) => child.text).join("");
    } else
      return (
        <div key={i} style={{ padding: "30px 0px" }}>
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
        <span># {post.categories[0].title}</span>
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
      <div> {p} </div>
      <hr className={styles.hr} />

      {/* ==== COMMENTS */}
      {submitted ? (
        <div className={styles.thanksForComment}>
          <h1>Thanks for submitting your comment!</h1>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <span className={styles.enjoyed}> enjoyed this article? </span>

          <h2 className={styles.h2}> Leave a comment below!</h2>

          <hr className={styles.hr2} />

          {/* COMMENT ID */}
          <input
            {...register("_id")}
            type="hidden"
            name="_id"
            value={post._id}
          />

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
            <span className={styles.errors}>- Please write your comment !</span>
          )}

          <input type="submit" className={styles.submitBtn} />
          {/* ==== SHOW ALL COMMENTS */}
          <div className={styles.commentHold}>
            <div className={styles.commentHead}>
              <h3> Comments</h3>
              <svg
                className={styles.svg}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </div>

            {post.comments.map((each, i) => {
              return (
                <div key={i}>
                  <div className={styles.commentNameNDate}>
                    <h4>{each.name}</h4>
                  </div>
                  <span>{each.comment}</span>
                </div>
              );
            })}
          </div>
        </form>
      )}
    </div>
  );
};
export default OnePost;
