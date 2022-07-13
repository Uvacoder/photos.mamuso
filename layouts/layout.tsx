import Head from "next/head";

export default ({ children, title = "Manuel has a camera" }: any) => {

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        {children}
      </main>
    </div>
  );
};