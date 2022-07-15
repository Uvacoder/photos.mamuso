import Head from "next/head";
import Logo from "../components/logo";

const Layout = ({ children, title = "" }: any) => {
  const composedTitle = `${title}${title != '' ? ' – ': ''}Manuel has a camera`
  return (
    <div>
      <Head>
        <title>{composedTitle}</title>
      </Head>
      <main>
        <div id="sidebar">
          <Logo />
          
          Roses are red, violets are blue, and I’m terrible at color grading.
        </div>
        <div id="content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;