import { client } from '../../lib/client'
import OnePost from '../../components/OnePost/OnePost'

export default function Post({post}) {

  return (
    <>
    <OnePost post={post}/>
    </>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
    slug {
        current
    }
  }`

  const allPaths = await client.fetch(query);

  const paths = allPaths.map(e => {
    return {
      params: {
        slug: e.slug.current
      }
    }
  });
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params  }) => {

  // QUERY
  const onePost = `*[_type == 'post' && slug.current == '${params.slug}'][0]`;

  // POST
  const post = await client.fetch(onePost);
  return {
    props: {post:post}
  }
}
