import Card from './Card'
import styles from './PostCarousel.module.scss'

const PostCarousel = ({posts}) => {

  return (
   <div className={styles.main}>
    {posts.map((post) => (
        <Card post={post} key={post._id} />
    ))} 
   </div>
  )
}
export default PostCarousel
