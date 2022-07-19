import type { NextPage } from 'next'
import Head from "next/head";
import { NextSeo } from 'next-seo';
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
      <NextSeo
        title="Mamuso has a camera"
        description="A gallery of yellowish photos"
        canonical="https://photos.mamuso.net"
        openGraph={{
          url: "https://photos.mamuso.net",
          title: "Mamuso has a camera",
          description: "A gallery of yellowish photos",
          images: [
            {
              url: "https://photos.mamuso.net/og/index.png",
              width: 1024,
              height: 540,
              alt: "Mamuso has a camera",
            },
          ],
          site_name: "Mamuso has a camera – a gallery of yellowish photos",
        }}
        twitter={{
          handle: '@mamuso',
          site: '@mamuso',
          cardType: 'summary_large_image',
        }}
      />

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