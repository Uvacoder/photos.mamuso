import Head from "next/head";
import Logo from "../components/logo";

const Layout = ({ children, title = "", photo = {} }: any) => {
  const composedTitle = `${title}${title != '' ? ' – ': ''}Manuel has a camera`
  return (
    <div>
      <Head>
        <title>{composedTitle}</title>
      </Head>
      <main>
        <div id="sidebar">
          <Logo />
          
          {photo.fileName == null ?
            (<p>Roses are red, violets are blue, and I’m terrible at color grading.</p>)
            :
            (<p>patata</p>)
          }
        </div>
        <div id="content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;