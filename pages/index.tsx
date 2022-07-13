import type { NextPage } from 'next'
import Layout from "../layouts/layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <section className='homegrid'>
        Home, sweet home
      </section>
    </Layout>
  )
}
export default Home