import styles from "./Category.module.scss";

const Category = ({ post }) => {
  return (
    <div className={styles.main}>
      <h3> Category</h3>
      {post.map((e, i) => (
        <p key={i}> {e.title} </p>
      ))}
    </div>
  );
};
export default Category;
