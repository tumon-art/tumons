import { useNextSanityImage } from 'next-sanity-image'
import { client } from '../../lib/client'
import styles from './OnePost.module.scss'

const OnePost = ({post}) => {
  const {body} = post
  const post = body.map(body => body.children.map(child => child.text).join(''))
  return (
    <div>
    </div>
  )
}
export default OnePost
