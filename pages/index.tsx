import type { NextPage } from 'next'
import Layout from "../layouts/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <section className='homegrid'>
        Home, <strong>sweet</strong> home
      </section>
    </Layout>
  )
}
export default Home