import Card from "./Card";
import styles from "./PostCarousel.module.scss";

const PostCarousel = ({ posts }) => {
  // RIGHT ARROW
  const rightArrow = () => {
    const auto = document.getElementById("auto");
    auto.scrollLeft = auto?.scrollLeft + 1400 / 4;
  };
  // LEFT ARROW
  const leftArrow = () => {
    const auto = document.getElementById("auto");
    auto.scrollLeft = auto?.scrollLeft - 1400 / 4;
  };

  return (
    <div className={styles.main}>
      <span className={styles.svgL} onClick={leftArrow}>
        ❰
      </span>

      <span className={styles.svgR} onClick={rightArrow}>
        ❱
      </span>

      <div id="auto" className={styles.carouselHold}>
        {posts.map((post) => (
          <Card post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
};
export default PostCarousel;
