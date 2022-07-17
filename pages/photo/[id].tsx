import type { NextPage } from 'next'
import Head from "next/head";
import slugify from 'slugify';
import Link from "next/link";
import path from 'path';

import Layout from "../../layouts/layout";
import data from "../../data/data.json";

const PhotoPage: NextPage = ({ photo }: any) => {
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