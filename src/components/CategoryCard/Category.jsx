import styles from "./Category.module.scss";

const Category = ({ post }) => {
  return (
    <div className={styles.main}>
      <h3> Category</h3>
      <ol>
        {post.slice(0, 4).map((e, i) => (
          <li key={i}> {e.categories[0].title} </li>
        ))}
      </ol>
    </div>
  );
};
export default Category;
