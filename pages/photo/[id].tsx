import type { NextPage } from 'next'
import Head from "next/head";
import slugify from 'slugify';
import { NextSeo } from 'next-seo';
import path from 'path';

import Layout from "../../layouts/layout";
import data from "../../data/data.json";

const PhotoPage: NextPage = ({ photo }: any) => {
  const photoBasename = path.basename(photo.fileName, path.extname(photo.fileName))
  const photoUrl = `http://photos.mamuso.net/photo/${photoBasename}–${slugify(photo.title, {lower:true})}`
  return (
    <Layout photo={photo} title={photo.title}>
      <Head>
        <style>{`
          @-webkit-keyframes logoPalette {
            ${photo.colorPalette[0] ? `0% { fill: ${photo.colorPalette[0]};}` : null}
            ${photo.colorPalette[1] ? `25% { fill: ${photo.colorPalette[1]};}` : null}
            ${photo.colorPalette[2] ? `50% { fill: ${photo.colorPalette[2]};}` : null}
            ${photo.colorPalette[3] ? `75% { fill: ${photo.colorPalette[3]};}` : null}
            ${photo.colorPalette[4] ? `100% { fill: ${photo.colorPalette[4]};}` : null}
          }
          @keyframes logoPalette {
            ${photo.colorPalette[0] ? `0% { fill: ${photo.colorPalette[0]};}` : null}
            ${photo.colorPalette[1] ? `25% { fill: ${photo.colorPalette[1]};}` : null}
            ${photo.colorPalette[2] ? `50% { fill: ${photo.colorPalette[2]};}` : null}
            ${photo.colorPalette[3] ? `75% { fill: ${photo.colorPalette[3]};}` : null}
            ${photo.colorPalette[4] ? `100% { fill: ${photo.colorPalette[4]};}` : null}
          }
        `}</style>
      </Head>

      <NextSeo
        title= {photo.title}
        description= {photo.date}
        canonical={photoUrl}
        openGraph={{
          url: `${photoUrl}`,
          title: `${photo.title}`,
          description: `${photo.date}`,
          images: [
            {
              url: `https://photos.mamuso.net/og/${photoBasename}.png`,
              width: 1024,
              height: 540,
              alt: `${photo.title}`,
            },
          ],
          site_name: `${photo.title} – Mamuso has a camera – a gallery of yellowish photos`,
        }}
        twitter={{
          handle: '@mamuso',
          site: '@mamuso',
          cardType: 'summary_large_image',
        }}
      />

      <div id="photo">
        <img src={`/thumbs/${path.basename(photo.fileName, path.extname(photo.fileName))}_4096.jpg`} alt={photo.title} />
      </div>
    </Layout>
  )
}

// This function gets called at build time
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = data.map((p) => ({
    params: { id: `${path.basename(p.fileName, path.extname(p.fileName))}–${slugify(p.title, {lower:true})}` },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({params}: any) {

  return {
    props: {
      photo: data.filter(function (p) {
        return p.fileName.toLowerCase() === `${params.id.split('–')[0]}.jpg`.toLowerCase();
      })[0]
    }
  };
}

export default PhotoPage