import Card from "./Card";
import styles from "./PostCarousel.module.scss";

const PostCarousel = ({ posts }) => {

    const rightArrow = () => {
        const auto = document.getElementById('auto')
        auto.scrollLeft= auto?.scrollLeft + (1400/4)
      };
    
    const leftArrow = () => {
        const auto = document.getElementById('auto')
        auto.scrollLeft= auto?.scrollLeft - (1400/4)

      };

  return (
    <div className={styles.main}>
      <svg className={styles.svgL}
        onClick={leftArrow}
        stroke="currentColor" strokeWidth={2}
        viewBox="0 0 24 24" fill="none">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />

      </svg>

      <svg className={styles.svgR}
        onClick={rightArrow}
        stroke="currentColor" strokeWidth={2}
        viewBox="0 0 24 24" fill="none">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      
      <div id='auto' className={styles.carouselHold}>
      {posts.map((post) => (
        <Card post={post} key={post._id} />
      ))}
      </div>
    </div>
  );
};
export default PostCarousel;
