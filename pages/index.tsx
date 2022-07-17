import type { NextPage } from 'next'
import Head from "next/head";
import slugify from 'slugify';
import Link from "next/link";
import path from 'path';

import Layout from "../layouts/layout";
import data from "../data/data.json";

const galleryHeight = 320;

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <style>{`
          #logo path { fill: #121419; }
        `}</style>
      </Head>
      <section className='gallery-grid'>
        {data.map(p => (
          <div key={p.fileName} style={{ width: `${p.width*galleryHeight/p.height}px`, flexGrow: `${p.width*galleryHeight/p.height}` }}>
            <Link href={`/photo/${path.basename(p.fileName, path.extname(p.fileName))}–${slugify(p.title, {lower:true})}`}>
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