import styles from './Card.module.scss'
import Img from "next/image";
import { useNextSanityImage } from 'next-sanity-image';

import { client } from '../../lib/client';

const Card = ({post}) => {

    const imageProps = useNextSanityImage(
        client,
        post.author.image.asset._ref
    );
console.log(imageProps)
    const {title,_updatedAt,author} = post

    const time = _updatedAt.split('T')[0]
    
  return (
   <div className={styles.main}>
    

    <p> {time} </p>
    <h4> {title}
    </h4>

    <footer>
        <div className={styles.imgHold}>
        <Img
        {...imageProps}
        layout="responsive"
        />
        </div>
       <span> {author.name} </span>
    </footer>


   </div>
  )
}
export default Card
