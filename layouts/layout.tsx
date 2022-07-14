import Head from "next/head";

export default ({ children, title = "" }: any) => {
  const composedTitle = `${title}${title != '' ? ' – ': ''}Manuel has a camera`
  return (
    <div>
      <Head>
        <title>{composedTitle}</title>
      </Head>
      <main>
        {children}
      </main>
    </div>
  );
};