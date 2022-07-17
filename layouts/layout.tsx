import Head from "next/head";
import Logo from "../components/logo";
import Meta from "components/meta";
import Footer from "../components/footer";

const Layout = ({ children, title = "", photo = {} }: any) => {
  const composedTitle = `${title}${title != '' ? ' – ': ''}Manuel has a camera`
  return (
    <div>
      <Head>
        <title>{composedTitle}</title>
        <script src="https://cdn.usefathom.com/script.js" data-site="UDHOAOWJ" defer></script>
      </Head>
      <main>
        <div id="sidebar">
          <Logo />
        </div>
        <Meta/>
        <div id="content">
          {children}
        </div>
        <div id="footer">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;