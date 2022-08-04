import styles from "./Category.module.scss";

const Category = ({ post }) => {
  return (
    <div className={styles.main}>
      <h3> Category</h3>
      {post.slice(0, 4).map((e, i) => (
        <p key={i}> {e.categories[0].title} </p>
      ))}
    </div>
  );
};
export default Category;
