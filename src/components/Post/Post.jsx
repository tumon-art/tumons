import Img from "next/image";
import moment from "moment";
import { useNextSanityImage } from "next-sanity-image";
import styles from "./Post.module.scss";
import { client } from "../../lib/client";

const Post = ({ post }) => {
  const { mainImage, title, author ,_updatedAt} = post;
  const imageProps = useNextSanityImage(client, mainImage.asset._ref);
  const imageAuthor = useNextSanityImage(client, author.image.asset._ref);

  const desc = post.body[0].children[0].text.split('.')
  const time = moment(_updatedAt).format('ll')

  return (
    <div className={styles.main}>
      <div className={styles.imgHold}>
        <Img {...imageProps} layout="responsive" />
      </div>

      <h3>{title}</h3>

      <div className={styles.authorInfo}>
       
        <span>
        <div className={styles.imgHoldAuthor}>
          <Img {...imageAuthor} objectFit='contain' />
        </div>

        <p>{author.name}</p>
        </span>


        {/* === CALANDER AND DATE  */}
        <span>
        <svg
          className={styles.svgCalander}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
        </svg>

        <p>{time}</p>
        </span>

        
      </div>
        
        <div className={styles.descNbtn}>
        <p> {desc[0] + desc[1]} </p>
        <button>
          Show More
        </button>
        </div>

    </div>
  );
};
export default Post;
