import Post from './Post'
import styles from './ShowPost.module.scss'

const ShowPost = ({posts}) => {
  
  return (
   <div className={styles.main}> 
   {posts?.map((post)=>  <Post key={post._id} post={post} />)}
   </div>
  )
}
export default ShowPost