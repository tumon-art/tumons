import Layout from '../components/Layout'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>df
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
