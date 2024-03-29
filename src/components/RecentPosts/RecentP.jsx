import styles from "./RecentP.module.scss";
import moment from "moment";
import { useNextSanityImage } from "next-sanity-image";
import Img from "next/image";
import { client } from "../../lib/client";

const RecentP = ({ post }) => {
  const { mainImage, title, _updatedAt } = post;
  const imageProps = useNextSanityImage(client, mainImage.asset._ref);
  const time = moment(_updatedAt).format("l");

  return (
    <div className={styles.main}>
      <div className={styles.ImgNtitleHold}>
        <span className={styles.imgHold}>
          <Img
            {...imageProps}
            style={{ borderRadius: "50%" }}
            height="30"
            width="30"
            objectFit="cover"
            layout="fixed"
          />
        </span>

        <div>
          <p className={styles.time}> {time} </p>
          <p className={styles.title}> {title} </p>
        </div>
      </div>
    </div>
  );
};
export default RecentP;
