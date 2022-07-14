import type { NextPage } from 'next'
import Link from "next/link";
import path from 'path';

import Layout from "../layouts/layout";
import data from "../data/data.json";

const galleryHeight = 348;

const Home: NextPage = () => {
  return (
    <Layout>
      <section className='gallery-grid'>
        {data.map(p => (
          <div key={p.fileName} style={{ width: `${p.width*galleryHeight/p.height}px`, flexGrow: `${p.width*galleryHeight/p.height}` }}>
            <Link href={`/gallery/${p.fileName}`}>
              <a>
                <i style={{ paddingBottom: `${p.height/p.width*100}%` }}/>
                <img src={`/thumbs/${path.basename(p.fileName, path.extname(p.fileName))}_1024.jpg`} alt={p.title} />
              </a>
            </Link>
          </div>
        ))}
      </section>
    </Layout>
  )
}
export default Home