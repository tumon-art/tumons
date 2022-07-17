import RecentP from './RecentP'
import styles from './RecentPosts.module.scss'

const RecentPost = ({posts}) => {
  return (
   <div className={styles.main}>
    <h3> Recent Posts </h3>

    <div>
      {posts.map((post)=>(
        <RecentP post={post} key={post._id} />
      ))}
    </div>

   </div>
  )
}
export default RecentPost