import AllPost from './AllPost'
import styles from './ShowPost.module.scss'

const ShowPost = ({posts}) => {
  
  return (
   <div className={styles.main}> 
   {posts?.map((post)=>  <AllPost key={post._id} post={post} />)}
   </div>
  )
}
export default ShowPost
