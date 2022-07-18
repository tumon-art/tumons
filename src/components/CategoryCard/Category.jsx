import styles from "./Category.module.scss";

const Category = ({category}) => {

  return (
   <div className={styles.main}>
    <h3> Category</h3>
    {category.map((e,i)=>(
      <p key={i}> {e.title} </p>
    ))}
   </div>
  )
}
export default Category
